"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";

interface OptimizedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  [key: string]: any;
}

export function OptimizedLink({
  href,
  children,
  className,
  prefetch = true,
  ...props
}: OptimizedLinkProps) {
  const router = useRouter();

  // Prefetch on hover with delay to avoid excessive requests
  const handleMouseEnter = useCallback(() => {
    if (prefetch && href) {
      setTimeout(() => {
        router.prefetch(href);
      }, 100); // 100ms delay to avoid accidental hovers
    }
  }, [router, href, prefetch]);

  // Prefetch on touch start for mobile
  const handleTouchStart = useCallback(() => {
    if (prefetch && href) {
      router.prefetch(href);
    }
  }, [router, href, prefetch]);

  return (
    <Link
      href={href}
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      {...props}
    >
      {children}
    </Link>
  );
} 