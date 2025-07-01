/**
 * FIELDPORTER Knowledge Base Browser Initialization
 * Run this in your browser console on localhost:3000
 * Or create a temporary admin page
 */

// Import Firebase functions (add this to a React component or admin page)
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const FIELDPORTER_KNOWLEDGE_BASE = [
  {
    category: "services",
    content:
      "FIELDPORTER offers four core services: Strategic Research Intelligence (AI-powered market analysis delivering insights 78% faster), Rapid AI Development (MVPs in 2-4 weeks), Workflow Optimization (70-90% time savings on manual tasks), and AI Training & Implementation (hands-on team enablement).",
    keywords: [
      "services",
      "offerings",
      "what do you do",
      "help",
      "solutions",
      "consulting",
    ],
    priority: 10,
    active: true,
  },
  {
    category: "about",
    content:
      "FIELDPORTER bridges strategy and implementation. We're operators who build AI solutions, not just consultants. We test every strategy in our own portfolio businesses before recommending to clients, including our Family Care platform and self-development tools.",
    keywords: [
      "about",
      "who are you",
      "fieldporter",
      "company",
      "background",
      "team",
    ],
    priority: 9,
    active: true,
  },
  {
    category: "process",
    content:
      "Our 5-phase systematic approach: 1) Discovery - understand your specific challenges, 2) Strategy - design AI-powered solutions, 3) Prototype - rapid validation in 1-2 weeks, 4) Implementation - full deployment with your team, 5) Enablement - training for long-term success.",
    keywords: [
      "process",
      "how do you work",
      "methodology",
      "approach",
      "phases",
      "timeline",
    ],
    priority: 8,
    active: true,
  },
  {
    category: "industries",
    content:
      "We work across industries including construction, professional services, SaaS, and venture capital. Our AI solutions adapt to your specific sector needs - from automating construction estimates to enhancing VC due diligence and portfolio optimization.",
    keywords: [
      "industries",
      "construction",
      "saas",
      "venture capital",
      "sectors",
      "vc",
      "portfolio",
    ],
    priority: 7,
    active: true,
  },
  {
    category: "technology",
    content:
      "We leverage cutting-edge AI tools including DeepSeek for cost-effective processing, Claude for complex reasoning, custom API integrations for automation, and React/Next.js development. Everything is cloud-native, scalable, and built for enterprise use.",
    keywords: [
      "technology",
      "tools",
      "ai",
      "stack",
      "deepseek",
      "claude",
      "automation",
      "react",
      "nextjs",
    ],
    priority: 6,
    active: true,
  },
  {
    category: "results",
    content:
      "Our clients typically see 70-90% reduction in manual processing time, 3.5-8X ROI on AI investments, and 78% faster strategic insights. Real example: We helped one client save 360,000 hours annually through automated document processing.",
    keywords: [
      "results",
      "roi",
      "success",
      "metrics",
      "savings",
      "case studies",
      "outcomes",
    ],
    priority: 8,
    active: true,
  },
  {
    category: "getting_started",
    content:
      "Start with a strategic consultation where we identify your highest-impact AI opportunities. Most clients begin with a 2-week prototype to validate the approach, then scale based on results. Investment ranges from $5K for focused automation to $100K for comprehensive AI transformation.",
    keywords: [
      "start",
      "begin",
      "cost",
      "price",
      "consultation",
      "investment",
      "pricing",
      "budget",
    ],
    priority: 9,
    active: true,
  },
  {
    category: "contact",
    content:
      "To get started with FIELDPORTER, Frederick personally reviews each prospect to ensure alignment. Share your email and phone for a direct consultation within 24 hours. We work with serious businesses ready to implement AI solutions.",
    keywords: [
      "contact",
      "get in touch",
      "reach out",
      "speak",
      "talk",
      "consultation",
      "frederick",
    ],
    priority: 10,
    active: true,
  },
  {
    category: "ai_strategy",
    content:
      "We help businesses develop comprehensive AI strategies that align with business objectives. This includes identifying high-impact use cases, technology selection, implementation roadmaps, and change management for successful AI adoption.",
    keywords: [
      "ai strategy",
      "artificial intelligence",
      "strategic planning",
      "ai adoption",
      "implementation",
    ],
    priority: 9,
    active: true,
  },
  {
    category: "rapid_development",
    content:
      "Our rapid development approach delivers working AI prototypes in 2-4 weeks. This allows you to validate concepts quickly, demonstrate value to stakeholders, and iterate based on real user feedback before full-scale implementation.",
    keywords: [
      "rapid development",
      "prototype",
      "mvp",
      "fast",
      "quick",
      "development",
      "proof of concept",
    ],
    priority: 8,
    active: true,
  },
  {
    category: "workflow_automation",
    content:
      "We specialize in automating complex business workflows using AI and no-code/low-code solutions. This includes document processing, data analysis, customer service automation, and integrating AI into existing business processes.",
    keywords: [
      "workflow automation",
      "automation",
      "business processes",
      "efficiency",
      "streamline",
    ],
    priority: 8,
    active: true,
  },
  {
    category: "portfolio_businesses",
    content:
      "FIELDPORTER operates portfolio businesses including Family Care (healthcare coordination platform) and self-development tools. This hands-on experience ensures we understand real-world implementation challenges and can provide practical solutions.",
    keywords: [
      "portfolio",
      "family care",
      "healthcare",
      "platform",
      "experience",
      "real world",
    ],
    priority: 6,
    active: true,
  },
];

