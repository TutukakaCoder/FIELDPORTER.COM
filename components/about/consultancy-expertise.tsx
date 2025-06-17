'use client';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Cog, Rocket, Shield } from 'lucide-react';
import Link from 'next/link';

export function ConsultancyExpertise() {
  const services = [
    {
      icon: <Brain className='w-full h-full text-fieldporter-white' />,
      title: 'AI Strategy & Implementation',
      description:
        'Data-driven business analysis merged with rapid prototype development. We build working solutions fast to validate strategic decisions and provide concrete implementation roadmaps.',
      capabilities: [
        'AI strategy development and validation',
        'Rapid prototyping and proof-of-concept development',
        'Technical architecture and implementation planning',
        'Business-validated implementation roadmaps',
      ],
      href: '/services/ai-strategy',
      gradient: 'from-fieldporter-blue/10 to-transparent',
    },
    {
      icon: <Rocket className='w-full h-full text-fieldporter-white' />,
      title: 'Business Development & Portfolio Growth',
      description:
        "FIELDPORTER's traditional strength in business development enhanced with modern rapid prototyping. We validate concepts quickly and provide hands-on development guidance based on actual operational experience.",
      capabilities: [
        'Rapid concept validation and prototyping',
        'Technical feasibility assessment',
        'Business model validation',
        'Development team handoff documentation',
      ],
      href: '/services/automation',
      gradient: 'from-green-500/10 to-transparent',
    },
    {
      icon: <Shield className='w-full h-full text-fieldporter-white' />,
      title: 'Legacy Business Transformation',
      description:
        'We help established businesses integrate modern AI capabilities while respecting their existing foundations. Our 22-year perspective ensures technology serves business objectives, not the reverse.',
      capabilities: [
        'AI integration strategy for established businesses',
        'Legacy system modernization planning',
        'Change management and team training',
        'Risk-managed technology adoption',
      ],
      href: '/services/vc-consulting',
      gradient: 'from-fieldporter-blue/10 to-transparent',
    },
  ];

  const differentiators = [
    {
      title: '22-Year Foundation',
      description:
        'Proven business excellence providing the foundation for modern AI innovation and strategic guidance.',
      icon: <Shield className='w-6 h-6 text-fieldporter-blue' />,
    },
    {
      title: 'Modern AI Capabilities',
      description:
        'Cutting-edge AI research and rapid prototyping built on decades of business wisdom.',
      icon: <Brain className='w-6 h-6 text-fieldporter-blue' />,
    },
    {
      title: 'Operational Experience',
      description:
        'Current hands-on experience building and scaling systems, not just theoretical advice.',
      icon: <Cog className='w-6 h-6 text-green-500' />,
    },
  ];

  return (
    <section className='section-spacing-xl relative'>
      {/* Enhanced Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-bg-fieldporter-secondary to-bg-fieldporter-primary' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(9,105,218,0.1),transparent_50%)]' />

      <div className='relative z-10 content-container'>
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center text-spacing-lg header-spacing-lg'
        >
          <h2 className='text-display-sm md:text-display-md font-bold text-fieldporter-white'>
            FIELDPORTER&apos;s Evolution
            <span className='text-fieldporter-blue'> Services</span>
          </h2>
          <p className='text-body-xl text-fieldporter-gray max-w-4xl mx-auto leading-relaxed'>
            Traditional business excellence enhanced with modern AI innovation. We provide strategic
            guidance that combines 22 years of proven business wisdom with cutting-edge technology
            implementation.
          </p>
        </motion.div>

        {/* Enhanced Services Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mb-24'>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <GlassCard className='p-10 h-full hover:shadow-glass-lg transition-all duration-500 group relative overflow-hidden'>
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div className='space-y-8 relative z-10'>
                  {/* Enhanced Icon */}
                  <motion.div
                    className='w-20 h-20 rounded-2xl bg-fieldporter-blue/20 border border-fieldporter-blue/30 p-5 shadow-glass group-hover:scale-110 transition-transform duration-300'
                    whileHover={{ rotate: 5 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Enhanced Content */}
                  <div className='space-y-6'>
                    <h3 className='text-heading-xl font-semibold text-fieldporter-white group-hover:text-fieldporter-blue transition-all duration-300'>
                      {service.title}
                    </h3>
                    <p className='text-body-lg text-fieldporter-gray leading-relaxed'>
                      {service.description}
                    </p>

                    {/* Enhanced Capabilities */}
                    <ul className='space-y-3'>
                      {service.capabilities.map((capability, capIndex) => (
                        <motion.li
                          key={capIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 + capIndex * 0.1 }}
                          viewport={{ once: true }}
                          className='flex items-center space-x-3 text-body-md text-fieldporter-gray group-hover:text-fieldporter-white transition-colors duration-300'
                        >
                          <div className='w-2 h-2 rounded-full bg-fieldporter-blue flex-shrink-0 group-hover:scale-125 transition-transform duration-300' />
                          <span>{capability}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Enhanced CTA */}
                  <Button
                    variant='fieldporter-ghost'
                    className='group/btn w-full justify-between text-lg py-4 hover:bg-white/10 transition-all duration-300'
                    asChild
                  >
                    <Link href={service.href}>
                      <span>Learn More</span>
                      <ArrowRight className='w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300' />
                    </Link>
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Enhanced What Makes Us Different */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='max-w-6xl mx-auto'
        >
          <GlassCard className='p-12 md:p-16 relative overflow-hidden'>
            {/* Background Pattern */}
            <div className='absolute inset-0 bg-fieldporter-blue/5' />
            <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-fieldporter-blue/10 to-transparent rounded-full blur-3xl' />
            <div className='absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-fieldporter-blue/10 to-transparent rounded-full blur-3xl' />

            <div className='relative z-10 text-center space-y-12'>
              <div className='space-y-6'>
                <motion.h3
                  className='text-display-xs font-semibold text-fieldporter-white'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  The FIELDPORTER Advantage
                </motion.h3>
                <motion.p
                  className='text-body-xl text-fieldporter-gray max-w-3xl mx-auto leading-relaxed'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Why choose FIELDPORTER? We uniquely combine decades of business excellence with
                  modern AI innovation.
                </motion.p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                {differentiators.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className='text-center space-y-6 p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group'
                  >
                    <div className='w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                      {item.icon}
                    </div>
                    <h4 className='text-heading-lg font-semibold text-fieldporter-white group-hover:text-fieldporter-blue transition-all duration-300'>
                      {item.title}
                    </h4>
                    <p className='text-body-md text-fieldporter-gray leading-relaxed group-hover:text-fieldporter-white transition-colors duration-300'>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced CTA */}
              <motion.div
                className='pt-12'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Button variant='primary' size='enterprise-lg' className='group' asChild>
                  <Link href='/contact'>
                    <span>Discuss Your Project</span>
                    <ArrowRight className='ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
