import { ENQUIRY_RESPONSE } from "@/config/constants";
import { pageSocial } from "@/lib/social-metadata";
import { ContactPageClient } from "./contact-page-client";
import { Metadata } from "next";

const contactTitle = "FIELDPORTER | Contact";
const contactDescription = `Tell us about the workflow you need built. Message us or book a discovery call. ${ENQUIRY_RESPONSE.aimPhrase}`;

export const metadata: Metadata = {
  title: "Contact",
  description: contactDescription,
  keywords: [
    "contact FIELDPORTER",
    "custom software enquiry",
    "book discovery call",
    "workflow automation contact",
    "contact form",
  ],
  ...pageSocial({
    title: contactTitle,
    description: contactDescription,
    path: "/contact",
    alt: "Contact FIELDPORTER — custom software enquiry",
  }),
};

export default function ContactPage() {
  return <ContactPageClient />;
}
