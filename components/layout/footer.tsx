'use client';

import { BRAND, FOOTER_LINKS } from '@/config/constants';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpRight, Linkedin, Mail, MapPin, Twitter } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  className?: string;
}

// Enhanced content structure reflecting current FIELDPORTER offerings
const serviceCategories = [
  {
    name: 'Services',
    links: [
      { label: 'Strategic Research Intelligence', href: '/services' },
      { label: 'Rapid Development & Integration', href: '/services' },
      { label: 'Process Efficiency & Workflow Optimization', href: '/services' },
      { label: 'AI Training & Implementation Education', href: '/services' },
    ],
  },
];

const companyPages = [
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

const resourcesLinks = [
  { label: 'AI Strategy Insights', href: '/insights/why-ai-consulting-fails' },
  { label: 'Automation ROI', href: '/insights/real-cost-not-automating' },
  { label: 'VC Portfolio Optimization', href: '/insights/vc-portfolio-optimization' },
];

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/fieldporter',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/fieldporter',
    icon: Twitter,
  },
];

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-fieldporter-black border-t border-white/10', className)}>
      {/* Main Footer Content */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12'>
          {/* Company Information - Enhanced */}
          <div className='md:col-span-2 lg:col-span-5'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className='space-y-6'
            >
              <Link
                href='/'
                className='inline-block text-3xl lg:text-4xl font-bold text-white mb-4 hover:text-fieldporter-blue transition-colors duration-300'
              >
                {BRAND.name}
              </Link>

              <div className='space-y-4'>
                <p className='text-white/80 text-lg leading-relaxed max-w-md'>
                  Strategic Research & Business Development
                </p>
                <p className='text-white/60 text-base leading-relaxed max-w-lg'>
                  AI-powered strategic research and rapid prototyping for ambitious founders, VCs,
                  and growth-stage companies making critical business decisions.
                </p>
              </div>

              {/* Contact Information */}
              <div className='space-y-4'>
                <div className='flex items-center space-x-3 text-white/70 hover:text-white transition-colors duration-200'>
                  <Mail className='w-5 h-5 text-fieldporter-blue flex-shrink-0' />
                  <a
                    href={`mailto:${BRAND.email}`}
                    className='hover:text-fieldporter-blue transition-colors duration-200'
                  >
                    {BRAND.email}
                  </a>
                </div>
                <div className='flex items-center space-x-3 text-white/70'>
                  <MapPin className='w-5 h-5 text-fieldporter-blue flex-shrink-0' />
                  <span>New Zealand • Remote Worldwide</span>
                </div>
              </div>

              {/* Social Links */}
              <div className='flex space-x-4 pt-2'>
                {socialLinks.map(social => (
                  <a
                    key={social.name}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-fieldporter-blue/20 hover:border-fieldporter-blue/30 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center'
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className='w-5 h-5' />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services Links */}
          <div className='lg:col-span-2'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className='space-y-6'
            >
              <h3 className='text-white font-semibold text-xl mb-6'>Services</h3>
              <ul className='space-y-4'>
                {FOOTER_LINKS.services.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-white/70 hover:text-white transition-colors duration-200 flex items-center group text-base min-h-[44px] py-1'
                    >
                      {link.label}
                      <ArrowUpRight className='w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1 group-hover:-translate-y-1' />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company Links */}
          <div className='lg:col-span-2'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className='space-y-6'
            >
              <h3 className='text-white font-semibold text-xl mb-6'>Company</h3>
              <ul className='space-y-4'>
                {companyPages.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-white/70 hover:text-white transition-colors duration-200 flex items-center group text-base min-h-[44px] py-1'
                    >
                      {link.label}
                      <ArrowUpRight className='w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1 group-hover:-translate-y-1' />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Resources Links */}
          <div className='lg:col-span-3'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className='space-y-6'
            >
              <h3 className='text-white font-semibold text-xl mb-6'>Insights</h3>
              <div className='space-y-4'>
                {resourcesLinks.map(resource => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className='block p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-fieldporter-blue/30 transition-all duration-300 group'
                  >
                    <div className='flex items-start justify-between'>
                      <h4 className='text-white font-medium text-base group-hover:text-fieldporter-blue transition-colors duration-200'>
                        {resource.label}
                      </h4>
                      <ArrowUpRight className='w-4 h-4 text-white/40 group-hover:text-fieldporter-blue opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0 ml-2' />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Enhanced */}
      <div className='border-t border-white/10 bg-white/5 backdrop-blur-sm'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0'>
            <div className='text-white/60 text-base font-medium'>
              © {currentYear} {BRAND.name}. All rights reserved.
            </div>
            <div className='flex flex-wrap items-center gap-8 text-base'>
              {FOOTER_LINKS.legal.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='text-white/60 hover:text-white transition-colors duration-200 min-h-[44px] flex items-center'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
