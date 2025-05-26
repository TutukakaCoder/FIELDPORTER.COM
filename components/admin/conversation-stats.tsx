'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ConversationStats, firestoreService } from '@/lib/firestore-service';
import { Loader2, Mail, MessageSquare, RefreshCw, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ConversationStatsComponent() {
  const [stats, setStats] = useState<ConversationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cleanupCount, setCleanupCount] = useState<number | null>(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await firestoreService.getConversationStats(7);
      setStats(data);
    } catch (err) {
      setError('Failed to load conversation statistics');
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const runCleanup = async () => {
    try {
      setLoading(true);
      const deleted = await firestoreService.cleanupOldConversations();
      setCleanupCount(deleted);
      await loadStats(); // Refresh stats after cleanup
    } catch (err) {
      setError('Failed to run cleanup');
      console.error('Error running cleanup:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading && !stats) {
    return (
      <div className='flex items-center justify-center p-8'>
        <Loader2 className='h-8 w-8 animate-spin' />
        <span className='ml-2'>Loading conversation statistics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-8 text-center'>
        <p className='text-red-500 mb-4'>{error}</p>
        <Button onClick={loadStats} variant='outline'>
          <RefreshCw className='h-4 w-4 mr-2' />
          Retry
        </Button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className='p-8 text-center'>
        <p className='text-gray-500'>No statistics available</p>
      </div>
    );
  }

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>Conversation Analytics</h2>
          <p className='text-gray-600'>Last 7 days performance metrics</p>
        </div>
        <div className='flex gap-2'>
          <Button onClick={loadStats} variant='outline' disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={runCleanup} variant='outline' disabled={loading}>
            Clean Up Old Data
          </Button>
        </div>
      </div>

      {cleanupCount !== null && (
        <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
          <p className='text-green-800'>Successfully cleaned up {cleanupCount} old conversations</p>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Conversations</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.total_conversations}</div>
            <p className='text-xs text-muted-foreground'>Active chat sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Avg Messages</CardTitle>
            <MessageSquare className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.avg_message_count.toFixed(1)}</div>
            <p className='text-xs text-muted-foreground'>Per conversation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Email Captures</CardTitle>
            <Mail className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.email_captures}</div>
            <p className='text-xs text-muted-foreground'>
              {stats.total_conversations > 0
                ? `${((stats.email_captures / stats.total_conversations) * 100).toFixed(1)}% conversion`
                : 'No data'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Consultation Requests</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.consultation_requests}</div>
            <p className='text-xs text-muted-foreground'>
              {stats.total_conversations > 0
                ? `${((stats.consultation_requests / stats.total_conversations) * 100).toFixed(1)}% conversion`
                : 'No data'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Scores Distribution</CardTitle>
          <CardDescription>Top lead scores from recent conversations (1-10 scale)</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.top_lead_scores.length > 0 ? (
            <div className='flex flex-wrap gap-2'>
              {stats.top_lead_scores.map((score, index) => (
                <Badge
                  key={index}
                  variant={score >= 8 ? 'default' : score >= 5 ? 'secondary' : 'outline'}
                  className='text-sm'
                >
                  {score}/10
                </Badge>
              ))}
            </div>
          ) : (
            <p className='text-gray-500'>No lead scores available</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Intelligence Insights</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='p-4 bg-blue-50 rounded-lg'>
              <h4 className='font-semibold text-blue-900'>Engagement Quality</h4>
              <p className='text-sm text-blue-700'>
                {stats.avg_message_count >= 5
                  ? 'High engagement - users are actively participating'
                  : stats.avg_message_count >= 3
                    ? 'Moderate engagement - room for improvement'
                    : 'Low engagement - consider improving chat experience'}
              </p>
            </div>

            <div className='p-4 bg-green-50 rounded-lg'>
              <h4 className='font-semibold text-green-900'>Lead Generation</h4>
              <p className='text-sm text-green-700'>
                {stats.email_captures > 0
                  ? `Capturing ${((stats.email_captures / stats.total_conversations) * 100).toFixed(1)}% email addresses`
                  : 'No email captures yet - consider optimizing prompts'}
              </p>
            </div>

            <div className='p-4 bg-purple-50 rounded-lg'>
              <h4 className='font-semibold text-purple-900'>Conversion Rate</h4>
              <p className='text-sm text-purple-700'>
                {stats.consultation_requests > 0
                  ? `${((stats.consultation_requests / stats.total_conversations) * 100).toFixed(1)}% requesting consultations`
                  : 'No consultation requests yet'}
              </p>
            </div>

            <div className='p-4 bg-orange-50 rounded-lg'>
              <h4 className='font-semibold text-orange-900'>Lead Quality</h4>
              <p className='text-sm text-orange-700'>
                {stats.top_lead_scores.length > 0 && stats.top_lead_scores[0] >= 7
                  ? 'High-quality leads detected'
                  : stats.top_lead_scores.length > 0 && stats.top_lead_scores[0] >= 4
                    ? 'Moderate lead quality'
                    : 'Focus on improving lead qualification'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
