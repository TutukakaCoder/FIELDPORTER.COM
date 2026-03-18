import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness Assessment | FIELDPORTER",
  description:
    "Scored roadmap for your automation strategy. Know what to build first. Written report plus consultation in 2–5 days.",
  keywords: ["AI Readiness", "AI Assessment", "Automation Roadmap", "AI Audit"],
  openGraph: {
    title: "AI Readiness Assessment | FIELDPORTER",
    description:
      "Scored roadmap for your automation strategy. Know what to build first. Written report plus consultation in 2–5 days.",
    type: "website",
    url: "https://fieldporter.com/aios",
  },
};

export default function AIOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
