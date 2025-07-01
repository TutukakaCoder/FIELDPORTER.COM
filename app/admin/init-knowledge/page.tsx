"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";

const FIELDPORTER_KNOWLEDGE_BASE = [
  // 🎯 Core Services & Offerings
  {
    id: "services-overview",
    category: "services",
    title: "What FIELDPORTER Does",
    content:
      "We help businesses integrate AI tools that actually work. Four main things we do: Strategic Research (get answers in 3-5 days instead of weeks), Rapid Development (working prototypes in 1-2 weeks), Workflow Automation (save 10-40 hours weekly), and AI Training (learn to do it yourself). Everything we recommend, we use in our own businesses first.",
    keywords: [
      "services",
      "what do you do",
      "offerings",
      "help",
      "consulting",
      "ai integration",
    ],
    priority: 10,
    active: true,
  },
  {
    id: "strategic-research",
    category: "services",
    title: "Strategic Research Intelligence",
    content:
      "We use AI to analyze thousands of sources simultaneously - market data, competitor moves, customer behavior, regulatory changes. What normally takes consultants 4-6 weeks, we deliver in 3-5 days. Recent example: complete US market entry strategy for a clothing brand in 1 week. Investment varies based on scope and complexity.",
    keywords: [
      "research",
      "market analysis",
      "competitive intelligence",
      "strategy",
      "market entry",
    ],
    priority: 9,
    active: true,
  },
  {
    id: "rapid-development",
    category: "services",
    title: "Rapid Development & Integration",
    content:
      "We build working prototypes to test your ideas quickly. Using React, TypeScript, and Firebase, we create functional applications in 1-2 weeks. Not just mockups - real systems you can use immediately. Our Self-Development Platform has been running for 8+ months with active users. Investment depends on complexity and features needed.",
    keywords: [
      "development",
      "prototype",
      "mvp",
      "app",
      "web app",
      "integration",
      "api",
    ],
    priority: 9,
    active: true,
  },
  {
    id: "workflow-automation",
    category: "services",
    title: "Workflow Automation & Optimization",
    content:
      "We find the repetitive tasks eating up your team time and automate them. Recent client reduced admin work from 15 hours to 4 hours weekly. We use tools like n8n for workflows, Claude for intelligent processing, and custom integrations. You get automated systems plus training to maintain them.",
    keywords: [
      "automation",
      "workflow",
      "efficiency",
      "time saving",
      "process",
      "n8n",
    ],
    priority: 9,
    active: true,
  },
  {
    id: "ai-training",
    category: "services",
    title: "AI Training & Implementation",
    content:
      "We teach you and your team to use AI tools effectively. Not generic tutorials - specific techniques for your industry and workflows. Custom knowledge bases, prompt engineering that works, tool selection for your needs. Goal is to make you self-sufficient, not dependent on consultants.",
    keywords: [
      "training",
      "education",
      "ai tools",
      "implementation",
      "workshops",
      "learning",
    ],
    priority: 8,
    active: true,
  },

  // 🏢 Company Background & Philosophy
  {
    id: "about-fieldporter",
    category: "about",
    title: "Who We Are",
    content:
      "FIELDPORTER is run by Frederick Hopkins. We are not traditional consultants - we are builders who happen to consult. We test every AI tool and strategy in our own projects before recommending them. Currently building several businesses while helping clients implement AI. If it does not work for us, we will not suggest it for you.",
    keywords: [
      "about",
      "fieldporter",
      "frederick",
      "freddy",
      "who are you",
      "company",
      "background",
    ],
    priority: 9,
    active: true,
  },
  {
    id: "our-philosophy",
    category: "about",
    title: "How We Are Different",
    content:
      "Most consultants talk theory. We build real systems. We use Claude for analysis, DeepSeek for cost-effective processing, n8n for automation, and Cursor for development - daily. Our consulting funds our product development, and our product experience makes our consulting better. We share what actually works, not what sounds impressive.",
    keywords: [
      "philosophy",
      "approach",
      "different",
      "unique",
      "why fieldporter",
    ],
    priority: 8,
    active: true,
  },
  {
    id: "portfolio-businesses",
    category: "portfolio",
    title: "What We Are Building",
    content:
      "We are currently running three main projects: Self-Development Platform (live with paying users for 8+ months), AI Research System (using multiple AI models for automated research), and Family Care Platform (AI coordination for elderly care). Everything we learn building these makes our client work better.",
    keywords: ["portfolio", "projects", "building", "products", "businesses"],
    priority: 7,
    active: true,
  },

  // 🔄 5-Phase Systematic Process
  {
    id: "our-process",
    category: "process",
    title: "How We Work",
    content:
      "Five phases: 1) Foundation - understand your specific situation and goals. 2) Research - use AI to analyze your market and opportunities. 3) Validation - filter massive data into useful insights. 4) Development - build working prototypes or systems. 5) Implementation - deploy and train your team. Typical timeline: 1-4 weeks depending on scope.",
    keywords: [
      "process",
      "methodology",
      "how do you work",
      "phases",
      "timeline",
    ],
    priority: 8,
    active: true,
  },
  {
    id: "process-details",
    category: "process",
    title: "What Makes Our Process Work",
    content:
      "We process thousands of information sources simultaneously using AI, then validate findings across multiple models to ensure accuracy. Raw research often produces 70+ documents - we filter this down to actionable insights. Everything gets documented clearly so your team can understand and use it, not just admire it.",
    keywords: [
      "validation",
      "research process",
      "methodology details",
      "accuracy",
    ],
    priority: 7,
    active: true,
  },

  // 🏭 Industry Focus
  {
    id: "industries-overview",
    category: "industries",
    title: "Industries We Work With",
    content:
      "We work across industries but have deep experience in construction (automating estimates and project management), SaaS companies (building AI features and automation), venture capital (due diligence and portfolio analysis), and professional services. Our AI methods adapt to any industry - the patterns are similar, the applications are specific.",
    keywords: [
      "industries",
      "sectors",
      "experience",
      "construction",
      "saas",
      "venture capital",
    ],
    priority: 7,
    active: true,
  },
  {
    id: "construction-focus",
    category: "industries",
    title: "AI for Construction",
    content:
      "Construction companies use our AI solutions for automated estimating, project scheduling optimization, and document processing. We have helped contractors reduce bid preparation time by 70% and improve accuracy. Safety compliance automation and subcontractor communication workflows are common implementations.",
    keywords: [
      "construction",
      "contractors",
      "building",
      "estimates",
      "project management",
    ],
    priority: 6,
    active: true,
  },
  {
    id: "saas-focus",
    category: "industries",
    title: "AI for SaaS Companies",
    content:
      "SaaS companies work with us to add AI features quickly - intelligent search, automated customer support, usage analytics. We help you integrate Claude or GPT-4 without months of development. Recent project: AI-powered user onboarding that reduced support tickets by 60%.",
    keywords: ["saas", "software", "b2b", "features", "integration"],
    priority: 6,
    active: true,
  },

  // 🛠️ Technology Stack
  {
    id: "tech-stack-overview",
    category: "technology",
    title: "Tools We Use Daily",
    content:
      "We use what works: Claude for complex analysis and coding, DeepSeek for cost-effective bulk processing (80% cheaper than GPT-4), n8n for workflow automation, Cursor AI for rapid development, Next.js and React for web apps, Firebase for real-time features. Everything chosen for results, not resume building.",
    keywords: ["technology", "tools", "tech stack", "ai tools", "development"],
    priority: 8,
    active: true,
  },
  {
    id: "ai-tools-specifics",
    category: "technology",
    title: "Why These AI Tools",
    content:
      "Claude 4 Opus handles complex reasoning and code generation. DeepSeek V3 processes bulk data at 1/5 the cost. Perplexity for real-time research. Cursor AI speeds development by 3-5x. n8n connects everything without expensive Zapier bills. We have tested dozens of tools - these actually deliver value.",
    keywords: [
      "claude",
      "deepseek",
      "perplexity",
      "cursor",
      "gemini",
      "gpt",
      "ai models",
    ],
    priority: 7,
    active: true,
  },

  // 📈 Results & ROI Examples
  {
    id: "results-overview",
    category: "results",
    title: "What Results Look Like",
    content:
      "Our clients typically see: 70-90% reduction in manual work time, 3.5-8X return on AI investment, research delivered 78% faster than traditional methods. Real example: law firm saved 360,000 hours annually on document review. Another: startup got complete market analysis in 5 days instead of 6 weeks.",
    keywords: ["results", "roi", "outcomes", "success", "metrics", "savings"],
    priority: 9,
    active: true,
  },
  {
    id: "specific-examples",
    category: "results",
    title: "Real Client Outcomes",
    content:
      "Executive coach: rebuilt failed app, now generating weekly revenue for 8+ months. Web3 company: strategic research enabled successful product pivot. Professional services firm: automated lead qualification saving 15 hours weekly. These are not exceptions - they are typical when you implement AI properly.",
    keywords: [
      "case studies",
      "examples",
      "testimonials",
      "proof",
      "success stories",
    ],
    priority: 8,
    active: true,
  },

  // 🚀 Getting Started
  {
    id: "getting-started",
    category: "getting_started",
    title: "How to Start",
    content:
      "Start with a conversation about your biggest time wasters or strategic questions. Most clients begin with either Strategic Research (understand your market fast) or a Workflow Audit (find automation opportunities). We will recommend the right starting point based on your situation. Investment ranges are broad depending on scope and complexity.",
    keywords: [
      "start",
      "begin",
      "how to start",
      "first step",
      "getting started",
    ],
    priority: 9,
    active: true,
  },
  {
    id: "investment-approach",
    category: "pricing",
    title: "Investment Approach",
    content:
      "We quote fixed prices after understanding your needs - no surprise bills, clear deliverables. Investment varies significantly based on complexity, timeline, and scope. Strategic Research might be different from Rapid Development or Workflow Automation. We will provide specific estimates once we understand your situation.",
    keywords: [
      "pricing",
      "cost",
      "investment",
      "rates",
      "how much",
      "expensive",
    ],
    priority: 8,
    active: true,
  },
  {
    id: "value-focus",
    category: "pricing",
    title: "Value vs Cost",
    content:
      "We price based on value delivered, not time spent. When we save you 15 hours weekly, that is 780 hours annually. Most clients see significant ROI within 60 days. We focus on outcomes that matter - time saved, revenue increased, processes improved. The investment makes sense when you see the results.",
    keywords: [
      "value",
      "roi",
      "worth it",
      "expensive",
      "pricing justification",
    ],
    priority: 7,
    active: true,
  },

  // 📞 Contact & Consultation Process
  {
    id: "contact-process",
    category: "contact",
    title: "Next Steps",
    content:
      "Best way forward: Share your email and biggest challenge. Our team reviews every inquiry personally and responds within 24 hours. We will discuss your situation, see if we are a good fit, and propose next steps. No generic sales calls - just honest discussion about whether and how we can help.",
    keywords: [
      "contact",
      "reach out",
      "next steps",
      "consultation",
      "meeting",
      "talk",
    ],
    priority: 10,
    active: true,
  },
  {
    id: "consultation-details",
    category: "contact",
    title: "What Happens Next",
    content:
      "After you share contact details, our team will email you directly to schedule a 30-minute discussion. We will talk about your specific challenges, what you have tried, and where you want to go. If we can help, we will propose a clear plan with timeline and investment. If not, we will point you to better resources.",
    keywords: [
      "consultation",
      "meeting",
      "discussion",
      "what happens",
      "process",
    ],
    priority: 8,
    active: true,
  },

  // 🎯 Common Questions & Objections
  {
    id: "why-not-hire-employees",
    category: "faq",
    title: "Why Not Just Hire Someone?",
    content:
      "Good AI talent is expensive and hard to find - often $150-200k/year plus benefits. We deliver specific outcomes in weeks, not months of hiring and training. You get immediate results plus knowledge transfer to your team. Most clients find this significantly more cost-effective than hiring, especially for initial AI implementation.",
    keywords: ["hire", "employee", "in-house", "team", "permanent"],
    priority: 7,
    active: true,
  },
  {
    id: "why-not-diy",
    category: "faq",
    title: "Can I Learn This Myself?",
    content:
      "Absolutely - but it takes 6-12 months to gain real proficiency. We have already made the expensive mistakes and know what works. Think of us as shortcuts: you could spend months figuring out which AI tools actually work, or we can show you in days. Plus you get working systems, not just knowledge.",
    keywords: ["diy", "learn myself", "self-taught", "courses", "youtube"],
    priority: 7,
    active: true,
  },
  {
    id: "data-security",
    category: "faq",
    title: "Is My Data Safe?",
    content:
      "We take data security seriously. All work happens under NDA. We use enterprise-grade tools with SOC 2 compliance. Your data stays in your accounts - we set up systems you control. For sensitive projects, we can work entirely within your infrastructure. Security is not optional, it is built into how we work.",
    keywords: ["security", "data", "privacy", "safe", "nda", "confidential"],
    priority: 8,
    active: true,
  },
];

