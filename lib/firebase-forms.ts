import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  challengeDescription: string;
  timeline: string;
  budgetRange?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  company: string | null;
  project_type: string;
  challenge_description: string;
  timeline: string;
  budget_range: string | null;
  lead_score: number;
  submitted_at: Timestamp;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  source: 'contact_form';
}

const CONTACT_SUBMISSIONS_COLLECTION = 'contact_submissions';
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY_BASE = 1000;

// Lead scoring based on project type and timeline
const PROJECT_TYPE_SCORES = {
  'Strategic Research Intelligence': 5,
  'Rapid Development & Integration': 4,
  'Process Efficiency & Workflow Optimization': 4,
  'AI Training & Implementation Education': 3,
  "Not Sure - Let's Discuss": 2,
};

const TIMELINE_SCORES = {
  'Urgent (days)': 5,
  'Short-term (weeks)': 4,
  'Medium-term (months)': 3,
  Flexible: 2,
};

const BUDGET_SCORES = {
  'Under $3K': 2,
  '$3K-$8K': 4,
  'Above $8K': 5,
  "Let's discuss": 3,
};

export class FirebaseFormsService {
  /**
   * Calculate lead score based on form data
   */
  private calculateLeadScore(formData: ContactFormData): number {
    let score = 1; // Base score

    // Project type scoring
    score += PROJECT_TYPE_SCORES[formData.projectType as keyof typeof PROJECT_TYPE_SCORES] || 1;

    // Timeline scoring
    score += TIMELINE_SCORES[formData.timeline as keyof typeof TIMELINE_SCORES] || 1;

    // Budget scoring
    if (formData.budgetRange) {
      score += BUDGET_SCORES[formData.budgetRange as keyof typeof BUDGET_SCORES] || 1;
    }

    // Company presence (indicates business context)
    if (formData.company && formData.company.trim()) {
      score += 1;
    }

    // Challenge description length (indicates thoughtfulness)
    if (formData.challengeDescription.length > 100) {
      score += 1;
    }

    return Math.min(score, 10); // Cap at 10
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
   * Submit contact form data to Firebase
   */
  async submitContactForm(
    formData: ContactFormData
  ): Promise<{ success: boolean; submissionId?: string; error?: string }> {
    try {
      const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const submission: ContactSubmission = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        company: formData.company?.trim() || null,
        project_type: formData.projectType,
        challenge_description: formData.challengeDescription.trim(),
        timeline: formData.timeline,
        budget_range: formData.budgetRange || null,
        lead_score: this.calculateLeadScore(formData),
        submitted_at: Timestamp.now(),
        status: 'new',
        source: 'contact_form',
      };

      await this.withRetry(async () => {
        const submissionRef = doc(db, CONTACT_SUBMISSIONS_COLLECTION, submissionId);
        await setDoc(submissionRef, submission);
      }, 'submitContactForm');

      // Track analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'contact_form_submission', {
          project_type: formData.projectType,
          timeline: formData.timeline,
          lead_score: submission.lead_score,
          has_company: !!formData.company,
          has_budget: !!formData.budgetRange,
        });
      }

      return { success: true, submissionId };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      if (process.env.NODE_ENV === 'development') {
        console.error('Contact form submission error:', error);
      }

      return { success: false, error: errorMessage };
    }
  }

  /**
   * Validate form data before submission
   */
  validateFormData(formData: ContactFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Required field validation
    if (!formData.name.trim()) {
      errors.push('Name is required');
    }

    if (!formData.email.trim()) {
      errors.push('Email is required');
    } else {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.push('Please enter a valid email address');
      }
    }

    if (!formData.projectType) {
      errors.push('Project type is required');
    }

    if (!formData.challengeDescription.trim()) {
      errors.push('Challenge description is required');
    } else if (formData.challengeDescription.trim().length < 20) {
      errors.push('Please provide more details about your challenge (minimum 20 characters)');
    }

    if (!formData.timeline) {
      errors.push('Timeline is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// Export singleton instance
export const firebaseFormsService = new FirebaseFormsService();
