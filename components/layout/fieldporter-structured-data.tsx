import {
  BRAND,
  COMPANY_MODEL,
  LEGAL_ENTITY,
  SITE_ORIGIN,
  SOCIAL_LINKS,
} from "@/config/constants";
import { JsonLd, SCHEMA_IDS } from "@/lib/json-ld";
import { absoluteUrl } from "@/lib/social-metadata";

/**
 * Sitewide Organization + WebSite JSON-LD.
 * No LocalBusiness, SearchAction, ratings, street, phone, or hours.
 * No X/Twitter in sameAs — FIELDPORTER has no public Twitter account (B009).
 */
export function FieldporterStructuredData() {
  const organization = {
    "@type": "Organization",
    "@id": SCHEMA_IDS.organization,
    name: BRAND.name,
    alternateName: LEGAL_ENTITY.name,
    url: SITE_ORIGIN,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/favicon-dark-512.png"),
      width: 512,
      height: 512,
    },
    description: COMPANY_MODEL.short,
    email: BRAND.email,
    founders: [
      {
        "@type": "Person",
        name: "Freddy Hopkins",
        jobTitle: "Co-founder",
        sameAs: [SOCIAL_LINKS.founderLinkedIn],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "NZ",
      addressLocality: "Auckland",
    },
    areaServed: [
      { "@type": "Country", name: "New Zealand" },
      { "@type": "Place", name: "Worldwide" },
    ],
    identifier: [
      {
        "@type": "PropertyValue",
        name: "NZ Company Number",
        value: LEGAL_ENTITY.companyNumber,
      },
      {
        "@type": "PropertyValue",
        name: "NZBN",
        value: LEGAL_ENTITY.nzbn,
      },
    ],
    sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: absoluteUrl("/contact"),
      email: BRAND.email,
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Portals and Internal Tools",
          description:
            "Role-based portals and internal tools for clients, staff, admins, and investors",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Databases, Dashboards and Reporting",
          description:
            "Custom data structures and reporting screens for operational visibility",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Workflow Automation and Integrations",
          description:
            "Automate handoffs, document intake, approvals, and repeatable admin",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Capability and Team Enablement",
          description:
            "Controlled AI features inside business systems plus practical team training",
        },
      },
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": SCHEMA_IDS.website,
    name: BRAND.name,
    url: SITE_ORIGIN,
    description: COMPANY_MODEL.short,
    publisher: { "@id": SCHEMA_IDS.organization },
    inLanguage: "en-NZ",
  };

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [organization, website],
      }}
    />
  );
}
