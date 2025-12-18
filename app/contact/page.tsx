import { ContactMethods } from "@/components/contact";
import { PageWrapper } from "@/components/layout";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Premium loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
    <div className="text-center animate-fade-in">
      <div className="relative w-14 h-14 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/20"></div>
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin"
          style={{ animationDuration: "0.8s" }}
        ></div>
        <div
          className="absolute inset-1 rounded-full border-2 border-transparent border-b-blue-400/50 animate-spin"
          style={{ animationDuration: "1.2s", animationDirection: "reverse" }}
        ></div>
        <div className="absolute inset-3 rounded-full bg-blue-500/10 animate-pulse"></div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">
        Loading contact form...
      </p>
    </div>
  </div>
);

// Dynamic import for heavy contact form
const SimpleContactForm = dynamic(
  () =>
    import("@/components/contact/simple-contact-form").then((mod) => ({
      default: mod.SimpleContactForm,
    })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: "Contact Us | FIELDPORTER",
  description:
    "Get in touch with our team. Use our contact form or chat with our AI assistant - we'll get back to you shortly.",
  keywords: [
    "contact FIELDPORTER",
    "AI consulting contact",
    "automation consultation",
    "AI project discussion",
    "business automation contact",
    "AI implementation help",
    "contact form",
  ],
  openGraph: {
    title: "Contact Us | FIELDPORTER",
    description:
      "Get in touch with our team. Use our contact form or chat with our AI assistant - we'll get back to you shortly.",
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
      "Get in touch with our team. Use our contact form or chat with our AI assistant - we'll get back to you shortly.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://fieldporter.com/contact",
  },
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <Suspense fallback={<LoadingSpinner />}>
        <SimpleContactForm />
      </Suspense>
      <ContactMethods />
    </PageWrapper>
  );
}
