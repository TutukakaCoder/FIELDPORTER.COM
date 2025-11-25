import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Operating System (AIOS) | FIELDPORTER",
  description:
    "A strategic diagnostic framework to identify high-ROI AI opportunities. Get a scored roadmap and expert consultation.",
  keywords: ["AI Operating System", "AIOS", "AI Audit", "Automation Roadmap"],
  openGraph: {
    title: "AI Operating System (AIOS) | FIELDPORTER",
    description:
      "A strategic diagnostic framework to identify high-ROI AI opportunities. Get a scored roadmap and expert consultation.",
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
