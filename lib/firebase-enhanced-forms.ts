import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// Resource Download Form Data
export interface ResourceDownloadData {
  name: string;
  email: string;
  company: string;
  resourceType: 'ai_readiness_assessment' | 'case_study' | 'whitepaper' | 'framework';
  resourceName?: string;
}

// General Inquiry Form Data
export interface GeneralInquiryData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  urgency?: 'low' | 'medium' | 'high';
}

// Advanced Consultation Form Data
export interface ConsultationBookingData {
  // Step 1: Contact Information
  fullName: string;
  email: string;
  companyName: string;
  jobTitle: string;
  phone?: string;

  // Step 2: Company Context
  companySize: string;
  industry: string;
  businessChallenge: string;
  aiStatus: string;
  successVision: string;

  // Step 3: Consultation Focus
  serviceInterests: string[];
  timeline: string;
  budgetRange: string;
  techComfort: string;
  objectives: string;

  // Step 4: Scheduling
  consultationFormat: string;
  availability: string;
  stakeholders?: string;
  preparationMaterials?: string;
}

// Firebase Document Interfaces
export interface ResourceDownloadSubmission {
  name: string;
  email: string;
  company: string;
  resource_type: string;
  resource_name: string | null;
  lead_score: number;
  submitted_at: Timestamp;
  status: 'new' | 'sent' | 'downloaded';
  source: 'secondary_conversion' | 'insights' | 'direct';
  metadata: {
    page_url: string;
    user_agent: string;
    email_domain: string;
    company_domain?: string;
    [key: string]: string | number | boolean | undefined;
  };
}

export interface GeneralInquirySubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string | null;
  urgency: string;
  lead_score: number;
  submitted_at: Timestamp;
  status: 'new' | 'responded' | 'closed';
  source: 'secondary_conversion' | 'contact_page' | 'direct';
  metadata: {
    page_url: string;
    user_agent: string;
    email_domain: string;
    message_length: number;
    [key: string]: string | number | boolean | undefined;
  };
}

export interface ConsultationBookingSubmission {
  // Contact Information
  full_name: string;
  email: string;
  company_name: string;
  job_title: string;
  phone: string | null;

  // Company Context
  company_size: string;
  industry: string;
  business_challenge: string;
  ai_status: string;
  success_vision: string;

  // Consultation Focus
  service_interests: string[];
  timeline: string;
  budget_range: string;
  tech_comfort: string;
  objectives: string;

  // Scheduling
  consultation_format: string;
  availability: string;
  stakeholders: string | null;
  preparation_materials: string | null;

  // Metadata
  lead_score: number;
  submitted_at: Timestamp;
  status: 'new' | 'scheduled' | 'completed' | 'cancelled';
  source: 'consultation_form' | 'secondary_conversion';
  metadata: {
    page_url: string;
    user_agent: string;
    email_domain: string;
    form_completion_time?: number;
    [key: string]: string | number | boolean | undefined;
  };
}

const COLLECTIONS = {
  RESOURCE_DOWNLOADS: 'resource_downloads',
  GENERAL_INQUIRIES: 'general_inquiries',
  CONSULTATION_BOOKINGS: 'consultation_bookings',
};

const RETRY_ATTEMPTS = 3;
const RETRY_DELAY_BASE = 1000;

// Lead scoring configurations
const COMPANY_SIZE_SCORES = {
  'Startup (1-10)': 3,
  'Small (11-50)': 4,
  'Medium (51-200)': 5,
  'Large (201-1000)': 6,
  'Enterprise (1000+)': 7,
};

const BUDGET_SCORES = {
  'Under $10K': 2,
  '$10K-$25K': 3,
  '$25K-$50K': 4,
  '$50K-$100K': 5,
  'Above $100K': 6,
  "Let's discuss": 3,
};

const TIMELINE_SCORES = {
  'Urgent (1-2 weeks)': 6,
  'Short-term (1-2 months)': 5,
  'Medium-term (3-6 months)': 4,
  'Long-term (6+ months)': 3,
  'Flexible timeline': 2,
};

const URGENCY_SCORES = {
  low: 1,
  medium: 3,
  high: 5,
};

export class FirebaseEnhancedFormsService {
  /**
   * Calculate lead score for resource downloads
   */
  private calculateResourceDownloadScore(formData: ResourceDownloadData): number {
    let score = 3; // Base score for resource interest

    // Email domain analysis
    const emailDomain = formData.email.split('@')[1]?.toLowerCase();
    if (emailDomain) {
      const businessDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      if (!businessDomains.includes(emailDomain)) {
        score += 2; // Business email
      }
    }

    // Company provided
    if (formData.company && formData.company.trim()) {
      score += 2;
    }

    // Resource type scoring
    const resourceScores = {
      ai_readiness_assessment: 4,
      case_study: 3,
      whitepaper: 2,
      framework: 3,
    };
    score += resourceScores[formData.resourceType] || 2;

    return Math.min(score, 10);
  }

