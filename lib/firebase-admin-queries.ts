import { collection, getDocs, limit, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { db } from './firebase';

// Types for business intelligence data
export interface LeadSummary {
  id: string;
  email: string;
  name?: string;
  company?: string;
  lead_score: number;
  source: string;
  submitted_at: Timestamp;
  status: string;
  type: 'contact' | 'newsletter' | 'resource_download' | 'general_inquiry' | 'consultation';
}

export interface ConversionFunnelData {
  page_views: number;
  newsletter_signups: number;
  resource_downloads: number;
  contact_forms: number;
  consultation_requests: number;
  conversion_rate: number;
}

export interface ServiceInterestData {
  service_name: string;
  interest_count: number;
  lead_count: number;
  avg_lead_score: number;
}

export interface DailyMetrics {
  date: string;
  total_submissions: number;
  newsletter_signups: number;
  contact_forms: number;
  resource_downloads: number;
  consultation_requests: number;
  avg_lead_score: number;
  high_value_leads: number; // Score 7+
}

export interface UserBehaviorInsights {
  total_interactions: number;
  most_clicked_elements: Array<{
    element_id: string;
    element_text: string;
    click_count: number;
  }>;
  popular_pages: Array<{
    page_url: string;
    view_count: number;
    avg_engagement_time: number;
  }>;
  conversion_paths: Array<{
    path: string;
    conversion_count: number;
  }>;
}

const COLLECTIONS = {
  CONTACTS: 'contact_submissions',
  NEWSLETTERS: 'newsletter_subscriptions',
  RESOURCES: 'resource_downloads',
  INQUIRIES: 'general_inquiries',
  CONSULTATIONS: 'consultation_bookings',
  INTERACTIONS: 'user_interactions',
};

export class FirebaseAdminQueriesService {
  /**
   * Get high-value leads (score 7+) from all sources
   */
  async getHighValueLeads(limitCount: number = 50): Promise<LeadSummary[]> {
    const leads: LeadSummary[] = [];

    try {
      // Query each collection for high-value leads
      const collections = [
        { name: COLLECTIONS.CONTACTS, type: 'contact' as const },
        { name: COLLECTIONS.NEWSLETTERS, type: 'newsletter' as const },
        { name: COLLECTIONS.RESOURCES, type: 'resource_download' as const },
        { name: COLLECTIONS.INQUIRIES, type: 'general_inquiry' as const },
        { name: COLLECTIONS.CONSULTATIONS, type: 'consultation' as const },
      ];

      for (const { name, type } of collections) {
        const q = query(
          collection(db, name),
          where('lead_score', '>=', 7),
          orderBy('lead_score', 'desc'),
          orderBy('submitted_at', 'desc'),
          limit(limitCount)
        );

        const snapshot = await getDocs(q);
        snapshot.forEach(doc => {
          const data = doc.data();
          leads.push({
            id: doc.id,
            email: data['email'] || '',
            name: data['name'] || data['full_name'] || '',
            company: data['company'] || data['company_name'] || '',
            lead_score: data['lead_score'] || 0,
            source: data['source'] || 'unknown',
            submitted_at: data['submitted_at'],
            status: data['status'] || 'unknown',
            type,
          });
        });
      }

      // Sort by lead score and submission date
      return leads
        .sort((a, b) => {
          if (a.lead_score !== b.lead_score) {
            return b.lead_score - a.lead_score;
          }
          return b.submitted_at.toMillis() - a.submitted_at.toMillis();
        })
        .slice(0, limitCount);
    } catch (error) {
      console.error('Error fetching high-value leads:', error);
      return [];
    }
  }

  /**
   * Get daily submission metrics for a date range
   */
  async getDailySubmissions(startDate: Date, endDate: Date): Promise<DailyMetrics[]> {
    const metrics: DailyMetrics[] = [];

    try {
      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);

      // Get data from each collection
      const collections = [
        COLLECTIONS.CONTACTS,
        COLLECTIONS.NEWSLETTERS,
        COLLECTIONS.RESOURCES,
        COLLECTIONS.INQUIRIES,
        COLLECTIONS.CONSULTATIONS,
      ];

      const dailyData: Record<
        string,
        {
          date: string;
          total_submissions: number;
          newsletter_signups: number;
          contact_forms: number;
          resource_downloads: number;
          consultation_requests: number;
          lead_scores: number[];
          high_value_leads: number;
        }
      > = {};

      for (const collectionName of collections) {
        const q = query(
          collection(db, collectionName),
          where('submitted_at', '>=', startTimestamp),
          where('submitted_at', '<=', endTimestamp),
          orderBy('submitted_at', 'asc')
        );

        const snapshot = await getDocs(q);
        snapshot.forEach(doc => {
          const data = doc.data();
          const dateKey = data['submitted_at'].toDate().toISOString().split('T')[0];

          if (!dailyData[dateKey]) {
            dailyData[dateKey] = {
              date: dateKey,
              total_submissions: 0,
              newsletter_signups: 0,
              contact_forms: 0,
              resource_downloads: 0,
              consultation_requests: 0,
              lead_scores: [],
              high_value_leads: 0,
            };
          }

          dailyData[dateKey].total_submissions++;
          dailyData[dateKey].lead_scores.push(data['lead_score'] || 0);

          if ((data['lead_score'] || 0) >= 7) {
            dailyData[dateKey].high_value_leads++;
          }

          // Categorize by collection
          switch (collectionName) {
            case COLLECTIONS.NEWSLETTERS:
              dailyData[dateKey].newsletter_signups++;
              break;
            case COLLECTIONS.CONTACTS:
              dailyData[dateKey].contact_forms++;
              break;
            case COLLECTIONS.RESOURCES:
              dailyData[dateKey].resource_downloads++;
              break;
            case COLLECTIONS.CONSULTATIONS:
              dailyData[dateKey].consultation_requests++;
              break;
          }
        });
      }

      // Calculate averages and format data
      Object.values(dailyData).forEach(day => {
        const avgScore =
          day.lead_scores.length > 0
            ? day.lead_scores.reduce((sum: number, score: number) => sum + score, 0) /
              day.lead_scores.length
            : 0;

        metrics.push({
          date: day.date,
          total_submissions: day.total_submissions,
          newsletter_signups: day.newsletter_signups,
          contact_forms: day.contact_forms,
          resource_downloads: day.resource_downloads,
          consultation_requests: day.consultation_requests,
          avg_lead_score: Math.round(avgScore * 100) / 100,
          high_value_leads: day.high_value_leads,
        });
      });

      return metrics.sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      console.error('Error fetching daily submissions:', error);
      return [];
    }
  }

  /**
   * Get conversion funnel analysis
   */
  async getConversionFunnel(startDate: Date, endDate: Date): Promise<ConversionFunnelData> {
    try {
      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);

      // Get page views from interactions
      const pageViewsQuery = query(
        collection(db, COLLECTIONS.INTERACTIONS),
        where('interaction_type', '==', 'page_view'),
        where('timestamp', '>=', startTimestamp),
        where('timestamp', '<=', endTimestamp)
      );
      const pageViewsSnapshot = await getDocs(pageViewsQuery);
      const page_views = pageViewsSnapshot.size;

      // Get newsletter signups
      const newsletterQuery = query(
        collection(db, COLLECTIONS.NEWSLETTERS),
        where('subscribed_at', '>=', startTimestamp),
        where('subscribed_at', '<=', endTimestamp)
      );
      const newsletterSnapshot = await getDocs(newsletterQuery);
      const newsletter_signups = newsletterSnapshot.size;

      // Get resource downloads
      const resourceQuery = query(
        collection(db, COLLECTIONS.RESOURCES),
        where('submitted_at', '>=', startTimestamp),
        where('submitted_at', '<=', endTimestamp)
      );
      const resourceSnapshot = await getDocs(resourceQuery);
      const resource_downloads = resourceSnapshot.size;

      // Get contact forms
      const contactQuery = query(
        collection(db, COLLECTIONS.CONTACTS),
        where('submitted_at', '>=', startTimestamp),
        where('submitted_at', '<=', endTimestamp)
      );
      const contactSnapshot = await getDocs(contactQuery);
      const contact_forms = contactSnapshot.size;

      // Get consultation requests
      const consultationQuery = query(
        collection(db, COLLECTIONS.CONSULTATIONS),
        where('submitted_at', '>=', startTimestamp),
        where('submitted_at', '<=', endTimestamp)
      );
      const consultationSnapshot = await getDocs(consultationQuery);
      const consultation_requests = consultationSnapshot.size;

      const total_conversions =
        newsletter_signups + resource_downloads + contact_forms + consultation_requests;
      const conversion_rate = page_views > 0 ? (total_conversions / page_views) * 100 : 0;

      return {
        page_views,
        newsletter_signups,
        resource_downloads,
        contact_forms,
        consultation_requests,
        conversion_rate: Math.round(conversion_rate * 100) / 100,
      };
    } catch (error) {
      console.error('Error fetching conversion funnel:', error);
      return {
        page_views: 0,
        newsletter_signups: 0,
        resource_downloads: 0,
        contact_forms: 0,
        consultation_requests: 0,
        conversion_rate: 0,
      };
    }
  }

  /**
   * Get service interest analysis
   */
  async getServiceInterest(): Promise<ServiceInterestData[]> {
    try {
      const serviceInterests: Record<string, ServiceInterestData> = {};

      // Get service interests from interactions
      const interactionsQuery = query(
        collection(db, COLLECTIONS.INTERACTIONS),
        where('metadata.category', '==', 'service_interest'),
        orderBy('timestamp', 'desc'),
        limit(1000)
      );
      const interactionsSnapshot = await getDocs(interactionsQuery);

      interactionsSnapshot.forEach(doc => {
        const data = doc.data();
        const serviceName = data['metadata']?.['service_name'] || 'Unknown';

        if (!serviceInterests[serviceName]) {
          serviceInterests[serviceName] = {
            service_name: serviceName,
            interest_count: 0,
            lead_count: 0,
            avg_lead_score: 0,
          };
        }

        serviceInterests[serviceName].interest_count++;
      });

      // Get lead data from contact forms mentioning services
      const contactQuery = query(
        collection(db, COLLECTIONS.CONTACTS),
        orderBy('submitted_at', 'desc'),
        limit(500)
      );
      const contactSnapshot = await getDocs(contactQuery);

      contactSnapshot.forEach(doc => {
        const data = doc.data();
        const projectType = data['project_type'] || data['service_interests']?.[0];

        if (projectType) {
          if (!serviceInterests[projectType]) {
            serviceInterests[projectType] = {
              service_name: projectType,
              interest_count: 0,
              lead_count: 0,
              avg_lead_score: 0,
            };
          }

          serviceInterests[projectType].lead_count++;
          serviceInterests[projectType].avg_lead_score += data['lead_score'] || 0;
        }
      });

      // Calculate averages
      Object.values(serviceInterests).forEach(service => {
        if (service.lead_count > 0) {
          service.avg_lead_score =
            Math.round((service.avg_lead_score / service.lead_count) * 100) / 100;
        }
      });

      return Object.values(serviceInterests).sort(
        (a, b) => b.interest_count + b.lead_count - (a.interest_count + a.lead_count)
      );
    } catch (error) {
      console.error('Error fetching service interest:', error);
      return [];
    }
  }

  /**
   * Get user behavior insights
   */
  async getUserBehaviorInsights(startDate: Date, endDate: Date): Promise<UserBehaviorInsights> {
    try {
      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);

      const interactionsQuery = query(
        collection(db, COLLECTIONS.INTERACTIONS),
        where('timestamp', '>=', startTimestamp),
        where('timestamp', '<=', endTimestamp),
        orderBy('timestamp', 'desc'),
        limit(5000)
      );
      const snapshot = await getDocs(interactionsQuery);

      const elementClicks: Record<
        string,
        { element_id: string; element_text: string; count: number }
      > = {};
      const pageViews: Record<string, { count: number; total_engagement: number }> = {};
      const conversionPaths: Record<string, number> = {};

      snapshot.forEach(doc => {
        const data = doc.data();

        // Track element clicks
        if (data['interaction_type'] === 'button_click' && data['element_id']) {
          const key = data['element_id'];
          if (!elementClicks[key]) {
            elementClicks[key] = {
              element_id: data['element_id'],
              element_text: data['element_text'] || 'Unknown',
              count: 0,
            };
          }
          elementClicks[key].count++;
        }

        // Track page views
        if (data['interaction_type'] === 'page_view') {
          const pageUrl = data['page_url'];
          if (!pageViews[pageUrl]) {
            pageViews[pageUrl] = { count: 0, total_engagement: 0 };
          }
          pageViews[pageUrl].count++;
          pageViews[pageUrl].total_engagement += data['metadata']?.['engagement_duration'] || 0;
        }

        // Track conversion paths (simplified)
        if (data['metadata']?.['category'] === 'conversion') {
          const path = `${data['page_url']} -> ${data['element_id']}`;
          conversionPaths[path] = (conversionPaths[path] || 0) + 1;
        }
      });

      return {
        total_interactions: snapshot.size,
        most_clicked_elements: Object.values(elementClicks)
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
          .map(item => ({
            element_id: item.element_id,
            element_text: item.element_text,
            click_count: item.count,
          })),
        popular_pages: Object.entries(pageViews)
          .sort(([, a], [, b]) => b.count - a.count)
          .slice(0, 10)
          .map(([url, data]) => ({
            page_url: url,
            view_count: data.count,
            avg_engagement_time:
              data.count > 0 ? Math.round(data.total_engagement / data.count) : 0,
          })),
        conversion_paths: Object.entries(conversionPaths)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .map(([path, count]) => ({
            path,
            conversion_count: count,
          })),
      };
    } catch (error) {
      console.error('Error fetching user behavior insights:', error);
      return {
        total_interactions: 0,
        most_clicked_elements: [],
        popular_pages: [],
        conversion_paths: [],
      };
    }
  }

  /**
   * Get lead quality distribution
   */
  async getLeadQuality(): Promise<Record<string, number>> {
    try {
      const leadScores: number[] = [];
      const collections = [
        COLLECTIONS.CONTACTS,
        COLLECTIONS.NEWSLETTERS,
        COLLECTIONS.RESOURCES,
        COLLECTIONS.INQUIRIES,
        COLLECTIONS.CONSULTATIONS,
      ];

      for (const collectionName of collections) {
        const q = query(
          collection(db, collectionName),
          orderBy('submitted_at', 'desc'),
          limit(1000)
        );

        const snapshot = await getDocs(q);
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data['lead_score']) {
            leadScores.push(data['lead_score']);
          }
        });
      }

      // Categorize scores
      const distribution = {
        'Low (1-3)': 0,
        'Medium (4-6)': 0,
        'High (7-8)': 0,
        'Premium (9-10)': 0,
      };

      leadScores.forEach(score => {
        if (score <= 3) distribution['Low (1-3)']++;
        else if (score <= 6) distribution['Medium (4-6)']++;
        else if (score <= 8) distribution['High (7-8)']++;
        else distribution['Premium (9-10)']++;
      });

      return distribution;
    } catch (error) {
      console.error('Error fetching lead quality distribution:', error);
      return {
        'Low (1-3)': 0,
        'Medium (4-6)': 0,
        'High (7-8)': 0,
        'Premium (9-10)': 0,
      };
    }
  }

  /**
   * Get recent activity summary
   */
  async getRecentActivity(limitCount: number = 20): Promise<LeadSummary[]> {
    const recentActivity: LeadSummary[] = [];

    try {
      const collections = [
        { name: COLLECTIONS.CONTACTS, type: 'contact' as const },
        { name: COLLECTIONS.NEWSLETTERS, type: 'newsletter' as const },
        { name: COLLECTIONS.RESOURCES, type: 'resource_download' as const },
        { name: COLLECTIONS.INQUIRIES, type: 'general_inquiry' as const },
        { name: COLLECTIONS.CONSULTATIONS, type: 'consultation' as const },
      ];

      for (const { name, type } of collections) {
        const q = query(collection(db, name), orderBy('submitted_at', 'desc'), limit(limitCount));

        const snapshot = await getDocs(q);
        snapshot.forEach(doc => {
          const data = doc.data();
          recentActivity.push({
            id: doc.id,
            email: data['email'] || '',
            name: data['name'] || data['full_name'] || '',
            company: data['company'] || data['company_name'] || '',
            lead_score: data['lead_score'] || 0,
            source: data['source'] || 'unknown',
            submitted_at: data['submitted_at'],
            status: data['status'] || 'unknown',
            type,
          });
        });
      }

      return recentActivity
        .sort((a, b) => b.submitted_at.toMillis() - a.submitted_at.toMillis())
        .slice(0, limitCount);
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }
  }
}

// Export singleton instance
export const firebaseAdminQueriesService = new FirebaseAdminQueriesService();
