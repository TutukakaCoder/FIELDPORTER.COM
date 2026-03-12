"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Footer, Header } from "./index";

interface ConditionalLayoutProps {
  children: ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  const isAuthPage = pathname?.startsWith("/auth");
  const isPartnerFlyer = pathname?.startsWith("/think-global-voluntas");

  const showHeaderFooter = !isAuthPage && !isPartnerFlyer;

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}
