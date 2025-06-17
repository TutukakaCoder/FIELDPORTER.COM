'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Building2, Code, Users } from 'lucide-react';
import Link from 'next/link';

export function FounderExpertise() {
  const journey = [
    {
      icon: <Users className='w-5 h-5 text-fieldporter-blue' />,
      title: 'Tennis & Fencing Foundation',
      description:
        'Competitive tennis player and professional fencer simultaneously, learning discipline and strategic thinking.',
    },
    {
      icon: <Building2 className='w-5 h-5 text-fieldporter-blue' />,
      title: 'Business Development',
      years: '22 Years',
      description:
        'Started FIELDPORTER in 2002 as a business development consultancy. Built lasting client relationships through strategic research and growth initiatives.',
      achievements: [
        'Founded and scaled FIELDPORTER over two decades',
        'Developed strategic research methodologies',
        'Built network of enterprise partnerships',
        'Consistent revenue growth year-over-year',
      ],
    },
    {
      icon: <Award className='w-5 h-5 text-green-500' />,
      title: 'University & Culture Link',
      description:
        'Business degree at University of Auckland while founding Culture Link EdTech platform.',
    },
    {
      icon: <Code className='w-5 h-5 text-fieldporter-blue' />,
      title: 'Technical Development',
      description:
        'Joined Greenstone to learn software development and AI implementation. Built self-development platform (revenue-generating) and now developing Family Care.',
    },
  ];

  const currentProjects = [
    {
      name: 'Self-Development Platform',
      status: '8+ Months Revenue',
      description:
        'Built with React and Firebase, handles complex timezone calculations for global users. Taught us real-time data sync, user engagement patterns, and subscription billing.',
      tech: 'React, Firebase, Stripe, Material-UI',
    },
    {
      name: 'Family Care Platform',
      status: 'AI Integration Testing',
      description:
        'AI-powered coordination system using Claude API for natural language processing of family schedules. Testing different AI models to see which handles complex family logistics best.',
      tech: 'Claude API, Next.js, Firebase, AI Integration',
    },
    {
      name: 'News Analysis System',
      status: 'Cost-Optimized Production',
      description:
        'Built for investment platform using G-News API + DeepSeek for cost-effective summarization. Processes thousands of financial articles without breaking the budget.',
      tech: 'DeepSeek API, G-News API, Firebase, n8n',
    },
  ];

  return (
    <section className='section-spacing relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-black to-fieldporter-black' />

      <div className='relative z-10 content-container'>
        {/* Section Header with consistent typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center header-spacing'
        >
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-fieldporter-white'>
            What We&apos;re Currently Building
          </h2>
          <p className='text-fieldporter-gray text-lg leading-relaxed mb-8'>
            Real projects with real users. Every recommendation comes from something we&apos;ve
            built and tested ourselves.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start'>
          {/* Personal Journey */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='component-spacing'
          >
            <div className='glass-premium rounded-xl card-spacing'>
              <h3 className='text-xl md:text-2xl font-semibold text-fieldporter-white mb-6'>
                The Journey
              </h3>

              <div className='text-spacing text-fieldporter-gray leading-relaxed'>
                <p>
                  As a competitive tennis player and professional fencer simultaneously, then
                  Mercedes-Benz sales and service—learning how businesses actually work from the
                  ground up.
                </p>

                <p>
                  During our business degree, we started Culture Link (EdTech platform). When we
                  needed technical skills to build our vision, we joined Greenstone for software
                  development.
                </p>

                <p>
                  <strong className='text-fieldporter-white'>
                    The startup didn&apos;t succeed, but we gained crucial AI implementation
                    experience that shaped our approach.
                  </strong>{' '}
                  Now we focus on building what we recommend.
                </p>
              </div>
            </div>

            {/* Journey Steps */}
            <div className='component-spacing-sm'>
              {journey.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='glass-premium rounded-lg card-spacing-sm hover:glass-hover group'
                >
                  <div className='flex items-start space-x-4'>
                    <div className='w-8 h-8 rounded-lg bg-white/10 p-1.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300'>
                      {step.icon}
                    </div>
                    <div className='flex-1'>
                      <h4 className='text-lg font-semibold text-fieldporter-white mb-1'>
                        {step.title}
                      </h4>
                      <p className='text-sm text-fieldporter-gray leading-relaxed'>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Current Projects */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className='component-spacing'
          >
            <div className='glass-premium rounded-xl card-spacing'>
              <h3 className='text-xl md:text-2xl font-semibold text-fieldporter-white mb-6'>
                Current Projects
              </h3>
              <p className='text-fieldporter-gray mb-6 leading-relaxed'>
                Self-development platform generates weekly revenue. Family Care provides firsthand
                AI implementation experience.
              </p>

              <div className='component-spacing-sm'>
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className='card-spacing rounded-lg glass-premium hover:glass-hover transition-all duration-300'
                  >
                    <div className='flex items-start justify-between mb-3'>
                      <h4 className='text-lg font-semibold text-fieldporter-white'>
                        {project.name}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Revenue Generating'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-fieldporter-blue/20 text-fieldporter-blue'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className='text-sm text-fieldporter-gray mb-3 leading-relaxed'>
                      {project.description}
                    </p>
                    <div className='text-xs text-fieldporter-gray/80'>
                      <strong>Tech:</strong> {project.tech}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Current Focus */}
            <div className='glass-premium rounded-xl card-spacing'>
              <h3 className='text-xl md:text-2xl font-semibold text-fieldporter-white mb-4'>
                Current Focus
              </h3>
              <ul className='text-spacing-sm text-fieldporter-gray'>
                <li className='flex items-center space-x-3'>
                  <div className='w-2 h-2 rounded-full bg-fieldporter-blue flex-shrink-0' />
                  <span>Building AI-powered solutions (Family Care platform)</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <div className='w-2 h-2 rounded-full bg-fieldporter-blue flex-shrink-0' />
                  <span>Maintaining revenue-generating projects (self-development platform)</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <div className='w-2 h-2 rounded-full bg-green-500 flex-shrink-0' />
                  <span>Helping businesses implement practical AI solutions</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <div className='w-2 h-2 rounded-full bg-fieldporter-blue flex-shrink-0' />
                  <span>Strategic research and rapid prototyping</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA Section with premium design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className='premium-spacing text-center'
        >
          <div className='glass-premium rounded-xl card-spacing-lg content-container-sm mx-auto'>
            <h3 className='text-2xl md:text-3xl font-semibold text-fieldporter-white mb-4'>
              Let&apos;s Discuss Your Project
            </h3>
            <p className='text-lg text-fieldporter-gray leading-relaxed mb-8 max-w-2xl mx-auto'>
              Strategic guidance backed by hands-on experience building and scaling AI solutions.
            </p>

            <div className='button-group-spacing justify-center'>
              <Button
                variant='fieldporter-blue'
                size='enterprise'
                className='group min-h-[48px]'
                asChild
              >
                <Link href='/contact'>
                  <span>Schedule a Consultation</span>
                  <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </Link>
              </Button>

              <Button
                variant='fieldporter-glass'
                size='enterprise'
                className='group backdrop-blur-md min-h-[48px]'
                asChild
              >
                <Link href='/services'>
                  <span>Explore Services</span>
                  <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <div className='glass-premium rounded-xl card-spacing'>
          <h3 className='text-2xl lg:text-3xl font-semibold text-fieldporter-white mb-6 leading-tight'>
            Tools We Use Daily
          </h3>

          <div className='text-spacing text-fieldporter-gray leading-relaxed'>
            <p>
              <strong className='text-fieldporter-white'>Claude API:</strong> For analysis, content
              generation, and automating research workflows in our projects.
            </p>

            <p>
              <strong className='text-fieldporter-white'>n8n:</strong> For business process
              automation - connects different services and handles repetitive tasks.
            </p>

            <p>
              <strong className='text-fieldporter-white'>Cursor:</strong> AI-powered development
              that writes 70% of repetitive code, making prototyping much faster.
            </p>

            <p>
              <strong className='text-fieldporter-white'>Firebase & DeepSeek:</strong> Real-time
              applications and cost-effective AI processing for production systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
