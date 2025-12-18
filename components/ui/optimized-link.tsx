"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";

interface OptimizedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  enableHover?: boolean;
  underlineOnHover?: boolean;
  [key: string]: any;
}

export function OptimizedLink({
  href,
  children,
  className,
  prefetch = true,
  enableHover = false,
  underlineOnHover = false,
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

  const linkContent = (
    <Link
      href={href}
      className={cn(underlineOnHover && "relative group", className)}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      {...props}
    >
      {children}
      {underlineOnHover && (
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-fieldporter-blue transition-all duration-300 group-hover:w-full" />
      )}
    </Link>
  );

  if (enableHover) {
    return (
      <motion.span
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="inline-block"
      >
        {linkContent}
      </motion.span>
    );
  }

  return linkContent;
}
