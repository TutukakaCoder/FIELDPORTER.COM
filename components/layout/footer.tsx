'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BRAND, FOOTER_LINKS } from '@/config/constants';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpRight, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  className?: string;
}

const subsidiaryBusinesses = [
  {
    name: 'FIELDPORTER Analytics',
    description: 'Advanced AI-powered business intelligence platform',
    status: 'coming-soon',
    href: '/portfolio/analytics',
  },
  {
    name: 'FIELDPORTER Automation',
    description: 'Enterprise process automation solutions',
    status: 'coming-soon',
    href: '/portfolio/automation',
  },
  {
    name: 'FIELDPORTER Ventures',
    description: 'AI-focused venture capital and portfolio optimization',
    status: 'active',
    href: '/portfolio/ventures',
  },
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
    <footer className={cn('bg-black border-t border-white/10', className)}>
      {/* Main Footer Content */}
      <div className='container-fieldporter py-16 lg:py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>
          {/* Company Information */}
          <div className='lg:col-span-4'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                href='/'
                className='inline-block text-3xl font-bold text-white mb-4 hover:text-fieldporter-blue transition-colors duration-200'
              >
                {BRAND.name}
              </Link>
              <p className='text-fieldporter-gray text-lg mb-6 leading-relaxed'>
                {BRAND.description}. We transform Fortune 500 enterprises through strategic AI
                implementation and innovative automation solutions.
              </p>

              {/* Contact Information */}
              <div className='space-y-3 mb-6'>
                <div className='flex items-center space-x-3 text-fieldporter-gray'>
                  <Mail className='w-5 h-5 text-fieldporter-blue' />
                  <a
                    href={`mailto:${BRAND.email}`}
                    className='hover:text-white transition-colors duration-200'
                  >
                    {BRAND.email}
                  </a>
                </div>
                <div className='flex items-center space-x-3 text-fieldporter-gray'>
                  <Phone className='w-5 h-5 text-fieldporter-blue' />
                  <a
                    href={`tel:${BRAND.phone}`}
                    className='hover:text-white transition-colors duration-200'
                  >
                    {BRAND.phone}
                  </a>
                </div>
                <div className='flex items-center space-x-3 text-fieldporter-gray'>
                  <MapPin className='w-5 h-5 text-fieldporter-blue' />
                  <span>Global Operations</span>
                </div>
              </div>

              {/* Social Links */}
              <div className='flex space-x-4'>
                {socialLinks.map(social => (
                  <a
                    key={social.name}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='p-2 rounded-lg bg-white/5 text-fieldporter-gray hover:text-white hover:bg-fieldporter-blue transition-all duration-200'
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
            >
              <h3 className='text-white font-semibold text-lg mb-4'>Services</h3>
              <ul className='space-y-3'>
                {FOOTER_LINKS.services.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-fieldporter-gray hover:text-white transition-colors duration-200 flex items-center group'
                    >
                      {link.label}
                      <ArrowUpRight className='w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
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
            >
              <h3 className='text-white font-semibold text-lg mb-4'>Company</h3>
              <ul className='space-y-3'>
                {FOOTER_LINKS.company.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-fieldporter-gray hover:text-white transition-colors duration-200 flex items-center group'
                    >
                      {link.label}
                      <ArrowUpRight className='w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Portfolio/Subsidiaries */}
          <div className='lg:col-span-4'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className='text-white font-semibold text-lg mb-4'>Portfolio Companies</h3>
              <div className='space-y-4'>
                {subsidiaryBusinesses.map(business => (
                  <div
                    key={business.name}
                    className='p-4 rounded-lg glass-dark border border-white/10 hover:border-fieldporter-blue/30 transition-all duration-200'
                  >
                    <div className='flex items-start justify-between mb-2'>
                      <h4 className='text-white font-medium'>{business.name}</h4>
                      <span
                        className={cn(
                          'px-2 py-1 rounded-full text-xs font-medium',
                          business.status === 'active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        )}
                      >
                        {business.status === 'active' ? 'Active' : 'Coming Soon'}
                      </span>
                    </div>
                    <p className='text-fieldporter-gray text-sm mb-3'>{business.description}</p>
                    <Link
                      href={business.href}
                      className='text-fieldporter-blue hover:text-white text-sm font-medium flex items-center group'
                    >
                      Learn more
                      <ArrowUpRight className='w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200' />
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className='mt-16 pt-8 border-t border-white/10'
        >
          <div className='max-w-2xl'>
            <h3 className='text-white font-semibold text-xl mb-2'>Stay ahead of AI innovation</h3>
            <p className='text-fieldporter-gray mb-6'>
              Get exclusive insights on AI strategy, implementation best practices, and industry
              trends delivered to your inbox.
            </p>
            <form className='flex flex-col sm:flex-row gap-4'>
              <Input
                type='email'
                placeholder='Enter your email address'
                className='flex-1 bg-white/5 border-white/20 text-white placeholder:text-fieldporter-gray focus:border-fieldporter-blue'
                required
              />
              <Button type='submit' className='btn-primary whitespace-nowrap'>
                Subscribe
              </Button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-white/10'>
        <div className='container-fieldporter py-6'>
          <div className='flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0'>
            <div className='text-fieldporter-gray text-sm'>
              © {currentYear} {BRAND.name}. All rights reserved.
            </div>
            <div className='flex flex-wrap items-center gap-6 text-sm'>
              {FOOTER_LINKS.legal.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='text-fieldporter-gray hover:text-white transition-colors duration-200'
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
