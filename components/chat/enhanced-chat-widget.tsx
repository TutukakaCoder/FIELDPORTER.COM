/* eslint-disable react/self-closing-comp, react/no-unescaped-entities */
"use client";

import { useStableMobile } from "@/hooks";
import { chatbotAnalytics } from "@/lib/chatbot-analytics";
import { FALLBACK_RESPONSES } from "@/lib/chatbot-system-prompt";
import { enhancedChatService } from "@/lib/enhanced-chat-service";
import { cn } from "@/lib/utils";
import type { Message } from "@/types/chat";
import { useCallback, useEffect, useState } from "react";
import { MessageManager } from "./message-manager";
import { ResponsiveChatManager } from "./responsive-chat-manager";

// Helper function to decode HTML entities and filter wrong consultation links
const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

// Helper function to format AI responses and prevent capability overpromising
const formatChatResponse = (content: string): string => {
  let processedContent = content;

  // Keep multiple model claims but ensure DeepSeek is included
  const multipleModelPatterns = [
    /Claude 4 Opus|Claude Opus 4/gi,
    /GPT-4 Turbo/gi,
    /Gemini 2\.5 Pro/gi,
  ];

  // Replace with accurate model list that includes DeepSeek
  multipleModelPatterns.forEach((pattern) => {
    if (pattern.test(processedContent)) {
      processedContent = processedContent.replace(
        pattern,
        "Claude, GPT-4, Gemini, and DeepSeek",
      );
    }
  });

  // Ensure "throttled for web use" messaging is preserved - don't remove it
  // The user likes this positioning

  // Remove false 3D/rendering capability claims
  const false3DCapabilityPatterns = [
    /NVIDIA\s+Omniverse/gi,
    /Blender\s+(scripting|automation|workflows)/gi,
    /Unity\s+(rendering|workflows|optimisation)/gi,
    /(built|developed|created)\s+.*3D.*pipelines?/gi,
  ];

  const hasFalse3DClaim = false3DCapabilityPatterns.some((pattern) =>
    pattern.test(processedContent),
  );

  if (hasFalse3DClaim) {
    processedContent =
      "That's outside our current service focus. We specialise in strategic research, AI implementation, and workflow automation. What specific business challenge are you looking to solve?";
  }

  // Replace false client work claims with real FIELDPORTER examples
  const falseWorkPatterns = [
    /gaming\s+(client|project|work)/gi,
    /AR\/VR\s+(client|project|work)/gi,
    /visual\s+effects\s+(client|project|work)/gi,
    /40%.*production.*time.*reduction/gi,
    /8\s+hours?\s+to\s+90\s+minutes?/gi,
    /GPU.*optimisation.*for.*clients/gi,
    /(built|developed|created)\s+.*(?:gaming|3D|VR|AR).*(?:pipelines?|workflows?|systems?)/gi,
  ];

  const hasFalseWork = falseWorkPatterns.some((pattern) =>
    pattern.test(processedContent),
  );

  if (hasFalseWork) {
    processedContent = `Here are some real examples of our work:

• Self-Development Platform: 8 months live, 1,000+ daily interactions, 15 hours weekly saved through automation
• VOYCAP Investment News: Improved image success from 30% to 85%, AI content summarisation  
• Lead Generation Platform: 85% email classification accuracy, 70% reduction in manual review time
• Strategic Research: Market entry analysis, VC portfolio validation frameworks

Our services include strategic research ($500-$3,000), rapid development ($3,000-$8,000), and workflow optimisation ($2,000-$5,000). What type of challenge are you facing?`;
  }

  // Replace booking capability claims with contact page redirect
  const bookingPatterns = [
    /I('ll|'ll|'ll|\s+will)\s+(send|resend|email)\s+(you\s+)?a?\s+(calendar\s+)?(invite|meeting|appointment)/gi,
    /I('ll|'ll|'ll|\s+will)\s+book\s+(you\s+)?a?\s+(meeting|appointment|call)/gi,
    /I('ll|'ll|'ll|\s+will)\s+schedule\s+(you\s+)?a?\s+(meeting|appointment|call)/gi,
    /I('ll|'ll|'ll|\s+will)\s+set\s+up\s+(a\s+)?(meeting|appointment|call)/gi,
    /calendar\s+invite.*(is\s+)?(on\s+its\s+way|sent|coming)/gi,
    /zoom\s+invite.*(is\s+)?(on\s+its\s+way|sent|coming)/gi,
    /let\s+me\s+(resend|send).*(invite|meeting)/gi,
  ];

  const hasBookingClaim = bookingPatterns.some((pattern) =>
    pattern.test(processedContent),
  );

  if (hasBookingClaim) {
    processedContent =
      "I can help connect you with FIELDPORTER's team. Please use the contact page or 'Book Consultation' button to schedule a discussion about your specific needs.";
  }

  // Filter out wrong consultation links
  if (
    processedContent.includes("fieldporter.com/consult") ||
    processedContent.includes("direct link again") ||
    processedContent.includes("here's the direct link")
  ) {
    processedContent =
      "Please use the 'Book Consultation' button below to connect with our team directly.";
  }

  // Replace generic automation claims with specific FIELDPORTER capabilities
  if (
    processedContent.includes("automate workflows") &&
    !processedContent.includes("strategic research")
  ) {
    processedContent = processedContent.replace(
      /automate workflows?/gi,
      "automate workflows using React, Firebase, and AI tools like Claude and DeepSeek",
    );
  }

  // Ensure proper email follow-up messaging
  if (
    processedContent.includes("@") &&
    !processedContent.includes("Frederick")
  ) {
    processedContent +=
      " I'll make sure Frederick reaches out within 24 hours to discuss your specific needs.";
  }

  return (
    processedContent
      // Clean up HTML entities
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")

      // ENHANCED MARKDOWN REMOVAL - Handle all edge cases
      // Remove nested/overlapping markdown (***text*** or **text**)
      .replace(/\*{3,}(.*?)\*{3,}/g, "$1")
      .replace(/\*{2,}(.*?)\*{2,}/g, "$1")

      // Remove standard markdown formatting
      .replace(/\*\*(.*?)\*\*/g, "$1") // **bold**
      .replace(/\*(.*?)\*/g, "$1") // *italic*
      .replace(/`(.*?)`/g, "$1") // `code`

      // Remove asterisk dividers and standalone asterisks
      .replace(/^\s*\*{4,}\s*$/gm, "") // Lines with multiple asterisks
      .replace(/\*{2,}/g, "") // Multiple asterisks in a row

      // Convert list items to proper bullets
      .replace(/^\s*[-*]\s+/gm, "• ") // - or * at start of line
      .replace(/^\s*•\s+/gm, "• ") // Normalize existing bullets

      // Remove excessive punctuation and symbols
      .replace(/[•●◦▪▫]/g, "•")
      .replace(/[→←↑↓]/g, "->")
      .replace(/[✓✔]/g, "✓")
      .replace(/[✗✘]/g, "✗")

      // Clean up spacing - ensure proper paragraph breaks
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")

      // Ensure single spaces after periods
      .replace(/\.\s{2,}/g, ". ")

      // Clean up any remaining standalone asterisks
      .replace(/\s+\*\s+/g, " ") // Asterisks with spaces around them
      .replace(/^\*\s*/gm, "") // Asterisks at start of lines
      .replace(/\s*\*$/gm, "") // Asterisks at end of lines

      // Remove any remaining external links except contact page
      .replace(
        /(?:https?:\/\/)?(?:www\.)?fieldporter\.com\/(?!contact)\S+/gi,
        "our contact page",
      )

      // Final cleanup - remove empty lines created by asterisk removal
      .replace(/\n\s*\n\s*\n/g, "\n\n")
      .trim()
  );
};

// Business intelligence message analyser
const analyseMessageForIntelligence = (
  content: string,
): {
  businessKeywords: string[];
  painPoints: string[];
  urgencySignals: string[];
  technicalSignals: string[];
  budgetIndicators: string[];
  companySignals: string[];
} => {
  const lowerContent = content.toLowerCase();

  const businessKeywords = [
    "scale",
    "growth",
    "efficiency",
    "roi",
    "save time",
    "competitive advantage",
    "optimise",
    "streamline",
    "automate",
    "workflow",
    "process",
  ].filter((keyword) => lowerContent.includes(keyword));

  const painPoints = [
    "manual process",
    "time consuming",
    "inefficient",
    "bottleneck",
    "expensive",
    "difficult to scale",
    "taking too long",
    "costing us",
    "losing money",
    "wasting time",
    "frustrated",
    "stuck",
    "overwhelmed",
  ].filter((keyword) => lowerContent.includes(keyword));

  const urgencySignals = [
    "immediately",
    "asap",
    "urgent",
    "this quarter",
    "within weeks",
    "starting soon",
    "timeline",
    "deadline",
    "need now",
    "can't wait",
    "quickly",
  ].filter((keyword) => lowerContent.includes(keyword));

  const technicalSignals = [
    "api",
    "integration",
    "workflow",
    "automation",
    "system",
    "database",
    "architecture",
    "scalable",
    "enterprise",
    "technical team",
    "developer",
  ].filter((keyword) => lowerContent.includes(keyword));

  const budgetIndicators = [
    "budget",
    "investment",
    "cost",
    "price",
    "spend",
    "roi",
    "savings",
    "expensive",
    "affordable",
    "worth it",
    "pay for itself",
  ].filter((keyword) => lowerContent.includes(keyword));

  const companySignals = [
    "startup",
    "enterprise",
    "team of",
    "employees",
    "company",
    "business",
    "organisation",
    "we are",
    "we have",
    "our team",
  ].filter((keyword) => lowerContent.includes(keyword));

  return {
    businessKeywords,
    painPoints,
    urgencySignals,
    technicalSignals,
    budgetIndicators,
    companySignals,
  };
};

// Calculate lead qualification score
const calculateLeadScore = (
  messages: Message[],
): {
  score: number;
  qualification: "cold" | "warm" | "hot" | "qualified";
  reasoning: string[];
} => {
  let score = 2; // Base score
  const reasoning: string[] = [];

  const userMessages = messages.filter((msg) => msg.role === "user");
  const allIntelligence = {
    businessKeywords: [] as string[],
    painPoints: [] as string[],
    urgencySignals: [] as string[],
    technicalSignals: [] as string[],
    budgetIndicators: [] as string[],
    companySignals: [] as string[],
  };

  // Analyse all user messages and accumulate intelligence
  userMessages.forEach((msg) => {
    const intel = analyseMessageForIntelligence(msg.content);
    allIntelligence.businessKeywords.push(...intel.businessKeywords);
    allIntelligence.painPoints.push(...intel.painPoints);
    allIntelligence.urgencySignals.push(...intel.urgencySignals);
    allIntelligence.technicalSignals.push(...intel.technicalSignals);
    allIntelligence.budgetIndicators.push(...intel.budgetIndicators);
    allIntelligence.companySignals.push(...intel.companySignals);
  });

  // Remove duplicates
  allIntelligence.businessKeywords = [
    ...new Set(allIntelligence.businessKeywords),
  ];
  allIntelligence.painPoints = [...new Set(allIntelligence.painPoints)];
  allIntelligence.urgencySignals = [...new Set(allIntelligence.urgencySignals)];
  allIntelligence.technicalSignals = [
    ...new Set(allIntelligence.technicalSignals),
  ];
  allIntelligence.budgetIndicators = [
    ...new Set(allIntelligence.budgetIndicators),
  ];
  allIntelligence.companySignals = [...new Set(allIntelligence.companySignals)];

  // Scoring logic
  if (allIntelligence.painPoints.length > 0) {
    score += 3;
    reasoning.push(
      `${allIntelligence.painPoints.length} pain points identified`,
    );
  }

  if (allIntelligence.budgetIndicators.length > 0) {
    score += 3;
    reasoning.push("Budget discussion detected");
  }

  if (allIntelligence.urgencySignals.length > 0) {
    score +=
      allIntelligence.urgencySignals.includes("immediately") ||
      allIntelligence.urgencySignals.includes("asap")
        ? 4
        : 2;
    reasoning.push("Timeline urgency indicated");
  }

  if (allIntelligence.technicalSignals.length > 0) {
    score += 2;
    reasoning.push("Technical sophistication detected");
  }

  if (allIntelligence.companySignals.length > 0) {
    score += 2;
    reasoning.push("Business context provided");
  }

  if (userMessages.length >= 3) {
    score += 2;
    reasoning.push("High engagement level");
  }

  // Determine qualification
  let qualification: "cold" | "warm" | "hot" | "qualified" = "cold";
  if (score >= 12) qualification = "qualified";
  else if (score >= 8) qualification = "hot";
  else if (score >= 5) qualification = "warm";

  return { score, qualification, reasoning };
};

// Enhanced qualification prompt generator
const generateQualificationPrompt = (messages: Message[]): string | null => {
  const { score, qualification } = calculateLeadScore(messages);
  const userMessages = messages.filter((msg) => msg.role === "user");

  if (userMessages.length < 2) return null;

  const lastMessage = userMessages[userMessages.length - 1]?.content || "";
  const intelligence = analyseMessageForIntelligence(lastMessage);

  // High-value prospect prompts
  if (qualification === "qualified") {
    return "Based on what you've shared, you'd benefit significantly from a personalized automation roadmap. Shall I connect you with our strategic team for a consultation?";
  }

  if (qualification === "hot" && intelligence.budgetIndicators.length > 0) {
    return "For opportunities of this scale, we typically start with a strategic assessment. Would you like to explore a consultation to discuss your specific requirements?";
  }

  // Pain point follow-up
  if (intelligence.painPoints.length > 0 && userMessages.length >= 3) {
    return "You're dealing with exactly the type of operational challenges we help solve. Our approach typically saves businesses 15-20 hours weekly. Would you like to see how this applies to your situation?";
  }

  // Technical sophistication follow-up
  if (intelligence.technicalSignals.length > 0 && qualification === "warm") {
    return "You're asking the right technical questions. This level of implementation typically warrants a direct conversation with our team. Interested in a technical discussion?";
  }

  return null;
};

interface EnhancedChatWidgetProps {
  className?: string;
}

export function EnhancedChatWidget({ className }: EnhancedChatWidgetProps) {
  // Mobile detection using project's stable hook
  const isMobile = useStableMobile();

  const [isOpen, setIsOpen] = useState(false);
  const [messageManager] = useState(() => new MessageManager());
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [isN8nConnected, setIsN8nConnected] = useState(false);
  const [retryableError, setRetryableError] = useState<string | null>(null);
  const [responseStartTime, setResponseStartTime] = useState<number>(0);
  const [leadScore, setLeadScore] = useState(1);

  // Initialize messages and email from Enhanced MessageManager
  useEffect(() => {
    const initializeChat = async () => {
      // Wait a bit for Firebase initialization
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const initialMessages = messageManager.getMessages();
      if (initialMessages.length > 0) {
        // Only show messages if there's an existing conversation
        setMessages(initialMessages);
      } else {
        // Start with empty chat - no welcome message
        setMessages([]);
      }

      const email = messageManager.getUserEmail();
      if (email) {
        setUserEmail(email);
      }

      // Check Firebase connection status
      setIsFirebaseConnected(messageManager.isFirebaseConnected());

      // Check enhanced service health
      const serviceHealth = await enhancedChatService.healthCheck();
      setIsN8nConnected(serviceHealth.healthy);
    };

    initializeChat();
  }, [messageManager]);

  // Listen for open chat widget events from other components
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };

    // Listen for custom event from hero button
    window.addEventListener("open-chat-widget", handleOpenChat);

    return () => {
      window.removeEventListener("open-chat-widget", handleOpenChat);
    };
  }, []);

  // Cleanup effect to flush pending Firebase operations
  useEffect(() => {
    return () => {
      // Cleanup handled automatically by the simplified MessageManager
    };
  }, [messageManager]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userInput = inputValue.trim();
    setError(null);
    setRetryableError(null);

    // Immediately update UI for better perceived performance
    setInputValue("");
    setIsLoading(true);
    setResponseStartTime(Date.now());

    // Add user message
    const userMessage = await messageManager.addMessage(userInput, "user");
    if (!userMessage) {
      setError(
        "Failed to send message. Please check your input and try again.",
      );
      setIsLoading(false);
      return;
    }

    setMessages(messageManager.getMessages());

    try {
      if (process.env.NODE_ENV === "development") {
        console.log("🚀 Starting AI request for message:", userInput);
      }

      // Single API call - all processing happens server-side now
      const aiResponse = await enhancedChatService.getChatResponse(
        userInput,
        messageManager.getSessionId(),
        messageManager.getMessages().slice(-8),
        userEmail,
      );

      if (process.env.NODE_ENV === "development") {
        console.log("📥 AI Response received:", {
          responseLength: aiResponse.response.length,
          hasError: !!aiResponse.error,
        });
      }

      let responseContent: string;

      if (aiResponse.error) {
        if (aiResponse.error.retryable) {
          setRetryableError(aiResponse.error.message);
          responseContent = aiResponse.response;
        } else {
          responseContent = FALLBACK_RESPONSES.error;
        }
        setIsN8nConnected(false);
      } else {
        responseContent = formatChatResponse(aiResponse.response);

        // Quick validation only
        if (responseContent.length < 10) {
          responseContent = FALLBACK_RESPONSES.inappropriate;
        }

        setRetryableError(null);
        setIsN8nConnected(true);
      }

      const assistantMessage = await messageManager.addMessage(
        responseContent,
        "assistant",
      );

      if (assistantMessage) {
        messageManager.updateMessageStatus(userMessage.id, "sent");
        setMessages(messageManager.getMessages());

        // Simple analytics tracking
        const finalResponseTime = Date.now() - responseStartTime;
        chatbotAnalytics.trackInteraction({
          sessionId: messageManager.getSessionId(),
          messageCount: messageManager.getMessages().length,
          responseTime: finalResponseTime,
          leadScore: aiResponse.leadScore || 1,
          conversationSource: "chat_widget",
          deviceType: window.innerWidth < 768 ? "mobile" : "desktop",
        });
      } else {
        throw new Error("Failed to process AI response");
      }
    } catch (error) {
      console.error("💥 Error in handleSendMessage:", error);

      // Add error message for user
      await messageManager.addMessage(
        "We're having trouble connecting right now. Please try again, or you can email us directly at freddy@fieldporter.com.",
        "assistant",
      );

      setMessages(messageManager.getMessages());
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookConsultation = async () => {
    // Track the consultation request
    await messageManager.markConsultationRequested();

    // Close the chat dialog
    setIsOpen(false);

    // Route to contact page
    window.location.href = "/contact";
  };

  const handleNewChat = useCallback(async () => {
    try {
      // Clear local state
      setMessages([]);
      setInputValue("");
      setUserEmail("");
      setError(null);
      setRetryableError(null);
      setIsLoading(false);
      setLeadScore(1);

      // Clear MessageManager conversation
      messageManager.clearConversation();

      // Reset Firebase connection
      setIsFirebaseConnected(messageManager.isFirebaseConnected());

      if (process.env.NODE_ENV === "development") {
        console.log(
          "🔄 New chat session started:",
          messageManager.getSessionId(),
        );
      }

      // No automatic message - let user start fresh
    } catch (error) {
      console.error("Error starting new chat:", error);
      setError("Failed to start new conversation. Please try again.");
    }
  }, [messageManager]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn("", className)}>
      <ResponsiveChatManager
        isOpen={isOpen}
        onToggle={handleToggleChat}
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        onBookConsultation={handleBookConsultation}
        onNewChat={handleNewChat}
      />
    </div>
  );
}
