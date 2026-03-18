"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Footer, Header } from "./index";

interface ConditionalLayoutProps {
  children: ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  const isPartnerFlyer = pathname?.startsWith("/think-global-voluntas");
  const showHeaderFooter = !isPartnerFlyer;

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}
