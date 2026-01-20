import { ContactPageClient } from "./contact-page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | FIELDPORTER",
  description:
    "Get in touch with our team. Send a message or book a discovery call - we'll get back to you shortly.",
  keywords: [
    "contact FIELDPORTER",
    "AI consulting contact",
    "automation consultation",
    "AI project discussion",
    "business automation contact",
    "AI implementation help",
    "contact form",
    "book discovery call",
  ],
  openGraph: {
    title: "Contact Us | FIELDPORTER",
    description:
      "Get in touch with our team. Send a message or book a discovery call - we'll get back to you shortly.",
    type: "website",
    url: "https://fieldporter.com/contact",
    siteName: "FIELDPORTER",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Contact FIELDPORTER - AI Implementation & Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | FIELDPORTER",
    description:
      "Get in touch with our team. Send a message or book a discovery call - we'll get back to you shortly.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://fieldporter.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
