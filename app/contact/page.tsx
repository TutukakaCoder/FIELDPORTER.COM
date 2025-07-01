import { ContactMethods } from "@/components/contact";
import { SimpleContactForm } from "@/components/contact/simple-contact-form";
import { PageWrapper } from "@/components/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Let's Talk About Your AI Project | FIELDPORTER",
  description:
    "Whether you have a specific automation in mind or want to explore possibilities, we'll help you find the right approach.",
  keywords: [
    "AI project consultation",
    "automation opportunities",
    "AI possibilities",
    "workflow optimization",
    "AI training",
    "business automation",
    "AI consulting",
  ],
  openGraph: {
    title: "Let's Talk About Your AI Project | FIELDPORTER",
    description:
      "Whether you have a specific automation in mind or want to explore possibilities, we'll help you find the right approach.",
    type: "website",
    url: "https://fieldporter.com/contact",
    siteName: "FIELDPORTER",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Let's Talk About Your AI Project - FIELDPORTER",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Let's Talk About Your AI Project | FIELDPORTER",
    description:
      "Whether you have a specific automation in mind or want to explore possibilities, we'll help you find the right approach.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <SimpleContactForm />
      <ContactMethods />
    </PageWrapper>
  );
}
