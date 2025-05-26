'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ANALYTICS_EVENTS } from '@/config/constants';
import { ArrowRight, Download, Mail, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export function SecondaryConversions() {
  const [assessmentForm, setAssessmentForm] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submissionStates, setSubmissionStates] = useState({
    assessment: false,
    newsletter: false,
    inquiry: false,
  });

  const handleAssessmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', ANALYTICS_EVENTS.downloadResource, {
        resource_type: 'ai_readiness_assessment',
        company: assessmentForm.company,
      });
    }

    // TODO: Implement actual download and email automation
    setSubmissionStates(prev => ({ ...prev, assessment: true }));

    // Reset form
    setAssessmentForm({ name: '', email: '', company: '' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', ANALYTICS_EVENTS.newsletterSignup, {
        email: newsletterEmail,
      });
    }

    // TODO: Implement actual newsletter signup
    setSubmissionStates(prev => ({ ...prev, newsletter: true }));

    // Reset form
    setNewsletterEmail('');
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', ANALYTICS_EVENTS.contactForm, {
        subject: inquiryForm.subject,
      });
    }

    // TODO: Implement actual inquiry submission
    setSubmissionStates(prev => ({ ...prev, inquiry: true }));

    // Reset form
    setInquiryForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className='py-24 bg-bg-fieldporter-tertiary'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-fieldporter-white mb-4'>
            Multiple Ways to Engage
          </h2>
          <p className='text-fieldporter-gray text-lg max-w-3xl mx-auto'>
            Not ready for a full consultation? Start with these valuable resources and stay
            connected with our latest AI strategy insights.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {/* AI Readiness Assessment Download */}
          <Card className='bg-white/5 border-white/10 backdrop-blur-sm'>
            <CardHeader className='text-center'>
              <div className='w-16 h-16 bg-fieldporter-blue/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Download className='h-8 w-8 text-fieldporter-blue' />
              </div>
              <CardTitle className='text-fieldporter-white'>AI Readiness Assessment</CardTitle>
              <CardDescription className='text-fieldporter-gray'>
                Download our comprehensive framework to evaluate your organization&apos;s AI
                readiness
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submissionStates.assessment ? (
                <div className='text-center py-8'>
                  <div className='w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <Download className='h-6 w-6 text-green-500' />
                  </div>
                  <p className='text-fieldporter-white font-semibold mb-2'>Download Started!</p>
                  <p className='text-fieldporter-gray text-sm'>
                    Check your email for the assessment framework and follow-up resources.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAssessmentSubmit} className='space-y-4'>
                  <div>
                    <Label htmlFor='assessment-name' className='text-fieldporter-white'>
                      Name *
                    </Label>
                    <Input
                      id='assessment-name'
                      value={assessmentForm.name}
                      onChange={e => setAssessmentForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder='Your name'
                      required
                      className='mt-1'
                    />
                  </div>
                  <div>
                    <Label htmlFor='assessment-email' className='text-fieldporter-white'>
                      Email *
                    </Label>
                    <Input
                      id='assessment-email'
                      type='email'
                      value={assessmentForm.email}
                      onChange={e =>
                        setAssessmentForm(prev => ({ ...prev, email: e.target.value }))
                      }
                      placeholder='your.email@company.com'
                      required
                      className='mt-1'
                    />
                  </div>
                  <div>
                    <Label htmlFor='assessment-company' className='text-fieldporter-white'>
                      Company *
                    </Label>
                    <Input
                      id='assessment-company'
                      value={assessmentForm.company}
                      onChange={e =>
                        setAssessmentForm(prev => ({ ...prev, company: e.target.value }))
                      }
                      placeholder='Company name'
                      required
                      className='mt-1'
                    />
                  </div>
                  <Button
                    type='submit'
                    className='w-full bg-fieldporter-blue hover:bg-fieldporter-blue/90 text-fieldporter-white'
                  >
                    Download Assessment
                    <Download className='ml-2 h-4 w-4' />
                  </Button>
                  <p className='text-xs text-fieldporter-gray text-center'>
                    Includes automated email sequence with additional AI strategy resources
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card className='bg-white/5 border-white/10 backdrop-blur-sm'>
            <CardHeader className='text-center'>
              <div className='w-16 h-16 bg-fieldporter-purple/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Mail className='h-8 w-8 text-fieldporter-purple' />
              </div>
              <CardTitle className='text-fieldporter-white'>AI Strategy Insights</CardTitle>
              <CardDescription className='text-fieldporter-gray'>
                Monthly insights on enterprise AI trends, case studies, and strategic frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submissionStates.newsletter ? (
                <div className='text-center py-8'>
                  <div className='w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <Mail className='h-6 w-6 text-green-500' />
                  </div>
                  <p className='text-fieldporter-white font-semibold mb-2'>
                    Successfully Subscribed!
                  </p>
                  <p className='text-fieldporter-gray text-sm'>
                    You&apos;ll receive our next AI strategy insights newsletter within the week.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className='space-y-4'>
                  <div>
                    <Label htmlFor='newsletter-email' className='text-fieldporter-white'>
                      Email Address *
                    </Label>
                    <Input
                      id='newsletter-email'
                      type='email'
                      value={newsletterEmail}
                      onChange={e => setNewsletterEmail(e.target.value)}
                      placeholder='your.email@company.com'
                      required
                      className='mt-1'
                    />
                  </div>
                  <Button
                    type='submit'
                    className='w-full bg-fieldporter-purple hover:bg-fieldporter-purple/90 text-fieldporter-white'
                  >
                    Subscribe to Insights
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                  <div className='space-y-2 text-xs text-fieldporter-gray'>
                    <p>✓ Monthly AI strategy insights</p>
                    <p>✓ Exclusive case studies</p>
                    <p>✓ Industry trend analysis</p>
                    <p>✓ Unsubscribe anytime</p>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* General Inquiry Form */}
          <Card className='bg-white/5 border-white/10 backdrop-blur-sm'>
            <CardHeader className='text-center'>
              <div className='w-16 h-16 bg-fieldporter-gray/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <MessageSquare className='h-8 w-8 text-fieldporter-gray' />
              </div>
              <CardTitle className='text-fieldporter-white'>General Inquiry</CardTitle>
              <CardDescription className='text-fieldporter-gray'>
                Partnership opportunities, speaking requests, media inquiries, or other questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submissionStates.inquiry ? (
                <div className='text-center py-8'>
                  <div className='w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <MessageSquare className='h-6 w-6 text-green-500' />
                  </div>
                  <p className='text-fieldporter-white font-semibold mb-2'>Message Sent!</p>
                  <p className='text-fieldporter-gray text-sm'>
                    We&apos;ll respond to your inquiry within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className='space-y-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='inquiry-name' className='text-fieldporter-white'>
                        Name *
                      </Label>
                      <Input
                        id='inquiry-name'
                        value={inquiryForm.name}
                        onChange={e => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder='Your name'
                        required
                        className='mt-1'
                      />
                    </div>
                    <div>
                      <Label htmlFor='inquiry-email' className='text-fieldporter-white'>
                        Email *
                      </Label>
                      <Input
                        id='inquiry-email'
                        type='email'
                        value={inquiryForm.email}
                        onChange={e => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder='your.email@company.com'
                        required
                        className='mt-1'
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor='inquiry-subject' className='text-fieldporter-white'>
                      Subject *
                    </Label>
                    <Input
                      id='inquiry-subject'
                      value={inquiryForm.subject}
                      onChange={e => setInquiryForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder='Partnership opportunity'
                      required
                      className='mt-1'
                    />
                  </div>
                  <div>
                    <Label htmlFor='inquiry-message' className='text-fieldporter-white'>
                      Message *
                    </Label>
                    <Textarea
                      id='inquiry-message'
                      value={inquiryForm.message}
                      onChange={e => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder='Tell us about your inquiry...'
                      required
                      rows={4}
                      className='mt-1'
                    />
                  </div>
                  <Button
                    type='submit'
                    className='w-full bg-fieldporter-gray hover:bg-fieldporter-gray/90 text-fieldporter-white'
                  >
                    Send Message
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
