/**
 * Page Transition Component - Simplified for Navigation Fix
 */

'use client';

import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return <div className={className}>{children}</div>;
}
