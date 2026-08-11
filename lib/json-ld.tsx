import { SITE_ORIGIN } from "@/config/constants";

/** Stable @id helpers for schema.org graph nodes. */
export const SCHEMA_IDS = {
  organization: `${SITE_ORIGIN}/#organization`,
  website: `${SITE_ORIGIN}/#website`,
} as const;

/** Server-safe JSON-LD script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> | unknown[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
