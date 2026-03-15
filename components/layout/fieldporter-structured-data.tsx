"use client";

import React from "react";
import { COMPANY_MODEL } from "@/config/constants";

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
          description: COMPANY_MODEL.short + " Production systems in weeks.",
          email: "hello@fieldporter.com",
          foundingDate: "2023",
          founders: [
            {
              "@type": "Person",
              name: "Freddy Krueger",
              jobTitle: "Founder & AI Integration Specialist",
            },
          ],
          address: {
            "@type": "PostalAddress",
            addressCountry: "NZ",
            addressLocality: "Auckland",
          },
          sameAs: [
            "https://twitter.com/fieldporter",
            "https://linkedin.com/company/fieldporter",
            "https://github.com/fieldporter",
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
                name: "AI Integration & Implementation",
                description:
                  "Consulting and build: custom AI integration and production systems",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Workflow Automation",
                description:
                  "Automate repetitive tasks and streamline operations",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Strategic AI Research",
                description: "Data-driven insights for competitive advantage",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Training & Implementation",
                description:
                  "Team training and hands-on AI system implementation",
              },
            },
          ],
        }),
      }}
    />
  );
}
