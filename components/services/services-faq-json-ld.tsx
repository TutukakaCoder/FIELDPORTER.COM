import { SERVICES_FAQ_SECTION } from "@/config/services-faqs";
import { JsonLd } from "@/lib/json-ld";

/** FAQPage JSON-LD for /services — must match SERVICES_FAQ_SECTION / visible FAQ UI. */
export function ServicesFaqJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: SERVICES_FAQ_SECTION.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}
