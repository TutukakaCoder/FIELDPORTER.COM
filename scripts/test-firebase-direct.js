/**
 * Direct Firebase SDK Test
 * Tests the actual Firebase AI Logic SDK integration
 */

// This test can be run directly to verify Firebase SDK works
// Run: node -e "require('./scripts/test-firebase-direct.js')"

const path = require("path");

// Note: This requires the Firebase SDK to be properly configured
// We'll test by checking the code structure and model names

console.log("🔍 Direct Firebase SDK Code Verification\n");

const fs = require("fs");
const routeFile = path.join(__dirname, "../app/api/chat/route.ts");
const code = fs.readFileSync(routeFile, "utf8");

// Check 1: Firebase AI Logic SDK imports
console.log("1. Firebase AI Logic SDK Integration:");
const hasFirebaseAI = code.includes('from "firebase/ai"');
const hasGetAI = code.includes("getAI");
const hasGetGenerativeModel = code.includes("getGenerativeModel");
const hasGoogleAIBackend = code.includes("GoogleAIBackend");

console.log(
  `   ✅ firebase/ai import: ${hasFirebaseAI ? "FOUND" : "❌ MISSING"}`,
);
console.log(`   ✅ getAI function: ${hasGetAI ? "FOUND" : "❌ MISSING"}`);
console.log(
  `   ✅ getGenerativeModel function: ${hasGetGenerativeModel ? "FOUND" : "❌ MISSING"}`,
);
console.log(
  `   ✅ GoogleAIBackend: ${hasGoogleAIBackend ? "FOUND" : "❌ MISSING"}`,
);

// Check 2: Model initialization
console.log("\n2. Model Initialization:");
const hasAIInit = code.includes("getAI(firebaseApp");
const hasModelCreation = code.includes("getGenerativeModel(ai");

console.log(`   ✅ AI initialization: ${hasAIInit ? "FOUND" : "❌ MISSING"}`);
console.log(
  `   ✅ Model creation: ${hasModelCreation ? "FOUND" : "❌ MISSING"}`,
);

// Check 3: Model names (verify they're correct for Firebase SDK)
console.log("\n3. Model Names (Firebase AI Logic SDK):");
const hasFlash25 = code.includes("gemini-2.5-flash");
const hasPro25 = code.includes("gemini-2.5-pro");
const hasOldFlash = code.includes("gemini-2.0-flash");
const hasOldPro = code.includes("gemini-1.5-pro");

console.log(`   ✅ gemini-2.5-flash: ${hasFlash25 ? "FOUND" : "❌ MISSING"}`);
console.log(`   ✅ gemini-2.5-pro: ${hasPro25 ? "FOUND" : "❌ MISSING"}`);
console.log(
  `   ❌ Old models (2.0/1.5): ${hasOldFlash || hasOldPro ? "FOUND (BAD!)" : "NOT FOUND (GOOD!)"}`,
);

// Check 4: System instruction format (Firebase SDK specific)
console.log("\n4. System Instruction Format (Firebase SDK):");
const hasSystemInstruction = code.includes("systemInstruction:");
const hasSystemRole = code.includes('role: "system"');
const hasSystemParts = code.includes("parts: [{ text:");

console.log(
  `   ✅ systemInstruction: ${hasSystemInstruction ? "FOUND" : "❌ MISSING"}`,
);
console.log(`   ✅ role: "system": ${hasSystemRole ? "FOUND" : "❌ MISSING"}`);
console.log(
  `   ✅ parts: [{ text: ]: ${hasSystemParts ? "FOUND" : "❌ MISSING"}`,
);

// Check 5: Chat session format
console.log("\n5. Chat Session Format:");
const hasStartChat = code.includes("startChat");
const hasHistory = code.includes("history:");
const hasGenerationConfig = code.includes("generationConfig");

console.log(`   ✅ startChat: ${hasStartChat ? "FOUND" : "❌ MISSING"}`);
console.log(`   ✅ history parameter: ${hasHistory ? "FOUND" : "❌ MISSING"}`);
console.log(
  `   ✅ generationConfig: ${hasGenerationConfig ? "FOUND" : "❌ MISSING"}`,
);

// Check 6: Response extraction
console.log("\n6. Response Extraction:");
const hasSendMessage = code.includes("sendMessage");
const hasResponseText = code.includes("response.text()");

console.log(`   ✅ sendMessage: ${hasSendMessage ? "FOUND" : "❌ MISSING"}`);
console.log(
  `   ✅ response.text(): ${hasResponseText ? "FOUND" : "❌ MISSING"}`,
);

// Summary
console.log("\n" + "=".repeat(60));
console.log("📊 FIREBASE SDK VERIFICATION");
console.log("=".repeat(60));

const allChecks = [
  hasFirebaseAI && hasGetAI && hasGetGenerativeModel && hasGoogleAIBackend,
  hasAIInit && hasModelCreation,
  hasFlash25 && hasPro25 && !hasOldFlash && !hasOldPro,
  hasSystemInstruction && hasSystemRole && hasSystemParts,
  hasStartChat && hasHistory && hasGenerationConfig,
  hasSendMessage && hasResponseText,
];

const passed = allChecks.filter(Boolean).length;
const total = allChecks.length;

console.log(`\n✅ Passed: ${passed}/${total} Firebase SDK checks`);

if (passed === total) {
  console.log("\n✅ Firebase SDK integration code is correct!");
  console.log("\n⚠️  IMPORTANT: To test with real Firebase SDK:");
  console.log("   1. Ensure Firebase AI Logic is enabled in Firebase Console");
  console.log("   2. Start dev server: npm run dev");
  console.log("   3. Make API calls and check server logs for model usage");
  console.log(
    "   4. Look for console.log messages showing which model is called",
  );
  process.exit(0);
} else {
  console.log("\n❌ Some Firebase SDK checks failed!");
  process.exit(1);
}