  /**
   * Calculate lead score for general inquiries
   */
  private calculateInquiryScore(formData: GeneralInquiryData): number {
    let score = 2; // Base score

    // Email domain analysis
    const emailDomain = formData.email.split('@')[1]?.toLowerCase();
    if (emailDomain) {
      const businessDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      if (!businessDomains.includes(emailDomain)) {
        score += 2;
      }
    }

    // Company provided
    if (formData.company && formData.company.trim()) {
      score += 1;
    }

    // Urgency scoring
    if (formData.urgency) {
      score += URGENCY_SCORES[formData.urgency] || 1;
    }

    // Message length (indicates thoughtfulness)
    if (formData.message.length > 100) {
      score += 1;
    }
    if (formData.message.length > 300) {
      score += 1;
    }

    return Math.min(score, 10);
  }

  /**
   * Calculate lead score for consultation bookings
   */
  private calculateConsultationScore(formData: ConsultationBookingData): number {
    let score = 5; // Base score for consultation interest

    // Company size scoring
    score += COMPANY_SIZE_SCORES[formData.companySize as keyof typeof COMPANY_SIZE_SCORES] || 2;

    // Budget scoring
    score += BUDGET_SCORES[formData.budgetRange as keyof typeof BUDGET_SCORES] || 2;

    // Timeline scoring
    score += TIMELINE_SCORES[formData.timeline as keyof typeof TIMELINE_SCORES] || 2;

    // Service interests (multiple interests = higher score)
    score += Math.min(formData.serviceInterests.length, 3);

    // Phone provided
    if (formData.phone && formData.phone.trim()) {
      score += 1;
    }

    // Detailed objectives
    if (formData.objectives && formData.objectives.length > 100) {
      score += 1;
    }

    return Math.min(score, 10);
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
   * Submit resource download request
   */
  async submitResourceDownload(
    formData: ResourceDownloadData,
    source: 'secondary_conversion' | 'insights' | 'direct' = 'secondary_conversion'
  ): Promise<{ success: boolean; submissionId?: string; error?: string }> {
    try {
      const submissionId = `resource_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const emailDomain = formData.email.split('@')[1]?.toLowerCase();

      const submission: ResourceDownloadSubmission = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        company: formData.company.trim(),
        resource_type: formData.resourceType,
        resource_name: formData.resourceName || null,
        lead_score: this.calculateResourceDownloadScore(formData),
        submitted_at: Timestamp.now(),
        status: 'new',
        source,
        metadata: {
          page_url: typeof window !== 'undefined' ? window.location.href : '',
          user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
          email_domain: emailDomain || '',
          company_domain: formData.company.toLowerCase().replace(/[^a-z0-9]/g, ''),
        },
      };

      await this.withRetry(async () => {
        const submissionRef = doc(db, COLLECTIONS.RESOURCE_DOWNLOADS, submissionId);
        await setDoc(submissionRef, submission);
      }, 'submitResourceDownload');

      // Track analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'resource_download_request', {
          resource_type: formData.resourceType,
          company: formData.company,
          lead_score: submission.lead_score,
          source,
        });
      }

      return { success: true, submissionId };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      if (process.env.NODE_ENV === 'development') {
        console.error('Resource download submission error:', error);
      }
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Submit general inquiry
   */
  async submitGeneralInquiry(
    formData: GeneralInquiryData,
    source: 'secondary_conversion' | 'contact_page' | 'direct' = 'secondary_conversion'
  ): Promise<{ success: boolean; submissionId?: string; error?: string }> {
    try {
      const submissionId = `inquiry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const emailDomain = formData.email.split('@')[1]?.toLowerCase();

      const submission: GeneralInquirySubmission = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        company: formData.company?.trim() || null,
        urgency: formData.urgency || 'medium',
        lead_score: this.calculateInquiryScore(formData),
        submitted_at: Timestamp.now(),
        status: 'new',
        source,
        metadata: {
          page_url: typeof window !== 'undefined' ? window.location.href : '',
          user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
          email_domain: emailDomain || '',
          message_length: formData.message.length,
        },
      };

      await this.withRetry(async () => {
        const submissionRef = doc(db, COLLECTIONS.GENERAL_INQUIRIES, submissionId);
        await setDoc(submissionRef, submission);
      }, 'submitGeneralInquiry');

      // Track analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'general_inquiry_submission', {
          subject: formData.subject,
          urgency: formData.urgency,
          lead_score: submission.lead_score,
          has_company: !!formData.company,
          source,
        });
      }

      return { success: true, submissionId };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      if (process.env.NODE_ENV === 'development') {
        console.error('General inquiry submission error:', error);
      }
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Submit consultation booking
   */
  async submitConsultationBooking(
    formData: ConsultationBookingData,
    source: 'consultation_form' | 'secondary_conversion' = 'consultation_form'
  ): Promise<{ success: boolean; submissionId?: string; error?: string }> {
    try {
      const submissionId = `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const emailDomain = formData.email.split('@')[1]?.toLowerCase();

      const submission: ConsultationBookingSubmission = {
        full_name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        company_name: formData.companyName.trim(),
        job_title: formData.jobTitle.trim(),
        phone: formData.phone?.trim() || null,
        company_size: formData.companySize,
        industry: formData.industry,
        business_challenge: formData.businessChallenge.trim(),
        ai_status: formData.aiStatus,
        success_vision: formData.successVision.trim(),
        service_interests: formData.serviceInterests,
        timeline: formData.timeline,
        budget_range: formData.budgetRange,
        tech_comfort: formData.techComfort,
        objectives: formData.objectives.trim(),
        consultation_format: formData.consultationFormat,
        availability: formData.availability,
        stakeholders: formData.stakeholders?.trim() || null,
        preparation_materials: formData.preparationMaterials?.trim() || null,
        lead_score: this.calculateConsultationScore(formData),
        submitted_at: Timestamp.now(),
        status: 'new',
        source,
        metadata: {
          page_url: typeof window !== 'undefined' ? window.location.href : '',
          user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
          email_domain: emailDomain || '',
        },
      };

      await this.withRetry(async () => {
        const submissionRef = doc(db, COLLECTIONS.CONSULTATION_BOOKINGS, submissionId);
        await setDoc(submissionRef, submission);
      }, 'submitConsultationBooking');

      // Track analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'consultation_booking_request', {
          company_size: formData.companySize,
          industry: formData.industry,
          budget_range: formData.budgetRange,
          timeline: formData.timeline,
          lead_score: submission.lead_score,
          service_interests: formData.serviceInterests.join(','),
          source,
        });
      }

      return { success: true, submissionId };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      if (process.env.NODE_ENV === 'development') {
        console.error('Consultation booking submission error:', error);
      }
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Validation methods
   */
  validateResourceDownload(formData: ResourceDownloadData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.company.trim()) errors.push('Company is required');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email.trim())) {
      errors.push('Please enter a valid email address');
    }

    return { isValid: errors.length === 0, errors };
  }

  validateGeneralInquiry(formData: GeneralInquiryData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.subject.trim()) errors.push('Subject is required');
    if (!formData.message.trim()) errors.push('Message is required');

    if (formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email.trim())) {
      errors.push('Please enter a valid email address');
    }

    return { isValid: errors.length === 0, errors };
  }

  validateConsultationBooking(formData: ConsultationBookingData): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Required fields validation
    if (!formData.fullName.trim()) errors.push('Full name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.companyName.trim()) errors.push('Company name is required');
    if (!formData.jobTitle.trim()) errors.push('Job title is required');
    if (!formData.companySize) errors.push('Company size is required');
    if (!formData.industry) errors.push('Industry is required');
    if (!formData.businessChallenge.trim()) errors.push('Business challenge is required');
    if (!formData.aiStatus) errors.push('AI status is required');
    if (!formData.successVision.trim()) errors.push('Success vision is required');
    if (formData.serviceInterests.length === 0)
      errors.push('At least one service interest is required');
    if (!formData.timeline) errors.push('Timeline is required');
    if (!formData.budgetRange) errors.push('Budget range is required');
    if (!formData.techComfort) errors.push('Tech comfort level is required');
    if (!formData.objectives.trim()) errors.push('Objectives are required');
    if (!formData.consultationFormat) errors.push('Consultation format is required');
    if (!formData.availability) errors.push('Availability is required');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email.trim())) {
      errors.push('Please enter a valid email address');
    }

    // Minimum length validations
    if (formData.businessChallenge.trim().length < 20) {
      errors.push('Business challenge must be at least 20 characters');
    }
    if (formData.successVision.trim().length < 20) {
      errors.push('Success vision must be at least 20 characters');
    }
    if (formData.objectives.trim().length < 20) {
      errors.push('Objectives must be at least 20 characters');
    }

    return { isValid: errors.length === 0, errors };
  }
}

// Export singleton instance
export const firebaseEnhancedFormsService = new FirebaseEnhancedFormsService();
