'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbItems = items || generateBreadcrumbs(pathname);

  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumbs for home page or single-level pages
  }

  return (
    <nav aria-label='Breadcrumb' className={cn('py-4 border-b border-white/10', className)}>
      <div className='container-fieldporter'>
        <ol className='flex items-center space-x-2 text-sm'>
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isFirst = index === 0;

            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className='flex items-center'
              >
                {!isFirst && <ChevronRight className='w-4 h-4 text-fieldporter-gray mx-2' />}

                {isLast ? (
                  <span className='text-white font-medium' aria-current='page'>
                    {isFirst && <Home className='w-4 h-4 mr-2 inline' />}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'text-fieldporter-gray hover:text-white transition-colors duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:ring-offset-2 focus:ring-offset-black rounded-md px-1',
                      'flex items-center'
                    )}
                  >
                    {isFirst && <Home className='w-4 h-4 mr-2' />}
                    {item.label}
                  </Link>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

  let currentPath = '';

  segments.forEach(segment => {
    currentPath += `/${segment}`;

    // Convert segment to readable label
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  return breadcrumbs;
}
