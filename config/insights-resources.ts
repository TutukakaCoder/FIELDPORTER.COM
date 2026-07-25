export interface ExternalInsightResource {
  title: string;
  source: string;
  category: "AI Strategy" | "Automation" | "VC Operations";
  href: string;
  note: string;
}

export const EXTERNAL_INSIGHT_RESOURCES: ExternalInsightResource[] = [
  {
    title: "The state of AI in 2025: Agents, innovation, and transformation",
    source: "McKinsey",
    category: "AI Strategy",
    href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    note: "Latest global survey: wide AI use, slower path from pilots to enterprise value.",
  },
  {
    title: "The 2026 AI Index Report",
    source: "Stanford HAI",
    category: "AI Strategy",
    href: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
    note: "Independent annual data on capability, investment, adoption, and governance gaps.",
  },
  {
    title: "Most AI Initiatives Fail. This 5-Part Framework Can Help.",
    source: "Harvard Business Review",
    category: "AI Strategy",
    href: "https://s.hbr.org/4oRKC8g",
    note: "Practical execution framework for leaders deploying AI beyond pilots.",
  },
  {
    title: "Future of Jobs Report 2025",
    source: "World Economic Forum",
    category: "Automation",
    href: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
    note: "Macro context on AI, automation, skills, and workforce shifts.",
  },
  {
    title: "Measuring automation ROI",
    source: "Deloitte",
    category: "Automation",
    href: "https://www2.deloitte.com/us/en/pages/advisory/articles/measuring-enterprise-automation-roi.html",
    note: "Solid structure for ROI modeling beyond direct labor savings.",
  },
  {
    title: "PitchBook-NVCA Venture Monitor",
    source: "PitchBook and NVCA",
    category: "VC Operations",
    href: "https://nvca.org/research/pitchbook-nvca-venture-monitor/",
    note: "Current VC market context: investment concentration, exits, and AI-driven deal flow.",
  },
  {
    title: "The Operator Advantage in Venture Capital",
    source: "GWC",
    category: "VC Operations",
    href: "https://www.gwc.vc/insights/the-operator-advantage-in-venture-capital",
    note: "Operator-led support model for portfolio execution after the term sheet.",
  },
];
