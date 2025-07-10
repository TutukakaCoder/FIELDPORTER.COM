"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Footer, Header } from "./index";

interface ConditionalLayoutProps {
  children: ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if current path is auth or portal pages
  const isAuthPage = pathname?.startsWith("/auth");
  const isPortalPage = pathname?.startsWith("/portal");

  // Don't show header/footer for auth or portal pages
  const showHeaderFooter = !isAuthPage && !isPortalPage;

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}