export async function initializeKnowledgeBase() {
  console.log("🚀 Initializing FIELDPORTER AI Knowledge Base...");
  console.log(
    "📊 Total knowledge items to create:",
    FIELDPORTER_KNOWLEDGE_BASE.length,
  );

  try {
    const knowledgeRef = collection(db, "ai_knowledge_base");

    // Check if knowledge base already exists
    console.log("🔍 Checking for existing knowledge base...");
    const existingQuery = query(knowledgeRef, where("active", "==", true));
    const existingDocs = await getDocs(existingQuery);

    if (!existingDocs.empty) {
      console.log(
        `✅ Knowledge base already exists with ${existingDocs.size} entries`,
      );
      console.log("📋 Existing entries:");
      existingDocs.forEach((doc) => {
        const data = doc.data();
        console.log(
          `   - ${data.category}: ${data.content.substring(0, 80)}...`,
        );
      });
    }

    // Add knowledge base items
    console.log("📝 Adding knowledge base entries...");
    let addedCount = 0;
    let skippedCount = 0;

    for (const item of FIELDPORTER_KNOWLEDGE_BASE) {
      try {
        // Check if this category already exists
        const existingCategoryQuery = query(
          knowledgeRef,
          where("category", "==", item.category),
          where("active", "==", true),
        );
        const existingCategory = await getDocs(existingCategoryQuery);

        if (existingCategory.empty) {
          await addDoc(knowledgeRef, {
            ...item,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
          });
          addedCount++;
          console.log(`   ✅ Added: ${item.category}`);
        } else {
          skippedCount++;
          console.log(`   ⏭️  Skipped (exists): ${item.category}`);
        }
      } catch (error) {
        console.error(`   ❌ Failed to add ${item.category}:`, error.message);
      }
    }

    console.log(`\n🎉 Knowledge base initialization complete!`);
    console.log(`   📈 Added: ${addedCount} new entries`);
    console.log(`   ⏭️  Skipped: ${skippedCount} existing entries`);
    console.log(`   📊 Total: ${addedCount + skippedCount} entries`);

    console.log("\n📚 FIELDPORTER Knowledge Base Categories:");
    console.log("   🎯 Core Services");
    console.log("   🏢 Company Background");
    console.log("   🔄 5-Phase Process");
    console.log("   🏭 Industry Focus");
    console.log("   🛠️  Technology Stack");
    console.log("   📈 Results & ROI");
    console.log("   🚀 Getting Started");
    console.log("   📞 Contact Process");
    console.log("   🎪 Portfolio Businesses");

    console.log(
      "\n✨ Your AI chatbot now has comprehensive FIELDPORTER knowledge!",
    );

    return { success: true, addedCount, skippedCount };
  } catch (error) {
    console.error("❌ Error initializing knowledge base:", error);
    return { success: false, error: error.message };
  }
}
