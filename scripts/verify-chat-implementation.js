/**
 * Code Verification Script
 * Verifies model usage and implementation without requiring server
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Verifying Chat API Implementation\n");

const routeFile = path.join(__dirname, "../app/api/chat/route.ts");
const code = fs.readFileSync(routeFile, "utf8");

// Check 1: Model names
console.log("1. Model Name Verification:");
const hasFlash25 = code.includes("gemini-2.5-flash");
const hasPro25 = code.includes("gemini-2.5-pro");
const hasOldFlash = code.includes("gemini-2.0-flash");
const hasOldPro = code.includes("gemini-1.5-pro");

console.log(`   ✅ gemini-2.5-flash: ${hasFlash25 ? "FOUND" : "❌ MISSING"}`);
console.log(`   ✅ gemini-2.5-pro: ${hasPro25 ? "FOUND" : "❌ MISSING"}`);
console.log(
  `   ❌ gemini-2.0-flash: ${hasOldFlash ? "FOUND (BAD!)" : "NOT FOUND (GOOD!)"}`,
);
console.log(
  `   ❌ gemini-1.5-pro: ${hasOldPro ? "FOUND (BAD!)" : "NOT FOUND (GOOD!)"}`,
);

if (!hasFlash25 || !hasPro25 || hasOldFlash || hasOldPro) {
  console.log("\n❌ MODEL VERIFICATION FAILED!");
  process.exit(1);
}

// Check 2: Complexity detection
console.log("\n2. Complexity Detection Features:");
const hasFrustrationDetection =
  code.includes("frustrationLevel") && code.includes("userFrustrationLevel");
const hasRequiresProModel = code.includes("requiresProModel");
const hasSentimentAnalysis = code.includes("BusinessIntelligenceAnalyzer");

console.log(
  `   ✅ Frustration detection: ${hasFrustrationDetection ? "FOUND" : "❌ MISSING"}`,
);
console.log(
  `   ✅ Pro model routing flag: ${hasRequiresProModel ? "FOUND" : "❌ MISSING"}`,
);
console.log(
  `   ✅ Sentiment analysis integration: ${hasSentimentAnalysis ? "FOUND" : "❌ MISSING"}`,
);

// Check 3: Token limits
console.log("\n3. Token Limits:");
// Find token values - check for exact values including ternary expressions
const has75 = code.includes("maxTokens: 75") || code.match(/maxTokens:\s*75/);
const has300 =
  code.includes("maxTokens: 300") || code.match(/maxTokens:\s*300/);
const has600 =
  code.includes("maxTokens: 600") ||
  code.includes("? 1000 : 600") ||
  code.match(/maxTokens:\s*600/);
const has1000 =
  code.includes("maxTokens: 1000") ||
  code.includes("? 1000 : 600") ||
  code.match(/maxTokens:\s*1000/);

const tokenLimits = {
  quick: has75 ? 75 : null,
  standard: has300 ? 300 : null,
  detailed: has600 ? 600 : null,
  complex: has1000 ? 1000 : null,
};

console.log(
  `   Quick: ${tokenLimits.quick ? tokenLimits.quick + " tokens ✅" : "❌ NOT FOUND"}`,
);
console.log(
  `   Standard: ${tokenLimits.standard ? tokenLimits.standard + " tokens ✅" : "❌ NOT FOUND"} (expected: 300)`,
);
console.log(
  `   Detailed: ${tokenLimits.detailed ? tokenLimits.detailed + " tokens ✅" : "❌ NOT FOUND"} (expected: 600)`,
);
console.log(
  `   Complex: ${tokenLimits.complex ? tokenLimits.complex + " tokens ✅" : "❌ NOT FOUND"} (expected: 1000)`,
);

// Check 4: System prompt improvements
console.log("\n4. System Prompt Features:");
const hasValueFirst =
  code.includes("VALUE-FIRST") || code.includes("Lead with value");
const hasFrustrationHandling =
  code.includes("HANDLE FRUSTRATION") || code.includes("frustration");
const hasServicesContent =
  code.includes("Strategic Research & Intelligence") &&
  code.includes("$500-$3,000");
const hasNoRigidPhases =
  !code.includes("PHASE 1 - DIAGNOSE") || code.includes("Remove rigid phase");

console.log(
  `   ✅ Value-first approach: ${hasValueFirst ? "FOUND" : "❌ MISSING"}`,
);
console.log(
  `   ✅ Frustration handling: ${hasFrustrationHandling ? "FOUND" : "❌ MISSING"}`,
);
console.log(
  `   ✅ Services content: ${hasServicesContent ? "FOUND" : "❌ MISSING"}`,
);
console.log(
  `   ✅ No rigid phases: ${hasNoRigidPhases ? "FOUND" : "❌ MISSING"}`,
);

// Check 5: Error handling
console.log("\n5. Error Handling:");
const hasContextAwareFallback = code.includes("getContextAwareFallback");
const hasProRetry = code.includes(
  "Switching to gemini-2.5-pro after Flash failure",
);

console.log(
  `   ✅ Context-aware fallback: ${hasContextAwareFallback ? "FOUND" : "❌ MISSING"}`,
);
console.log(`   ✅ Pro model retry: ${hasProRetry ? "FOUND" : "❌ MISSING"}`);

// Check 6: Conversation state tracking
console.log("\n6. Conversation State Tracking:");
const hasDynamicPrompt =
  code.includes("extractSystemPrompt") && code.includes("messageCount");
const hasEngagementTracking =
  code.includes("engagement") || code.includes("messageCount");

console.log(
  `   ✅ Dynamic prompt adjustment: ${hasDynamicPrompt ? "FOUND" : "❌ MISSING"}`,
);
console.log(
  `   ✅ Engagement tracking: ${hasEngagementTracking ? "FOUND" : "❌ MISSING"}`,
);

// Summary
console.log("\n" + "=".repeat(60));
console.log("📊 VERIFICATION SUMMARY");
console.log("=".repeat(60));

const allChecks = [
  hasFlash25 && hasPro25 && !hasOldFlash && !hasOldPro,
  hasFrustrationDetection && hasRequiresProModel && hasSentimentAnalysis,
  tokenLimits.standard && tokenLimits.standard >= 300,
  tokenLimits.detailed && tokenLimits.detailed >= 600,
  tokenLimits.complex && tokenLimits.complex >= 1000,
  hasValueFirst && hasFrustrationHandling && hasServicesContent,
  hasContextAwareFallback && hasProRetry,
  hasDynamicPrompt && hasEngagementTracking,
];

const passed = allChecks.filter(Boolean).length;
const total = allChecks.length;

console.log(`\n✅ Passed: ${passed}/${total} verification checks`);

if (passed === total) {
  console.log("\n🎉 All code verifications passed!");
  console.log("\n💡 To test with live server:");
  console.log("   1. Start dev server: npm run dev");
  console.log("   2. Run tests: node scripts/test-chat-models.js");
  process.exit(0);
} else {
  console.log("\n⚠️  Some verifications failed. Review the output above.");
  process.exit(1);
}
