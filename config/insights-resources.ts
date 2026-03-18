export interface ExternalInsightResource {
  title: string;
  source: string;
  category: "AI Strategy" | "Automation" | "VC Operations";
  href: string;
  note: string;
}

export const EXTERNAL_INSIGHT_RESOURCES: ExternalInsightResource[] = [
  {
    title: "The state of AI in early 2024",
    source: "McKinsey",
    category: "AI Strategy",
    href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2024",
    note: "Useful benchmark on adoption, value, and common blockers.",
  },
  {
    title: "The 2025 AI Index Report",
    source: "Stanford HAI",
    category: "AI Strategy",
    href: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
    note: "Neutral annual data on AI investment, use, and capability trends.",
  },
  {
    title: "Where's the Value in AI?",
    source: "BCG",
    category: "AI Strategy",
    href: "https://www.bcg.com/publications/2024/wheres-value-in-ai",
    note: "Clear view on why many teams stall between pilots and scale.",
  },
  {
    title: "Most AI Initiatives Fail. This 5-Part Framework Can Help.",
    source: "Harvard Business Review",
    category: "AI Strategy",
    href: "https://s.hbr.org/4oRKC8g",
    note: "Practical execution framework for leaders deploying AI.",
  },
  {
    title: "Measuring automation ROI",
    source: "Deloitte",
    category: "Automation",
    href: "https://www2.deloitte.com/us/en/pages/advisory/articles/measuring-enterprise-automation-roi.html",
    note: "Good structure for ROI modeling beyond direct labor savings.",
  },
  {
    title: "Future of Jobs Report 2025",
    source: "World Economic Forum",
    category: "Automation",
    href: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
    note: "Macro context on AI, automation, skills, and workforce shifts.",
  },
  {
    title: "Q4 2024 Venture Monitor",
    source: "PitchBook and NVCA",
    category: "VC Operations",
    href: "https://nvca.org/wp-content/uploads/2025/01/Q4-2024-PitchBook-NVCA-Venture-Monitor.pdf",
    note: "VC market context for portfolio operating discipline.",
  },
  {
    title: "The Operator Advantage in Venture Capital",
    source: "GWC",
    category: "VC Operations",
    href: "https://www.gwc.vc/insights/the-operator-advantage-in-venture-capital",
    note: "Operator-led support model for portfolio execution.",
  },
];
