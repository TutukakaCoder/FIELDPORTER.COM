/**
 * Firebase Knowledge Base Initialization Script
 * Run this once to populate the ai_knowledge_base collection
 *
 * Usage: node scripts/initialize-knowledge-base.js
 */

const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: "fieldporter-website",
  });
}

const db = admin.firestore();

const KNOWLEDGE_BASE_ITEMS = [
  {
    category: "services",
    content:
      "FIELDPORTER offers four core services: Strategic Research Intelligence (AI-powered market analysis delivering insights 78% faster), Rapid AI Development (MVPs in 2-4 weeks), Workflow Optimization (70-90% time savings on manual tasks), and AI Training & Implementation (hands-on team enablement)",
    keywords: ["services", "offerings", "what do you do", "help", "solutions"],
    priority: 10,
    active: true,
  },
  {
    category: "about",
    content:
      "FIELDPORTER bridges strategy and implementation. We're operators who build AI solutions, not just consultants. Founded by Frederick Hopkins, we test every strategy in our own portfolio businesses before recommending to clients.",
    keywords: [
      "about",
      "who are you",
      "fieldporter",
      "company",
      "frederick hopkins",
    ],
    priority: 9,
    active: true,
  },
  {
    category: "process",
    content:
      "Our 5-phase approach: 1) Discovery - understand your specific challenges, 2) Strategy - design AI-powered solutions, 3) Prototype - rapid validation (1-2 weeks), 4) Implementation - full deployment with your team, 5) Enablement - training for long-term success",
    keywords: [
      "process",
      "how do you work",
      "methodology",
      "approach",
      "phases",
    ],
    priority: 8,
    active: true,
  },
  {
    category: "industries",
    content:
      "We work across industries including construction, professional services, SaaS, and venture capital. Our AI solutions adapt to your specific sector needs - from automating construction estimates to enhancing VC due diligence.",
    keywords: [
      "industries",
      "construction",
      "saas",
      "venture capital",
      "sectors",
      "vc",
    ],
    priority: 7,
    active: true,
  },
  {
    category: "technology",
    content:
      "We leverage cutting-edge AI tools including DeepSeek for cost-effective processing, Claude for complex reasoning, custom API integrations for automation, and React/Next.js development. Everything cloud-native, scalable, and production-ready.",
    keywords: [
      "technology",
      "tools",
      "ai",
      "stack",
      "deepseek",
      "claude",
      "automation",
    ],
    priority: 6,
    active: true,
  },
  {
    category: "results",
    content:
      "Our clients typically see 70-90% reduction in manual processing time, 3.5-8X ROI on AI investments, and 78% faster strategic insights. Real example: 360,000 hours saved annually through automated document processing.",
    keywords: [
      "results",
      "roi",
      "success",
      "metrics",
      "savings",
      "case studies",
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
    ],
    priority: 10,
    active: true,
  },
];

async function initializeKnowledgeBase() {
  try {
    console.log("🔄 Initializing FIELDPORTER AI Knowledge Base...");

    const knowledgeRef = db.collection("ai_knowledge_base");

    // Check if knowledge base already exists
    const existingDocs = await knowledgeRef.where("active", "==", true).get();

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
      return;
    }

    // Add knowledge base items
    console.log("📝 Adding knowledge base entries...");
    let addedCount = 0;

    for (const item of KNOWLEDGE_BASE_ITEMS) {
      await knowledgeRef.add({
        ...item,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      });
      addedCount++;
      console.log(`   ✓ Added: ${item.category}`);
    }

    console.log(
      `\n🎉 Successfully initialized knowledge base with ${addedCount} entries!`,
    );
    console.log("\n📊 Knowledge Base Summary:");
    console.log("   - Services & Offerings");
    console.log("   - Company Background");
    console.log("   - Process & Methodology");
    console.log("   - Industry Focus");
    console.log("   - Technology Stack");
    console.log("   - Results & ROI");
    console.log("   - Getting Started");
    console.log("   - Contact Information");

    console.log("\n🚀 Your AI chatbot is now ready with enhanced knowledge!");
  } catch (error) {
    console.error("❌ Error initializing knowledge base:", error);
    process.exit(1);
  }
}

// Run the initialization
initializeKnowledgeBase()
  .then(() => {
    console.log("\n✨ Knowledge base initialization complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Initialization failed:", error);
    process.exit(1);
  });
