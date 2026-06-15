"use client";

import React from "react";
import { COMPANY_MODEL, SOCIAL_LINKS } from "@/config/constants";

export function FieldporterStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "FIELDPORTER",
          alternateName: "FIELDPORTER Limited",
          url: "https://fieldporter.com",
          logo: "https://fieldporter.com/favicon-dark.png",
          description: COMPANY_MODEL.short,
          email: "hello@fieldporter.com",
          foundingDate: "2023",
          founders: [
            {
              "@type": "Person",
              name: "Freddy Hopkins",
              jobTitle: "Founder & Custom Software Developer",
            },
          ],
          address: {
            "@type": "PostalAddress",
            addressCountry: "NZ",
            addressLocality: "Auckland",
          },
          sameAs: [
            SOCIAL_LINKS.twitter,
            SOCIAL_LINKS.linkedin,
            SOCIAL_LINKS.github,
          ],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            url: "https://fieldporter.com/contact",
            email: "hello@fieldporter.com",
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
        }),
      }}
    />
  );
}
