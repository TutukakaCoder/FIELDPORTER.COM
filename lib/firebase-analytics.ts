import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  BUSINESS_INTELLIGENCE_KEYWORDS,
  QUALIFICATION_SCORING,
} from "./chatbot-system-prompt";
import { db } from "./firebase";

export interface UserInteraction {
  interaction_type:
    | "button_click"
    | "page_view"
    | "download_attempt"
    | "email_click"
    | "social_share";
  page_url: string;
  element_id?: string;
  element_text?: string;
  timestamp: Timestamp;
  user_session: string;
  metadata: {
    user_agent: string;
    referrer?: string;
    viewport_width?: number;
    viewport_height?: number;
    scroll_depth?: number;
    time_on_page?: number;
    [key: string]: string | number | boolean | undefined;
  };
}

const ANALYTICS_COLLECTION = "user_interactions";
const SESSION_STORAGE_KEY = "fieldporter_session_id";

export class FirebaseAnalyticsService {
  private sessionId: string;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
  }

  /**
   * Get or create a session ID for tracking user interactions
   */
  private getOrCreateSessionId(): string {
    if (typeof window === "undefined") {
      return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    let sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }
    return sessionId;
  }

  /**
   * Get viewport dimensions
   */
  private getViewportDimensions(): { width?: number; height?: number } {
    if (typeof window === "undefined") return {};
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  /**
   * Get scroll depth percentage
   */
  private getScrollDepth(): number {
    if (typeof window === "undefined") return 0;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    return documentHeight > 0
      ? Math.round((scrollTop / documentHeight) * 100)
      : 0;
  }

  /**
   * Track a user interaction
   */
  async trackInteraction(
    interactionType: UserInteraction["interaction_type"],
    elementId?: string,
    elementText?: string,
    additionalMetadata?: Record<string, string | number | boolean | undefined>,
  ): Promise<void> {
    try {
      if (typeof window === "undefined") return;

      const interactionId = `interaction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const viewport = this.getViewportDimensions();
      const referrer = document.referrer;

      const interaction: UserInteraction = {
        interaction_type: interactionType,
        page_url: window.location.href,
        ...(elementId && { element_id: elementId }),
        ...(elementText && { element_text: elementText }),
        timestamp: Timestamp.now(),
        user_session: this.sessionId,
        metadata: {
          user_agent: navigator.userAgent,
          ...(referrer && { referrer }),
          ...(viewport.width && { viewport_width: viewport.width }),
          ...(viewport.height && { viewport_height: viewport.height }),
          scroll_depth: this.getScrollDepth(),
          ...additionalMetadata,
        },
      };

      // Save to Firebase (fire and forget - don't block UI)
      const interactionRef = doc(db, ANALYTICS_COLLECTION, interactionId);
      setDoc(interactionRef, interaction).catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.warn("Analytics tracking failed:", error);
        }
      });

      // Also track with Google Analytics if available
      if (window.gtag) {
        window.gtag("event", interactionType, {
          element_id: elementId,
          element_text: elementText,
          page_url: window.location.href,
          session_id: this.sessionId,
          ...additionalMetadata,
        });
      }
    } catch (error) {
      // Silently fail - analytics should never break the user experience
      if (process.env.NODE_ENV === "development") {
        console.warn("Analytics tracking error:", error);
      }
    }
  }

  /**
   * Track button clicks
   */
  async trackButtonClick(
    buttonId: string,
    buttonText: string,
    additionalData?: Record<string, string | number | boolean>,
  ): Promise<void> {
    await this.trackInteraction("button_click", buttonId, buttonText, {
      button_type: "cta",
      ...additionalData,
    });
  }

  /**
   * Track CTA button clicks specifically
   */
  async trackCTAClick(
    ctaType:
      | "consultation"
      | "download"
      | "newsletter"
      | "contact"
      | "service_interest",
    ctaText: string,
    additionalData?: Record<string, string | number | boolean>,
  ): Promise<void> {
    await this.trackInteraction("button_click", `cta_${ctaType}`, ctaText, {
      cta_type: ctaType,
      button_category: "conversion",
      ...additionalData,
    });
  }

  /**
   * Track service interest clicks
   */
  async trackServiceInterest(
    serviceName: string,
    interactionType: "learn_more" | "get_started" | "view_details",
    additionalData?: Record<string, string | number | boolean>,
  ): Promise<void> {
    await this.trackInteraction(
      "button_click",
      `service_${serviceName}`,
      serviceName,
      {
        service_name: serviceName,
        interaction_type: interactionType,
        category: "service_interest",
        ...additionalData,
      },
    );
  }

  /**
   * Track portfolio project interest
   */
  async trackPortfolioInterest(
    projectName: string,
    interactionType: "view_details" | "external_link",
    additionalData?: Record<string, string | number | boolean>,
  ): Promise<void> {
    await this.trackInteraction(
      "button_click",
      `portfolio_${projectName}`,
      projectName,
      {
        project_name: projectName,
        interaction_type: interactionType,
        category: "portfolio_interest",
        ...additionalData,
      },
    );
  }

  /**
   * Track email link clicks
   */
  async trackEmailClick(emailAddress: string, context?: string): Promise<void> {
    await this.trackInteraction("email_click", "email_link", emailAddress, {
      email_address: emailAddress,
      context: context || "general",
      category: "contact_intent",
    });
  }

  /**
   * Track social media clicks
   */
  async trackSocialClick(
    platform: "linkedin" | "twitter" | "github",
    context?: string,
  ): Promise<void> {
    await this.trackInteraction(
      "button_click",
      `social_${platform}`,
      platform,
      {
        social_platform: platform,
        context: context || "footer",
        category: "social_engagement",
      },
    );
  }

  /**
   * Track download attempts
   */
  async trackDownloadAttempt(
    resourceType: string,
    resourceName: string,
    additionalData?: Record<string, string | number | boolean>,
  ): Promise<void> {
    await this.trackInteraction(
      "download_attempt",
      `download_${resourceType}`,
      resourceName,
      {
        resource_type: resourceType,
        resource_name: resourceName,
        category: "resource_interest",
        ...additionalData,
      },
    );
  }

  /**
   * Track page views with engagement metrics
   */
  async trackPageView(
    additionalData?: Record<string, string | number | boolean>,
  ): Promise<void> {
    if (typeof window === "undefined") return;

    // Track initial page view
    await this.trackInteraction("page_view", "page_load", document.title, {
      page_title: document.title,
      page_path: window.location.pathname,
      category: "navigation",
      ...additionalData,
    });

    // Track engagement after user has been on page for 10 seconds
    setTimeout(() => {
      this.trackInteraction("page_view", "engagement_10s", document.title, {
        page_title: document.title,
        page_path: window.location.pathname,
        engagement_duration: 10,
        category: "engagement",
        ...additionalData,
      });
    }, 10000);

    // Track deep engagement after 30 seconds
    setTimeout(() => {
      this.trackInteraction("page_view", "engagement_30s", document.title, {
        page_title: document.title,
        page_path: window.location.pathname,
        engagement_duration: 30,
        category: "deep_engagement",
        ...additionalData,
      });
    }, 30000);
  }

  /**
   * Create trackable button component wrapper
   */
  createTrackableButton(
    buttonType: "cta" | "service" | "portfolio" | "social" | "general",
    identifier: string,
    text: string,
    additionalData?: Record<string, string | number | boolean>,
  ) {
    return {
      onClick: () => {
        switch (buttonType) {
          case "cta":
            this.trackCTAClick(
              identifier as
                | "consultation"
                | "download"
                | "newsletter"
                | "contact"
                | "service_interest",
              text,
              additionalData,
            );
            break;
          case "service":
            this.trackServiceInterest(identifier, "learn_more", additionalData);
            break;
          case "portfolio":
            this.trackPortfolioInterest(
              identifier,
              "view_details",
              additionalData,
            );
            break;
          case "social":
            this.trackSocialClick(
              identifier as "linkedin" | "twitter" | "github",
              additionalData?.["context"] as string,
            );
            break;
          default:
            this.trackButtonClick(identifier, text, additionalData);
        }
      },
    };
  }
}

// Export singleton instance
export const firebaseAnalyticsService = new FirebaseAnalyticsService();

// Convenience functions for common tracking scenarios
export const trackCTA = (
  ctaType:
    | "consultation"
    | "download"
    | "newsletter"
    | "contact"
    | "service_interest",
  ctaText: string,
  additionalData?: Record<string, string | number | boolean>,
) => firebaseAnalyticsService.trackCTAClick(ctaType, ctaText, additionalData);

export const trackServiceInterest = (
  serviceName: string,
  interactionType: "learn_more" | "get_started" | "view_details" = "learn_more",
  additionalData?: Record<string, string | number | boolean>,
) =>
  firebaseAnalyticsService.trackServiceInterest(
    serviceName,
    interactionType,
    additionalData,
  );

export const trackPortfolioInterest = (
  projectName: string,
  interactionType: "view_details" | "external_link" = "view_details",
  additionalData?: Record<string, string | number | boolean>,
) =>
  firebaseAnalyticsService.trackPortfolioInterest(
    projectName,
    interactionType,
    additionalData,
  );

export const trackEmailClick = (emailAddress: string, context?: string) =>
  firebaseAnalyticsService.trackEmailClick(emailAddress, context);

export const trackSocialClick = (
  platform: "linkedin" | "twitter" | "github",
  context?: string,
) => firebaseAnalyticsService.trackSocialClick(platform, context);

export const trackDownload = (
  resourceType: string,
  resourceName: string,
  additionalData?: Record<string, string | number | boolean>,
) =>
  firebaseAnalyticsService.trackDownloadAttempt(
    resourceType,
    resourceName,
    additionalData,
  );

export const trackPageView = (
  additionalData?: Record<string, string | number | boolean>,
) => firebaseAnalyticsService.trackPageView(additionalData);

// Enhanced conversation intelligence schema
export interface ConversationIntelligence {
  sessionId: string;
  metadata: {
    startTime: Date;
    lastActive: Date;
    ipLocation?: string;
    deviceType: "mobile" | "desktop" | "tablet";
    referralSource: string;
    sessionQuality: "cold" | "warm" | "hot" | "qualified";
    userAgent: string;
    timeOnSite: number;
    pagesVisited: string[];
  };
  visitor: {
    email?: string;
    name?: string;
    company?: string;
    linkedIn?: string;
    role?: string;
    companySize?: string;
    currentTools?: string[];
    budgetRange?: string;
    industry?: string;
    websiteDomain?: string;
  };
  intelligence: {
    painPoints: string[];
    interests: string[];
    objections: string[];
    intentScore: number;
    nextBestAction: string;
    estimatedValue: number;
    competitorsMentioned: string[];
    timelineUrgency: "immediate" | "quarter" | "exploring" | "unknown";
    technicalSophistication: "high" | "medium" | "low";
    businessMaturity: "startup" | "growth" | "enterprise";
    conversionProbability: number;
  };
  messages: Array<{
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
    metadata: {
      sentiment: "positive" | "neutral" | "negative";
      topicChange: boolean;
      conversionEvent: boolean;
      businessKeywords: string[];
      questions: string[];
      responseTime?: number;
    };
  }>;
  conversationSummary: {
    totalMessages: number;
    avgResponseTime: number;
    dominantTopics: string[];
    overallSentiment: "positive" | "neutral" | "negative";
    engagementLevel: "high" | "medium" | "low";
    conversionEvents: number;
  };
}

// Lead scoring algorithm implementation
export class BusinessIntelligenceAnalyzer {
  static analyzeMessage(content: string): {
    sentiment: "positive" | "neutral" | "negative";
    businessKeywords: string[];
    painPoints: string[];
    urgencySignals: string[];
    technicalSignals: string[];
    questions: string[];
  } {
    const lowerContent = content.toLowerCase();

    // Sentiment analysis (basic implementation)
    const positiveWords = [
      "good",
      "great",
      "excellent",
      "perfect",
      "amazing",
      "love",
      "interested",
      "excited",
    ];
    const negativeWords = [
      "bad",
      "terrible",
      "awful",
      "hate",
      "frustrated",
      "disappointed",
      "concerned",
      "worried",
    ];

    const positiveCount = positiveWords.filter((word) =>
      lowerContent.includes(word),
    ).length;
    const negativeCount = negativeWords.filter((word) =>
      lowerContent.includes(word),
    ).length;

    let sentiment: "positive" | "neutral" | "negative" = "neutral";
    if (positiveCount > negativeCount) sentiment = "positive";
    else if (negativeCount > positiveCount) sentiment = "negative";

    // Extract business intelligence
    const businessKeywords = BUSINESS_INTELLIGENCE_KEYWORDS.highValue.filter(
      (keyword) => lowerContent.includes(keyword),
    );

    const painPoints = BUSINESS_INTELLIGENCE_KEYWORDS.painPoints.filter(
      (keyword) => lowerContent.includes(keyword),
    );

    const urgencySignals = BUSINESS_INTELLIGENCE_KEYWORDS.urgency.filter(
      (keyword) => lowerContent.includes(keyword),
    );

    const technicalSignals =
      BUSINESS_INTELLIGENCE_KEYWORDS.technicalSophistication.filter((keyword) =>
        lowerContent.includes(keyword),
      );

    // Extract questions
    const questions = content
      .split(/[.!]/)
      .filter((sentence) => sentence.trim().includes("?"))
      .map((q) => q.trim());

    return {
      sentiment,
      businessKeywords,
      painPoints,
      urgencySignals,
      technicalSignals,
      questions,
    };
  }

  static calculateLeadScore(conversation: Partial<ConversationIntelligence>): {
    score: number;
    reasoning: string[];
    qualification: "unqualified" | "cold" | "warm" | "hot" | "qualified";
  } {
    let score = QUALIFICATION_SCORING.baseScore;
    const reasoning: string[] = [];

    // Email domain scoring
    if (conversation.visitor?.email) {
      const domain = conversation.visitor.email.split("@")[1];
      if (
        domain &&
        !["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"].includes(
          domain,
        )
      ) {
        score += QUALIFICATION_SCORING.businessEmail;
        reasoning.push("Business email domain detected");
      }
    }

    // Pain point analysis
    const painPointCount = conversation.intelligence?.painPoints?.length || 0;
    if (painPointCount > 0) {
      score += QUALIFICATION_SCORING.painPointMentioned;
      reasoning.push(`${painPointCount} pain points identified`);
    }

    // Budget discussion
    const budgetKeywords = [
      "budget",
      "investment",
      "cost",
      "price",
      "spend",
      "roi",
    ];
    const hasBudgetDiscussion = conversation.messages?.some((msg) =>
      budgetKeywords.some((keyword) =>
        msg.content.toLowerCase().includes(keyword),
      ),
    );
    if (hasBudgetDiscussion) {
      score += QUALIFICATION_SCORING.budgetDiscussion;
      reasoning.push("Budget discussion detected");
    }

    // Timeline urgency
    if (conversation.intelligence?.timelineUrgency === "immediate") {
      score += QUALIFICATION_SCORING.timelineUrgency * 2;
      reasoning.push("Immediate timeline urgency");
    } else if (conversation.intelligence?.timelineUrgency === "quarter") {
      score += QUALIFICATION_SCORING.timelineUrgency;
      reasoning.push("Quarterly timeline identified");
    }

    // Contact info provided
    if (conversation.visitor?.email || conversation.visitor?.name) {
      score += QUALIFICATION_SCORING.contactInfoProvided;
      reasoning.push("Contact information provided");
    }

    // Technical sophistication
    const technicalQuestions =
      conversation.messages?.filter((msg) =>
        BUSINESS_INTELLIGENCE_KEYWORDS.technicalSophistication.some((term) =>
          msg.content.toLowerCase().includes(term),
        ),
      ).length || 0;

    if (technicalQuestions > 0) {
      score += QUALIFICATION_SCORING.technicalQuestions;
      reasoning.push(`${technicalQuestions} technical questions asked`);
    }

    // Determine qualification level
    let qualification: "unqualified" | "cold" | "warm" | "hot" | "qualified" =
      "unqualified";
    if (score >= QUALIFICATION_SCORING.qualificationThreshold) {
      qualification = "qualified";
    } else if (score >= 6) {
      qualification = "hot";
    } else if (score >= 4) {
      qualification = "warm";
    } else if (score >= 2) {
      qualification = "cold";
    }

    return { score, reasoning, qualification };
  }

  static extractBusinessIntelligence(
    messages: ConversationIntelligence["messages"],
  ): {
    dominantTopics: string[];
    painPoints: string[];
    interests: string[];
    objections: string[];
    competitorsMentioned: string[];
    estimatedValue: number;
    nextBestAction: string;
  } {
    let painPoints: string[] = [];
    let interests: string[] = [];
    let objections: string[] = [];
    let competitorsMentioned: string[] = [];
    let dominantTopics: string[] = [];

    // Competitor keywords
    const competitors = [
      "zapier",
      "microsoft",
      "salesforce",
      "hubspot",
      "monday",
      "asana",
      "notion",
    ];

    messages.forEach((message) => {
      if (message.role === "user") {
        const analysis = this.analyzeMessage(message.content);
        painPoints = [...painPoints, ...analysis.painPoints];

        // Extract interests from business keywords
        interests = [...interests, ...analysis.businessKeywords];

        // Detect objections (questions about cost, time, complexity)
        const objectionKeywords = [
          "expensive",
          "cost too much",
          "take too long",
          "too complex",
          "not sure if",
        ];
        objectionKeywords.forEach((keyword) => {
          if (message.content.toLowerCase().includes(keyword)) {
            objections.push(keyword);
          }
        });

        // Detect competitor mentions
        competitors.forEach((competitor) => {
          if (message.content.toLowerCase().includes(competitor)) {
            competitorsMentioned.push(competitor);
          }
        });
      }
    });

    // Remove duplicates and get top items
    painPoints = [...new Set(painPoints)].slice(0, 5);
    interests = [...new Set(interests)].slice(0, 5);
    objections = [...new Set(objections)];
    competitorsMentioned = [...new Set(competitorsMentioned)];
    dominantTopics = [...new Set([...interests, ...painPoints])].slice(0, 3);

    // Estimate value based on business signals
    let estimatedValue = 5000; // Base value
    if (interests.includes("enterprise") || interests.includes("scale"))
      estimatedValue *= 3;
    if (painPoints.length > 3) estimatedValue *= 1.5;
    if (competitorsMentioned.length > 0) estimatedValue *= 1.2;

    // Determine next best action
    let nextBestAction = "Continue nurturing";
    if (painPoints.length > 2 && interests.length > 1) {
      nextBestAction = "Schedule consultation call";
    } else if (objections.length > 0) {
      nextBestAction = "Address objections with case studies";
    } else if (competitorsMentioned.length > 0) {
      nextBestAction = "Send competitive comparison";
    }

    return {
      dominantTopics,
      painPoints,
      interests,
      objections,
      competitorsMentioned,
      estimatedValue: Math.round(estimatedValue),
      nextBestAction,
    };
  }
}

// Enhanced analytics service
export class RevenueAnalytics {
  // Track conversation with full business intelligence
  static async trackConversationIntelligence(
    sessionId: string,
    messageData: Partial<ConversationIntelligence>,
  ): Promise<void> {
    try {
      const conversationRef = doc(db, "conversations", sessionId);
      const timestamp = serverTimestamp();

      // Calculate lead score
      const { score, qualification } =
        BusinessIntelligenceAnalyzer.calculateLeadScore(messageData);

      // Extract business intelligence if messages exist
      let businessIntel = {};
      if (messageData.messages && messageData.messages.length > 0) {
        businessIntel =
          BusinessIntelligenceAnalyzer.extractBusinessIntelligence(
            messageData.messages,
          );
      }

      const updateData = {
        ...messageData,
        "metadata.lastActive": timestamp,
        "metadata.sessionQuality": qualification,
        "intelligence.intentScore": score,
        ...businessIntel,
        lastUpdated: timestamp,
      };

      await updateDoc(conversationRef, updateData);

      // Trigger notifications for qualified leads
      if (score >= QUALIFICATION_SCORING.qualificationThreshold) {
        await this.triggerQualifiedLeadNotification(sessionId, messageData);
      }
    } catch (error) {
      console.error("Failed to track conversation intelligence:", error);
    }
  }

  // Trigger notifications for high-value leads
  static async triggerQualifiedLeadNotification(
    sessionId: string,
    conversation: Partial<ConversationIntelligence>,
  ): Promise<void> {
    try {
      const notification = {
        type: "qualified_lead",
        sessionId,
        timestamp: serverTimestamp(),
        priority: "high",
        data: {
          email: conversation.visitor?.email,
          company: conversation.visitor?.company,
          estimatedValue: conversation.intelligence?.estimatedValue,
          painPoints: conversation.intelligence?.painPoints,
          nextAction: conversation.intelligence?.nextBestAction,
          score: conversation.intelligence?.intentScore,
        },
        processed: false,
      };

      await addDoc(collection(db, "notifications"), notification);
    } catch (error) {
      console.error("Failed to trigger qualified lead notification:", error);
    }
  }

  // Get business intelligence dashboard data
  static async getBusinessIntelligence(
    timeframe: "day" | "week" | "month" = "week",
  ): Promise<{
    totalConversations: number;
    qualifiedLeads: number;
    conversionRate: number;
    topPainPoints: Array<{ painPoint: string; count: number }>;
    leadSources: Array<{ source: string; count: number }>;
    averageScore: number;
    revenueOpportunity: number;
  }> {
    try {
      const conversations = await getDocs(collection(db, "conversations"));
      const data = conversations.docs.map(
        (doc) => doc.data() as ConversationIntelligence,
      );

      const totalConversations = data.length;
      const qualifiedLeads = data.filter(
        (conv) =>
          conv.intelligence?.intentScore >=
          QUALIFICATION_SCORING.qualificationThreshold,
      ).length;

      const conversionRate =
        totalConversations > 0
          ? (qualifiedLeads / totalConversations) * 100
          : 0;

      // Aggregate pain points
      const painPointMap = new Map<string, number>();
      data.forEach((conv) => {
        conv.intelligence?.painPoints?.forEach((point) => {
          painPointMap.set(point, (painPointMap.get(point) || 0) + 1);
        });
      });

      const topPainPoints = Array.from(painPointMap.entries())
        .map(([painPoint, count]) => ({ painPoint, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Calculate revenue opportunity
      const revenueOpportunity = data.reduce((total, conv) => {
        return total + (conv.intelligence?.estimatedValue || 0);
      }, 0);

      const averageScore =
        data.reduce((total, conv) => {
          return total + (conv.intelligence?.intentScore || 0);
        }, 0) / totalConversations;

      return {
        totalConversations,
        qualifiedLeads,
        conversionRate,
        topPainPoints,
        leadSources: [], // TODO: Implement lead source tracking
        averageScore,
        revenueOpportunity,
      };
    } catch (error) {
      console.error("Failed to get business intelligence:", error);
      throw error;
    }
  }

  // Track conversion events
  static async trackConversion(
    sessionId: string,
    conversionType:
      | "email_captured"
      | "consultation_booked"
      | "contact_form"
      | "newsletter_signup",
    value?: number,
  ): Promise<void> {
    try {
      const conversionData = {
        sessionId,
        type: conversionType,
        timestamp: serverTimestamp(),
        value: value || 0,
        source: "website",
      };

      await addDoc(collection(db, "conversions"), conversionData);

      // Update conversation record
      const conversationRef = doc(db, "conversations", sessionId);
      await updateDoc(conversationRef, {
        "conversationSummary.conversionEvents": increment(1),
        "metadata.lastActive": serverTimestamp(),
      });
    } catch (error) {
      console.error("Failed to track conversion:", error);
    }
  }
}
