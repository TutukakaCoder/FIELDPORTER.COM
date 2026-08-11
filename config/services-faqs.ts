/** Shared Services FAQ source — UI and FAQPage schema must use this only. */

export const SERVICES_FAQ_SECTION = {
  title: "Common Questions",
  subtitle:
    "Practical answers about custom software, portals, and AI inside real workflows.",
  faqs: [
    {
      question: "Do you build complete systems or prototypes?",
      answer:
        "We build working custom software, not slide decks. For larger portals, we usually start with a focused version that solves the core workflow first, then improve it from real use.",
    },
    {
      question:
        "When is custom software better than HubSpot, Airtable, Monday or another SaaS tool?",
      answer:
        "Custom software makes sense when your workflow is specific, your users need different views, your data is scattered, or you are paying for large tools with features you do not use.",
    },
    {
      question: "How long does a portal or internal system take?",
      answer:
        "Focused custom software projects usually start around 8-10 weeks. Smaller automations can be faster. Larger portals with multiple user types, integrations or AI features need a scoped plan before timelines are promised.",
    },
    {
      question: "What does a typical 8-week build include?",
      answer:
        "Usually a focused portal or internal tool with authentication, role-based views, a custom database, core dashboards, key workflows, testing, deployment and handover documentation.",
    },
    {
      question: "Can you add AI to a portal safely?",
      answer:
        "Yes, when the data, permissions and workflow are clear. We use AI for specific jobs such as search, document extraction, summaries, triage, SOP checks and decision support, with human review where needed.",
    },
    {
      question: "Who owns the code and data after launch?",
      answer:
        "The goal is for you to own the system, data model and workflow logic. We document the build and avoid locking you into a tool stack you cannot understand or maintain.",
    },
    {
      question: "Can you train our team to use the system and AI features?",
      answer:
        "Yes. Training is part of making the system useful. We show your team how the workflow works, where AI should be trusted, where it should be checked, and how to use it day to day.",
    },
  ],
} as const;

export type ServicesFaqItem = (typeof SERVICES_FAQ_SECTION.faqs)[number];
