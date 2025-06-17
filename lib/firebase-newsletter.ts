import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface NewsletterSubscription {
  email: string;
  source: 'footer' | 'insights' | 'secondary_conversion' | 'resource_download' | 'slideout';
  page_url: string;
  subscribed_at: Timestamp;
  status: 'active' | 'unsubscribed';
  lead_score: number;
  user_agent: string;
  metadata: {
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    company_domain?: string;
    email_domain?: string;
    trigger_type?: string;
    [key: string]: string | number | boolean | undefined;
  };
}

export interface NewsletterFormData {
  email: string;
  source: 'footer' | 'insights' | 'secondary_conversion' | 'resource_download' | 'slideout';
  metadata?: {
    name?: string;
    company?: string;
    interest?: string;
    trigger_type?: string;
    [key: string]: string | number | boolean | undefined;
  };
}

const NEWSLETTER_COLLECTION = 'newsletter_subscriptions';
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY_BASE = 1000;

// Email domain scoring for lead qualification
const BUSINESS_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'protonmail.com',
  'mail.com',
];

const HIGH_VALUE_DOMAINS = [
  'microsoft.com',
  'google.com',
  'amazon.com',
  'apple.com',
  'meta.com',
  'salesforce.com',
  'oracle.com',
  'ibm.com',
  'accenture.com',
  'deloitte.com',
  'mckinsey.com',
  'bcg.com',
  'bain.com',
];

// Source-based scoring
const SOURCE_SCORES = {
  footer: 2, // Basic interest
  insights: 4, // Content engagement
  secondary_conversion: 5, // High intent
  resource_download: 6, // Very high intent
  slideout: 5, // High intent - engaged user who stayed long enough
};

export class FirebaseNewsletterService {
  /**
   * Calculate lead score based on email and subscription context
   */
  private calculateLeadScore(formData: NewsletterFormData): number {
    let score = 1; // Base score

    // Source-based scoring
    score += SOURCE_SCORES[formData.source] || 1;

    // Email domain analysis
    const emailDomain = formData.email.split('@')[1]?.toLowerCase();
    if (emailDomain) {
      if (HIGH_VALUE_DOMAINS.includes(emailDomain)) {
        score += 5; // Enterprise domain
      } else if (!BUSINESS_EMAIL_DOMAINS.includes(emailDomain)) {
        score += 3; // Business domain (not consumer)
      } else {
        score += 1; // Consumer email
      }
    }

    // Metadata-based scoring
    if (formData.metadata?.company) {
      score += 2; // Company provided
    }

    if (formData.metadata?.name) {
      score += 1; // Name provided
    }

    // Interest-specific scoring
    if (formData.metadata?.interest) {
      const interest = formData.metadata.interest.toLowerCase();
      if (interest.includes('enterprise') || interest.includes('strategy')) {
        score += 2;
      }
      if (interest.includes('urgent') || interest.includes('immediate')) {
        score += 1;
      }
    }

    return Math.min(score, 10); // Cap at 10
  }

  /**
   * Extract URL parameters for tracking
   */
  private extractUrlMetadata(): {
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  } {
    if (typeof window === 'undefined') return {};

    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer;
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');

    return {
      ...(referrer && { referrer }),
      ...(utmSource && { utm_source: utmSource }),
      ...(utmMedium && { utm_medium: utmMedium }),
      ...(utmCampaign && { utm_campaign: utmCampaign }),
    };
  }

  /**
   * Retry wrapper with exponential backoff
   */
  private async withRetry<T>(operation: () => Promise<T>, operationName: string): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        if (process.env.NODE_ENV === 'development') {
          console.error(`${operationName} attempt ${attempt} failed:`, error);
        }

        if (attempt < RETRY_ATTEMPTS) {
          const delay = RETRY_DELAY_BASE * Math.pow(2, attempt - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw new Error(
      `${operationName} failed after ${RETRY_ATTEMPTS} attempts: ${lastError?.message}`
    );
  }

  /**
   * Submit newsletter subscription to Firebase
   */
  async subscribeToNewsletter(
    formData: NewsletterFormData
  ): Promise<{ success: boolean; subscriptionId?: string; error?: string }> {
    try {
      // Generate unique subscription ID
      const subscriptionId = `newsletter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Extract email domain for metadata
      const emailDomain = formData.email.split('@')[1]?.toLowerCase();
      const companyDomain = formData.metadata?.company
        ? formData.metadata.company.toLowerCase().replace(/[^a-z0-9]/g, '')
        : undefined;

      // Build subscription document
      const subscription: NewsletterSubscription = {
        email: formData.email.trim().toLowerCase(),
        source: formData.source,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        subscribed_at: Timestamp.now(),
        status: 'active',
        lead_score: this.calculateLeadScore(formData),
        user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
        metadata: {
          ...this.extractUrlMetadata(),
          ...formData.metadata,
          ...(emailDomain && { email_domain: emailDomain }),
          ...(companyDomain && { company_domain: companyDomain }),
        },
      };

      // Save to Firebase
      await this.withRetry(async () => {
        const subscriptionRef = doc(db, NEWSLETTER_COLLECTION, subscriptionId);
        await setDoc(subscriptionRef, subscription);
      }, 'subscribeToNewsletter');

      // Track analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'newsletter_signup', {
          source: formData.source,
          email_domain: emailDomain,
          lead_score: subscription.lead_score,
          page_url: subscription.page_url,
          has_company: !!formData.metadata?.company,
          has_name: !!formData.metadata?.name,
        });
      }

      return { success: true, subscriptionId };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      if (process.env.NODE_ENV === 'development') {
        console.error('Newsletter subscription error:', error);
      }

      return { success: false, error: errorMessage };
    }
  }

  /**
   * Validate email before subscription
   */
  validateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email || !email.trim()) {
      return { isValid: false, error: 'Email is required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }

    // Check for common typos
    const commonTypos = ['gmial.com', 'gmai.com', 'yahooo.com', 'hotmial.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && commonTypos.includes(domain)) {
      return { isValid: false, error: 'Please check your email address for typos' };
    }

    return { isValid: true };
  }

  /**
   * Check if email is already subscribed (optional duplicate prevention)
   */
  async checkExistingSubscription(email: string): Promise<boolean> {
    try {
      // This would require a query, but for now we'll allow duplicates
      // and handle deduplication in the backend/admin interface
      return false;
    } catch (error) {
      // If we can't check, allow the subscription
      return false;
    }
  }
}

// Export singleton instance
export const firebaseNewsletterService = new FirebaseNewsletterService();
