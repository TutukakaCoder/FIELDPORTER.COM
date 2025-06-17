'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Clock, ExternalLink, Linkedin, Mail, MapPin } from 'lucide-react';

export function ContactMethods() {
  return (
    <section className='py-16 lg:py-24 bg-bg-fieldporter-primary'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-fieldporter-white mb-4'>
            Alternative Contact Methods
          </h2>
          <p className='text-lg text-fieldporter-gray max-w-2xl mx-auto leading-relaxed'>
            Prefer different communication channels? Here are additional ways to connect directly.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16'>
          {/* Email Contact */}
          <Card className='bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group'>
            <CardContent className='p-8 text-center'>
              <div className='w-16 h-16 bg-fieldporter-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform'>
                <Mail className='h-8 w-8 text-fieldporter-blue' />
              </div>
              <h3 className='text-fieldporter-white font-semibold text-lg mb-2'>Direct Email</h3>
              <p className='text-fieldporter-gray text-sm mb-4 leading-relaxed'>
                Personal email for all business inquiries and project discussions
              </p>
              <a
                href='mailto:freddy@fieldporter.com'
                className='text-fieldporter-blue hover:text-fieldporter-blue/80 font-medium transition-colors'
              >
                freddy@fieldporter.com
              </a>
              <div className='mt-4 pt-4 border-t border-white/10'>
                <div className='flex items-center justify-center text-xs text-fieldporter-gray'>
                  <Clock className='h-3 w-3 mr-1' />
                  Response within 24 hours
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LinkedIn */}
          <Card className='bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group'>
            <CardContent className='p-8 text-center'>
              <div className='w-16 h-16 bg-fieldporter-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform'>
                <Linkedin className='h-8 w-8 text-fieldporter-blue' />
              </div>
              <h3 className='text-fieldporter-white font-semibold text-lg mb-2'>LinkedIn</h3>
              <p className='text-fieldporter-gray text-sm mb-4 leading-relaxed'>
                Connect for professional networking and industry insights
              </p>
              <a
                href='https://www.linkedin.com/in/freddyjhopkins/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-fieldporter-blue hover:text-fieldporter-blue/80 font-medium transition-colors inline-flex items-center'
              >
                Professional Profile
                <ExternalLink className='h-3 w-3 ml-1' />
              </a>
              <div className='mt-4 pt-4 border-t border-white/10'>
                <div className='text-xs text-fieldporter-gray'>Professional updates & insights</div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className='bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group sm:col-span-2 lg:col-span-1'>
            <CardContent className='p-8 text-center'>
              <div className='w-16 h-16 bg-fieldporter-gray/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform'>
                <MapPin className='h-8 w-8 text-fieldporter-gray' />
              </div>
              <h3 className='text-fieldporter-white font-semibold text-lg mb-2'>Location</h3>
              <p className='text-fieldporter-gray text-sm mb-4 leading-relaxed'>
                Based in Auckland, New Zealand with global client reach
              </p>
              <div className='text-fieldporter-blue font-medium'>
                <div>Auckland, New Zealand</div>
                <div className='text-sm text-fieldporter-gray mt-1'>NZDT Timezone</div>
              </div>
              <div className='mt-4 pt-4 border-t border-white/10'>
                <div className='text-xs text-fieldporter-gray'>Video calls worldwide</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication Preferences */}
        <Card className='bg-white/5 border-white/10 backdrop-blur-md mb-12'>
          <CardContent className='p-8'>
            <h3 className='text-2xl font-bold text-fieldporter-white text-center mb-8'>
              Communication Preferences
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Mail className='h-6 w-6 text-green-500' />
                </div>
                <h4 className='text-fieldporter-white font-semibold mb-2'>Email First</h4>
                <p className='text-fieldporter-gray text-sm leading-relaxed'>
                  We prefer email for initial contact to understand your challenge thoughtfully
                </p>
              </div>
              <div className='text-center'>
                <div className='w-12 h-12 bg-fieldporter-blue/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Clock className='h-6 w-6 text-fieldporter-blue' />
                </div>
                <h4 className='text-fieldporter-white font-semibold mb-2'>Video Calls</h4>
                <p className='text-fieldporter-gray text-sm leading-relaxed'>
                  30-minute video calls for qualified opportunities to discuss fit and approach
                </p>
              </div>
              <div className='text-center'>
                <div className='w-12 h-12 bg-fieldporter-blue/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Linkedin className='h-6 w-6 text-fieldporter-blue' />
                </div>
                <h4 className='text-fieldporter-white font-semibold mb-2'>Professional Network</h4>
                <p className='text-fieldporter-gray text-sm leading-relaxed'>
                  LinkedIn for ongoing professional relationship and industry insights
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Working Hours & Availability */}
        <div className='text-center'>
          <div className='max-w-4xl mx-auto'>
            <div className='flex items-center justify-center mb-4'>
              <div className='w-8 h-8 bg-fieldporter-blue/20 rounded-full flex items-center justify-center mr-3'>
                <Clock className='h-4 w-4 text-fieldporter-blue' />
              </div>
              <h4 className='text-fieldporter-white font-semibold'>Working Hours & Availability</h4>
            </div>
            <p className='text-fieldporter-gray text-sm leading-relaxed mb-6 max-w-2xl mx-auto'>
              Based in Auckland, New Zealand (NZDT) but work with clients globally. Flexible video
              call scheduling across time zones.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto'>
              <div className='bg-white/5 border-white/10 rounded-lg p-4'>
                <p className='text-fieldporter-white font-medium mb-2'>Email Response</p>
                <p className='text-fieldporter-gray text-sm'>
                  Usually within 24 hours, often faster during NZ business hours
                </p>
              </div>
              <div className='bg-white/5 border-white/10 rounded-lg p-4'>
                <p className='text-fieldporter-white font-medium mb-2'>Video Calls</p>
                <p className='text-fieldporter-gray text-sm'>
                  Flexible scheduling across time zones, typically 30-60 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
