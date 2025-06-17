import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface UserInteraction {
  interaction_type:
    | 'button_click'
    | 'page_view'
    | 'download_attempt'
    | 'email_click'
    | 'social_share';
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

const ANALYTICS_COLLECTION = 'user_interactions';
const SESSION_STORAGE_KEY = 'fieldporter_session_id';

export class FirebaseAnalyticsService {
  private sessionId: string;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
  }

  /**
   * Get or create a session ID for tracking user interactions
   */
  private getOrCreateSessionId(): string {
    if (typeof window === 'undefined') {
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
    if (typeof window === 'undefined') return {};
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  /**
   * Get scroll depth percentage
   */
  private getScrollDepth(): number {
    if (typeof window === 'undefined') return 0;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    return documentHeight > 0 ? Math.round((scrollTop / documentHeight) * 100) : 0;
  }

  /**
   * Track a user interaction
   */
  async trackInteraction(
    interactionType: UserInteraction['interaction_type'],
    elementId?: string,
    elementText?: string,
    additionalMetadata?: Record<string, string | number | boolean | undefined>
  ): Promise<void> {
    try {
      if (typeof window === 'undefined') return;

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
      setDoc(interactionRef, interaction).catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Analytics tracking failed:', error);
        }
      });

      // Also track with Google Analytics if available
      if (window.gtag) {
        window.gtag('event', interactionType, {
          element_id: elementId,
          element_text: elementText,
          page_url: window.location.href,
          session_id: this.sessionId,
          ...additionalMetadata,
        });
      }
    } catch (error) {
      // Silently fail - analytics should never break the user experience
      if (process.env.NODE_ENV === 'development') {
        console.warn('Analytics tracking error:', error);
      }
    }
  }

  /**
   * Track button clicks
   */
  async trackButtonClick(
    buttonId: string,
    buttonText: string,
    additionalData?: Record<string, string | number | boolean>
  ): Promise<void> {
    await this.trackInteraction('button_click', buttonId, buttonText, {
      button_type: 'cta',
      ...additionalData,
    });
  }

  /**
   * Track CTA button clicks specifically
   */
  async trackCTAClick(
    ctaType: 'consultation' | 'download' | 'newsletter' | 'contact' | 'service_interest',
    ctaText: string,
    additionalData?: Record<string, string | number | boolean>
  ): Promise<void> {
    await this.trackInteraction('button_click', `cta_${ctaType}`, ctaText, {
      cta_type: ctaType,
      button_category: 'conversion',
      ...additionalData,
    });
  }

  /**
   * Track service interest clicks
   */
  async trackServiceInterest(
    serviceName: string,
    interactionType: 'learn_more' | 'get_started' | 'view_details',
    additionalData?: Record<string, string | number | boolean>
  ): Promise<void> {
    await this.trackInteraction('button_click', `service_${serviceName}`, serviceName, {
      service_name: serviceName,
      interaction_type: interactionType,
      category: 'service_interest',
      ...additionalData,
    });
  }

  /**
   * Track portfolio project interest
   */
  async trackPortfolioInterest(
    projectName: string,
    interactionType: 'view_details' | 'external_link',
    additionalData?: Record<string, string | number | boolean>
  ): Promise<void> {
    await this.trackInteraction('button_click', `portfolio_${projectName}`, projectName, {
      project_name: projectName,
      interaction_type: interactionType,
      category: 'portfolio_interest',
      ...additionalData,
    });
  }

  /**
   * Track email link clicks
   */
  async trackEmailClick(emailAddress: string, context?: string): Promise<void> {
    await this.trackInteraction('email_click', 'email_link', emailAddress, {
      email_address: emailAddress,
      context: context || 'general',
      category: 'contact_intent',
    });
  }

  /**
   * Track social media clicks
   */
  async trackSocialClick(
    platform: 'linkedin' | 'twitter' | 'github',
    context?: string
  ): Promise<void> {
    await this.trackInteraction('button_click', `social_${platform}`, platform, {
      social_platform: platform,
      context: context || 'footer',
      category: 'social_engagement',
    });
  }

  /**
   * Track download attempts
   */
  async trackDownloadAttempt(
    resourceType: string,
    resourceName: string,
    additionalData?: Record<string, string | number | boolean>
  ): Promise<void> {
    await this.trackInteraction('download_attempt', `download_${resourceType}`, resourceName, {
      resource_type: resourceType,
      resource_name: resourceName,
      category: 'resource_interest',
      ...additionalData,
    });
  }

  /**
   * Track page views with engagement metrics
   */
  async trackPageView(additionalData?: Record<string, string | number | boolean>): Promise<void> {
    if (typeof window === 'undefined') return;

    // Track initial page view
    await this.trackInteraction('page_view', 'page_load', document.title, {
      page_title: document.title,
      page_path: window.location.pathname,
      category: 'navigation',
      ...additionalData,
    });

    // Track engagement after user has been on page for 10 seconds
    setTimeout(() => {
      this.trackInteraction('page_view', 'engagement_10s', document.title, {
        page_title: document.title,
        page_path: window.location.pathname,
        engagement_duration: 10,
        category: 'engagement',
        ...additionalData,
      });
    }, 10000);

    // Track deep engagement after 30 seconds
    setTimeout(() => {
      this.trackInteraction('page_view', 'engagement_30s', document.title, {
        page_title: document.title,
        page_path: window.location.pathname,
        engagement_duration: 30,
        category: 'deep_engagement',
        ...additionalData,
      });
    }, 30000);
  }

  /**
   * Create trackable button component wrapper
   */
  createTrackableButton(
    buttonType: 'cta' | 'service' | 'portfolio' | 'social' | 'general',
    identifier: string,
    text: string,
    additionalData?: Record<string, string | number | boolean>
  ) {
    return {
      onClick: () => {
        switch (buttonType) {
          case 'cta':
            this.trackCTAClick(
              identifier as
                | 'consultation'
                | 'download'
                | 'newsletter'
                | 'contact'
                | 'service_interest',
              text,
              additionalData
            );
            break;
          case 'service':
            this.trackServiceInterest(identifier, 'learn_more', additionalData);
            break;
          case 'portfolio':
            this.trackPortfolioInterest(identifier, 'view_details', additionalData);
            break;
          case 'social':
            this.trackSocialClick(
              identifier as 'linkedin' | 'twitter' | 'github',
              additionalData?.['context'] as string
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
  ctaType: 'consultation' | 'download' | 'newsletter' | 'contact' | 'service_interest',
  ctaText: string,
  additionalData?: Record<string, string | number | boolean>
) => firebaseAnalyticsService.trackCTAClick(ctaType, ctaText, additionalData);

export const trackServiceInterest = (
  serviceName: string,
  interactionType: 'learn_more' | 'get_started' | 'view_details' = 'learn_more',
  additionalData?: Record<string, string | number | boolean>
) => firebaseAnalyticsService.trackServiceInterest(serviceName, interactionType, additionalData);

export const trackPortfolioInterest = (
  projectName: string,
  interactionType: 'view_details' | 'external_link' = 'view_details',
  additionalData?: Record<string, string | number | boolean>
) => firebaseAnalyticsService.trackPortfolioInterest(projectName, interactionType, additionalData);

export const trackEmailClick = (emailAddress: string, context?: string) =>
  firebaseAnalyticsService.trackEmailClick(emailAddress, context);

export const trackSocialClick = (platform: 'linkedin' | 'twitter' | 'github', context?: string) =>
  firebaseAnalyticsService.trackSocialClick(platform, context);

export const trackDownload = (
  resourceType: string,
  resourceName: string,
  additionalData?: Record<string, string | number | boolean>
) => firebaseAnalyticsService.trackDownloadAttempt(resourceType, resourceName, additionalData);

export const trackPageView = (additionalData?: Record<string, string | number | boolean>) =>
  firebaseAnalyticsService.trackPageView(additionalData);
