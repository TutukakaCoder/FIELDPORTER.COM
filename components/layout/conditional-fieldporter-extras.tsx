"use client";

import { usePathname } from "next/navigation";
import { FieldporterStructuredData } from "./fieldporter-structured-data";

export function ConditionalFieldporterExtras() {
  const pathname = usePathname();

  const isIsolatedPartnerPage = pathname?.startsWith("/think-global-voluntas");

  if (isIsolatedPartnerPage) {
    return null;
  }

  return <FieldporterStructuredData />;
}
