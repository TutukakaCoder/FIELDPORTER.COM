import { ContactMethods } from "@/components/contact";
import { PageWrapper } from "@/components/layout";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic import for heavy contact form
const SimpleContactForm = dynamic(
  () =>
    import("@/components/contact/simple-contact-form").then((mod) => ({
      default: mod.SimpleContactForm,
    })),
  {
    loading: () => (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">
            Loading contact form...
          </p>
        </div>
      </div>
    ),
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
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
  },
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <Suspense
        fallback={
          <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">
                Loading contact form...
              </p>
            </div>
          </div>
        }
      >
        <SimpleContactForm />
      </Suspense>
      <ContactMethods />
    </PageWrapper>
  );
}
