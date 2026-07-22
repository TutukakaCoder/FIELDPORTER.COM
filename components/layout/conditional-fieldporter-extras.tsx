"use client";

import React from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { FieldporterStructuredData } from "./fieldporter-structured-data";
import { PremiumCursor } from "./premium-cursor";

const EnhancedChatWidget = dynamic(
  () =>
    import("@/components/chat").then((mod) => ({
      default: mod.EnhancedChatWidget,
    })),
  { ssr: false },
);

export function ConditionalFieldporterExtras() {
  const pathname = usePathname();

  const isIsolatedPartnerPage = pathname?.startsWith("/think-global-voluntas");

  if (isIsolatedPartnerPage) {
    return null;
  }

  return (
    <>
      <EnhancedChatWidget />
      <FieldporterStructuredData />
      <PremiumCursor />
    </>
  );
}