export default function InitKnowledgePage() {
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    addedCount: number;
    skippedCount: number;
  } | null>(null);

  const clearKnowledgeBase = async () => {
    setStatus("🗑️ Clearing existing knowledge base...");
    const knowledgeRef = collection(db, "ai_knowledge_base");
    const existingDocs = await getDocs(knowledgeRef);

    if (!existingDocs.empty) {
      const deletePromises = existingDocs.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      setStatus(`🗑️ Cleared ${existingDocs.docs.length} existing entries`);
    } else {
      setStatus("📝 Knowledge base is already empty");
    }
  };

  const initializeKnowledgeBase = async () => {
    setIsLoading(true);
    setStatus("🚀 Starting FIELDPORTER Knowledge Base initialization...");

    try {
      // Clear existing knowledge base first
      await clearKnowledgeBase();

      const knowledgeRef = collection(db, "ai_knowledge_base");

      // Add knowledge base items
      setStatus("📝 Adding new knowledge base entries...");
      let addedCount = 0;

      for (const item of FIELDPORTER_KNOWLEDGE_BASE) {
        try {
          await addDoc(knowledgeRef, {
            ...item,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
          });
          addedCount++;
          setStatus(`✅ Added: ${item.title}`);
        } catch (error) {
          console.error(`❌ Failed to add ${item.title}:`, error);
        }
      }

      setResults({ addedCount, skippedCount: 0 });
      setStatus(
        `🎉 Successfully initialized ${addedCount} knowledge base entries!`,
      );
    } catch (error) {
      console.error("❌ Error initializing knowledge base:", error);
      setStatus(
        `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          🧠 FIELDPORTER Knowledge Base Initialization
        </h1>

        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Knowledge Base Stats</h2>
          <p className="mb-2">
            📚 Total Entries: {FIELDPORTER_KNOWLEDGE_BASE.length}
          </p>
          <p className="mb-2">
            🏷️ Categories:{" "}
            {[
              ...new Set(
                FIELDPORTER_KNOWLEDGE_BASE.map((item) => item.category),
              ),
            ].join(", ")}
          </p>
          <p className="text-gray-400">
            This will replace all existing knowledge base entries with fresh,
            comprehensive content.
          </p>
        </div>

        <Button
          onClick={initializeKnowledgeBase}
          disabled={isLoading}
          className="mb-6 bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Initializing..." : "🚀 Initialize Knowledge Base"}
        </Button>

        {status && (
          <div className="bg-gray-900 p-4 rounded-lg mb-4">
            <p className="font-mono">{status}</p>
          </div>
        )}

        {results && (
          <div className="bg-green-900 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">✅ Initialization Complete!</h3>
            <p>Added: {results.addedCount} entries</p>
            <p>Skipped: {results.skippedCount} entries</p>
            <p className="mt-2 text-green-300">
              Your knowledge base is now ready for the AI chatbot!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
