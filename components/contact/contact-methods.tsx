'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Clock, ExternalLink, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export function ContactMethods() {
  return (
    <section className='py-24 bg-bg-fieldporter-primary'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-fieldporter-white mb-4'>
            Direct Contact Information
          </h2>
          <p className='text-fieldporter-gray text-lg max-w-3xl mx-auto'>
            Prefer direct communication? Reach out through any of these channels with guaranteed
            response times for enterprise inquiries.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto'>
          {/* Email Contact */}
          <Card className='bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
            <CardContent className='p-8 text-center'>
              <div className='w-16 h-16 bg-fieldporter-blue/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Mail className='h-8 w-8 text-fieldporter-blue' />
              </div>
              <h3 className='text-fieldporter-white font-semibold text-lg mb-2'>Email</h3>
              <p className='text-fieldporter-gray text-sm mb-4'>
                Direct email for consultation requests and business inquiries
              </p>
              <a
                href='mailto:consulting@fieldporter.com'
                className='text-fieldporter-blue hover:text-fieldporter-blue/80 font-medium transition-colors'
              >
                consulting@fieldporter.com
              </a>
              <div className='mt-4 pt-4 border-t border-white/10'>
                <div className='flex items-center justify-center text-xs text-fieldporter-gray'>
                  <Clock className='h-3 w-3 mr-1' />
                  24-hour response
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phone Contact */}
          <Card className='bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
            <CardContent className='p-8 text-center'>
              <div className='w-16 h-16 bg-fieldporter-purple/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Phone className='h-8 w-8 text-fieldporter-purple' />
              </div>
              <h3 className='text-fieldporter-white font-semibold text-lg mb-2'>Phone</h3>
              <p className='text-fieldporter-gray text-sm mb-4'>
                Direct line for urgent consultation requests
              </p>
              <a
                href='tel:+1-555-FIELDPORTER'
                className='text-fieldporter-blue hover:text-fieldporter-blue/80 font-medium transition-colors'
              >
                +1 (555) FIELDPORTER
              </a>
              <div className='mt-4 pt-4 border-t border-white/10'>
                <div className='text-xs text-fieldporter-gray'>Business Hours: 9 AM - 6 PM EST</div>
              </div>
            </CardContent>
          </Card>

          {/* LinkedIn */}
          <Card className='bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
            <CardContent className='p-8 text-center'>
              <div className='w-16 h-16 bg-fieldporter-blue/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Linkedin className='h-8 w-8 text-fieldporter-blue' />
              </div>
              <h3 className='text-fieldporter-white font-semibold text-lg mb-2'>LinkedIn</h3>
              <p className='text-fieldporter-gray text-sm mb-4'>
                Connect with our team for professional networking
              </p>
              <a
                href='https://linkedin.com/company/fieldporter'
                target='_blank'
                rel='noopener noreferrer'
                className='text-fieldporter-blue hover:text-fieldporter-blue/80 font-medium transition-colors inline-flex items-center'
              >
                Company Profile
                <ExternalLink className='h-3 w-3 ml-1' />
              </a>
              <div className='mt-4 pt-4 border-t border-white/10'>
                <div className='text-xs text-fieldporter-gray'>
                  Professional networking & updates
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Office Location */}
          <Card className='bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
            <CardContent className='p-8 text-center'>
              <div className='w-16 h-16 bg-fieldporter-gray/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                <MapPin className='h-8 w-8 text-fieldporter-gray' />
              </div>
              <h3 className='text-fieldporter-white font-semibold text-lg mb-2'>Office</h3>
              <p className='text-fieldporter-gray text-sm mb-4'>
                Headquarters for in-person meetings
              </p>
              <div className='text-fieldporter-blue font-medium'>
                <div>New York, NY</div>
                <div className='text-sm text-fieldporter-gray mt-1'>Financial District</div>
              </div>
              <div className='mt-4 pt-4 border-t border-white/10'>
                <div className='text-xs text-fieldporter-gray'>By appointment only</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Response Time Commitments */}
        <div className='mt-16 max-w-4xl mx-auto'>
          <Card className='bg-white/5 border-white/10 backdrop-blur-sm'>
            <CardContent className='p-8'>
              <h3 className='text-2xl font-bold text-fieldporter-white text-center mb-8'>
                Our Response Commitments
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div className='text-center'>
                  <div className='w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <Clock className='h-6 w-6 text-green-500' />
                  </div>
                  <h4 className='text-fieldporter-white font-semibold mb-2'>
                    Consultation Requests
                  </h4>
                  <p className='text-fieldporter-gray text-sm'>
                    24-hour response with consultation scheduling options
                  </p>
                </div>
                <div className='text-center'>
                  <div className='w-12 h-12 bg-fieldporter-blue/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <Mail className='h-6 w-6 text-fieldporter-blue' />
                  </div>
                  <h4 className='text-fieldporter-white font-semibold mb-2'>General Inquiries</h4>
                  <p className='text-fieldporter-gray text-sm'>
                    48-hour response for partnerships and general questions
                  </p>
                </div>
                <div className='text-center'>
                  <div className='w-12 h-12 bg-fieldporter-purple/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <Phone className='h-6 w-6 text-fieldporter-purple' />
                  </div>
                  <h4 className='text-fieldporter-white font-semibold mb-2'>Urgent Matters</h4>
                  <p className='text-fieldporter-gray text-sm'>
                    Same-day response for existing clients and urgent requests
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security & Privacy Notice */}
        <div className='mt-12 text-center'>
          <div className='max-w-3xl mx-auto'>
            <div className='flex items-center justify-center mb-4'>
              <div className='w-8 h-8 bg-fieldporter-blue/20 rounded-full flex items-center justify-center mr-3'>
                <Mail className='h-4 w-4 text-fieldporter-blue' />
              </div>
              <h4 className='text-fieldporter-white font-semibold'>
                Enterprise Security & Privacy
              </h4>
            </div>
            <p className='text-fieldporter-gray text-sm leading-relaxed'>
              All communications are handled with enterprise-grade security. We maintain SOC 2
              compliance and follow strict data protection protocols. Your information is never
              shared with third parties and is used solely for consultation scheduling and follow-up
              communications.
            </p>
            <div className='flex items-center justify-center mt-4 space-x-6 text-xs text-fieldporter-gray'>
              <span>✓ SOC 2 Compliant</span>
              <span>✓ GDPR Compliant</span>
              <span>✓ Enterprise Security</span>
              <span>✓ Confidential Communications</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
