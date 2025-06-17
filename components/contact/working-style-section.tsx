'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, FileText, MessageSquare, Target, User, Zap } from 'lucide-react';

export function WorkingStyleSection() {
  return (
    <section className='py-16 lg:py-24 bg-bg-fieldporter-secondary'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-fieldporter-white mb-4'>
            How We Work
          </h2>
          <p className='text-lg text-fieldporter-gray max-w-2xl mx-auto leading-relaxed'>
            Six principles that guide every client engagement.
          </p>
        </div>

        {/* Working Principles */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
          <Card className='bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group'>
            <CardHeader className='p-6'>
              <div className='flex items-center space-x-3'>
                <User className='h-8 w-8 text-fieldporter-blue group-hover:scale-110 transition-transform' />
                <CardTitle className='text-fieldporter-white'>Direct Access</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-6 pt-0'>
              <p className='text-fieldporter-gray leading-relaxed'>
                You work directly with us, not account managers or junior team members. Every email,
                call, and deliverable comes from us personally.
              </p>
            </CardContent>
          </Card>

          <Card className='bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group'>
            <CardHeader className='p-6'>
              <div className='flex items-center space-x-3'>
                <Zap className='h-8 w-8 text-fieldporter-blue group-hover:scale-110 transition-transform' />
                <CardTitle className='text-fieldporter-white'>Rapid Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-6 pt-0'>
              <p className='text-fieldporter-gray leading-relaxed'>
                AI-powered research delivers strategic insights 90% faster than traditional methods.
                Comprehensive analysis in days, not weeks.
              </p>
            </CardContent>
          </Card>

          <Card className='bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group'>
            <CardHeader className='p-6'>
              <div className='flex items-center space-x-3'>
                <Clock className='h-8 w-8 text-fieldporter-blue group-hover:scale-110 transition-transform' />
                <CardTitle className='text-fieldporter-white'>Prototype First</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-6 pt-0'>
              <p className='text-fieldporter-gray leading-relaxed'>
                Working demonstrations validate concepts before major investment. You&apos;ll see
                and interact with concepts, not just read about them.
              </p>
            </CardContent>
          </Card>

          <Card className='bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group'>
            <CardHeader className='p-6'>
              <div className='flex items-center space-x-3'>
                <MessageSquare className='h-8 w-8 text-fieldporter-blue group-hover:scale-110 transition-transform' />
                <CardTitle className='text-fieldporter-white'>Honest Assessment</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-6 pt-0'>
              <p className='text-fieldporter-gray leading-relaxed'>
                Clear assessment of fit and capability, recommend alternatives when appropriate.
                We&apos;ll tell you if we&apos;re not the right fit for your specific needs.
              </p>
            </CardContent>
          </Card>

          <Card className='bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group'>
            <CardHeader className='p-6'>
              <div className='flex items-center space-x-3'>
                <FileText className='h-8 w-8 text-fieldporter-blue group-hover:scale-110 transition-transform' />
                <CardTitle className='text-fieldporter-white'>Clean Handoff</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-6 pt-0'>
              <p className='text-fieldporter-gray leading-relaxed'>
                Complete documentation and architecture for seamless transition to your development
                team or for independent maintenance.
              </p>
            </CardContent>
          </Card>

          <Card className='bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group'>
            <CardHeader className='p-6'>
              <div className='flex items-center space-x-3'>
                <Target className='h-8 w-8 text-fieldporter-blue group-hover:scale-110 transition-transform' />
                <CardTitle className='text-fieldporter-white'>Focused Expertise</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-6 pt-0'>
              <p className='text-fieldporter-gray leading-relaxed'>
                Specialization in strategic research, rapid prototyping, and business advisory.
                Connect you with execution partners for large-scale implementation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Service Boundaries */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
          <Card className='bg-white/5 border-white/10 backdrop-blur-md'>
            <CardHeader className='p-6'>
              <CardTitle className='text-fieldporter-white text-xl'>What We Do Best</CardTitle>
            </CardHeader>
            <CardContent className='p-6 pt-0'>
              <div className='space-y-4'>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='h-5 w-5 text-green-400 mt-1 flex-shrink-0' />
                  <div>
                    <p className='text-fieldporter-white font-medium'>
                      Strategic Research Intelligence
                    </p>
                    <p className='text-fieldporter-gray text-sm'>
                      Complex market analysis delivered in days, not weeks using systematic
                      methodology
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='h-5 w-5 text-green-400 mt-1 flex-shrink-0' />
                  <div>
                    <p className='text-fieldporter-white font-medium'>
                      Rapid Development & Integration
                    </p>
                    <p className='text-fieldporter-gray text-sm'>
                      From concept to working system in 1-2 weeks with complete handoff
                      documentation
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='h-5 w-5 text-green-400 mt-1 flex-shrink-0' />
                  <div>
                    <p className='text-fieldporter-white font-medium'>
                      Process Efficiency & Workflow Optimization
                    </p>
                    <p className='text-fieldporter-gray text-sm'>
                      Transform manual workflows into automated systems with measurable time savings
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='h-5 w-5 text-green-400 mt-1 flex-shrink-0' />
                  <div>
                    <p className='text-fieldporter-white font-medium'>
                      AI Training & Implementation Education
                    </p>
                    <p className='text-fieldporter-gray text-sm'>
                      Become an AI power user in your specific industry with practical skill
                      development
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-white/5 border-white/10 backdrop-blur-md'>
            <CardHeader className='p-6'>
              <CardTitle className='text-fieldporter-white text-xl'>
                What We Don&apos;t Do
              </CardTitle>
            </CardHeader>
            <CardContent className='p-6 pt-0'>
              <div className='space-y-4'>
                <div className='flex items-start space-x-3'>
                  <div className='h-5 w-5 rounded-full border-2 border-fieldporter-gray mt-1 flex-shrink-0' />
                  <div>
                    <p className='text-fieldporter-white font-medium'>Enterprise Team Management</p>
                    <p className='text-fieldporter-gray text-sm'>
                      Individual consultant, not corporate team structure
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='h-5 w-5 rounded-full border-2 border-fieldporter-gray mt-1 flex-shrink-0' />
                  <div>
                    <p className='text-fieldporter-white font-medium'>Long-term Implementation</p>
                    <p className='text-fieldporter-gray text-sm'>
                      Focus on strategy and validation, connect with execution partners for ongoing
                      development
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='h-5 w-5 rounded-full border-2 border-fieldporter-gray mt-1 flex-shrink-0' />
                  <div>
                    <p className='text-fieldporter-white font-medium'>
                      Generic Business Consulting
                    </p>
                    <p className='text-fieldporter-gray text-sm'>
                      Specialization in AI-powered research and technical strategy
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='h-5 w-5 rounded-full border-2 border-fieldporter-gray mt-1 flex-shrink-0' />
                  <div>
                    <p className='text-fieldporter-white font-medium'>Dev House Services</p>
                    <p className='text-fieldporter-gray text-sm'>
                      Build prototypes and applications, but not interested in full-time development
                      work
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Transparency */}
        <Card className='bg-white/5 border-white/10 backdrop-blur-md'>
          <CardHeader className='p-6 md:p-8'>
            <CardTitle className='text-2xl text-fieldporter-white text-center'>
              Transparent Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className='p-6 md:p-8 pt-0'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-6'>
              <div className='space-y-3'>
                <div className='text-3xl font-bold text-fieldporter-blue'>$3K-$8K</div>
                <h3 className='text-fieldporter-white font-semibold'>Strategic Research</h3>
                <p className='text-fieldporter-gray text-sm leading-relaxed'>
                  3-5 day projects delivering comprehensive market intelligence depending on
                  research scope and complexity
                </p>
              </div>
              <div className='space-y-3'>
                <div className='text-3xl font-bold text-fieldporter-blue'>$2K-$8K</div>
                <h3 className='text-fieldporter-white font-semibold'>Rapid Development</h3>
                <p className='text-fieldporter-gray text-sm leading-relaxed'>
                  1-2 week concept validation with working applications depending on complexity and
                  integration requirements
                </p>
              </div>
              <div className='space-y-3'>
                <div className='text-3xl font-bold text-fieldporter-blue'>$2.5K-$6K</div>
                <h3 className='text-fieldporter-white font-semibold'>Workflow Optimization</h3>
                <p className='text-fieldporter-gray text-sm leading-relaxed'>
                  2-4 week automation projects depending on workflow complexity and scope
                </p>
              </div>
            </div>
            <div className='text-center'>
              <p className='text-fieldporter-gray text-sm leading-relaxed'>
                Investment depends on project scope and complexity. AI training ranges from $75-$150
                per hour for individual sessions, with flexible project-based pricing for team
                workshops.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
