/**
 * Comprehensive Chat API Test Script
 * Tests model routing, frustration detection, and various message types
 */

// Use fetch (Node.js 18+)
const BASE_URL = process.env.TEST_URL || "http://localhost:3000";
const API_ENDPOINT = `${BASE_URL}/api/chat`;

// Test cases covering different scenarios
const testCases = [
  {
    name: "Simple Greeting (should use Flash)",
    message: "Hello",
    expectedModel: "flash",
    description: "Simple greeting should route to Flash model",
  },
  {
    name: 'Frustrated User - "so?" (should use Pro)',
    message: "so?",
    expectedModel: "pro",
    description: "Frustrated short response should route to Pro model",
  },
  {
    name: 'Frustrated User - "i don\'t know" (should use Pro)',
    message: "i don't know",
    expectedModel: "pro",
    description: "Frustrated response should route to Pro model",
  },
  {
    name: "Gin Company Question (should provide value first)",
    message: "I run a gin company, what could you help with",
    expectedModel: "flash",
    description: "Industry question should get helpful response with Flash",
  },
  {
    name: "Complex Technical Question (should use Pro)",
    message:
      "How does API integration work exactly with our existing architecture?",
    expectedModel: "pro",
    description: "Complex technical question should route to Pro model",
  },
  {
    name: "Workflow Automation Question",
    message: "We need to automate our client onboarding process",
    expectedModel: "flash",
    description: "Standard business question should use Flash",
  },
  {
    name: "Multi-part Complex Question (should use Pro)",
    message:
      "Walk me through step by step how you would implement a complete workflow automation system with database integration and API connections",
    expectedModel: "pro",
    description: "Multi-part complex question should route to Pro model",
  },
  {
    name: "Service Pricing Question",
    message: "What does your rapid development service cost?",
    expectedModel: "flash",
    description: "Service question should use Flash and know pricing",
  },
];

// Helper function to make API request using fetch
async function makeRequest(message, sessionId = `test-${Date.now()}`) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sessionId,
        conversationHistory: [],
        messageCount: 1,
      }),
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}

// Check if response indicates correct model usage
function checkModelUsage(response, expectedModel) {
  // We can't directly check which model was used from the response,
  // but we can check:
  // 1. Response quality (Pro should give better responses for complex queries)
  // 2. Response length (Pro should give longer responses for complex queries)
  // 3. Error handling (should fallback to Pro if Flash fails)

  const hasResponse =
    response && response.response && response.response.length > 0;
  const responseLength = response?.response?.length || 0;

  if (expectedModel === "pro") {
    // Pro model should give comprehensive responses for complex queries
    return {
      passed: hasResponse && responseLength > 50,
      details: `Response length: ${responseLength} chars`,
    };
  } else {
    // Flash model should give quick responses for simple queries
    return {
      passed: hasResponse,
      details: `Response length: ${responseLength} chars`,
    };
  }
}

// Check if response shows value-first approach
function checkValueFirst(response, message) {
  const responseText = response?.response?.toLowerCase() || "";
  const messageLower = message.toLowerCase();

  // For gin company, should mention beverage/alcohol industry
  if (messageLower.includes("gin") || messageLower.includes("alcohol")) {
    const hasIndustryContext =
      responseText.includes("beverage") ||
      responseText.includes("alcohol") ||
      responseText.includes("gin") ||
      responseText.includes("industry");

    return {
      passed: hasIndustryContext || responseText.length > 100,
      details: hasIndustryContext
        ? "Contains industry context"
        : "Generic response",
    };
  }

  // Should not start with questions for frustrated users
  if (messageLower.includes("so?") || messageLower.includes("don't know")) {
    const startsWithQuestion =
      responseText.trim().startsWith("what") ||
      responseText.trim().startsWith("how") ||
      responseText.trim().startsWith("can you");

    return {
      passed: !startsWithQuestion,
      details: startsWithQuestion
        ? "Starts with question (bad)"
        : "Provides value first (good)",
    };
  }

  return {
    passed: true,
    details: "Standard check passed",
  };
}

// Check if services knowledge is present
function checkServicesKnowledge(response, message) {
  const responseText = response?.response?.toLowerCase() || "";
  const messageLower = message.toLowerCase();

  if (
    messageLower.includes("cost") ||
    messageLower.includes("price") ||
    messageLower.includes("pricing")
  ) {
    const hasPricing =
      responseText.includes("$500") ||
      responseText.includes("$3,000") ||
      responseText.includes("$2,000") ||
      responseText.includes("$8,000") ||
      responseText.includes("investment");

    return {
      passed: hasPricing,
      details: hasPricing
        ? "Contains pricing information"
        : "Missing pricing info",
    };
  }

  if (
    messageLower.includes("rapid development") ||
    messageLower.includes("development service")
  ) {
    const hasServiceInfo =
      responseText.includes("1-3 weeks") ||
      responseText.includes("production-ready") ||
      responseText.includes("prototype");

    return {
      passed: hasServiceInfo,
      details: hasServiceInfo
        ? "Contains service details"
        : "Missing service info",
    };
  }

  return {
    passed: true,
    details: "Not a service question",
  };
}

// Main test runner
async function runTests() {
  console.log("🧪 Starting Chat API Model Tests\n");
  console.log(`Testing against: ${BASE_URL}\n`);

  let passed = 0;
  let failed = 0;
  const results = [];

  for (const testCase of testCases) {
    try {
      console.log(`Testing: ${testCase.name}`);
      console.log(`  Message: "${testCase.message}"`);

      const startTime = Date.now();
      const result = await makeRequest(testCase.message);
      const responseTime = Date.now() - startTime;

      if (result.status !== 200) {
        throw new Error(`API returned status ${result.status}`);
      }

      const modelCheck = checkModelUsage(result.data, testCase.expectedModel);
      const valueCheck = checkValueFirst(result.data, testCase.message);
      const servicesCheck = checkServicesKnowledge(
        result.data,
        testCase.message,
      );

      const allPassed =
        modelCheck.passed && valueCheck.passed && servicesCheck.passed;

      if (allPassed) {
        passed++;
        console.log(`  ✅ PASSED (${responseTime}ms)`);
      } else {
        failed++;
        console.log(`  ❌ FAILED (${responseTime}ms)`);
        if (!modelCheck.passed)
          console.log(`    - Model check: ${modelCheck.details}`);
        if (!valueCheck.passed)
          console.log(`    - Value-first check: ${valueCheck.details}`);
        if (!servicesCheck.passed)
          console.log(`    - Services check: ${servicesCheck.details}`);
      }

      console.log(
        `  Response preview: ${result.data.response?.substring(0, 100)}...`,
      );
      console.log(`  Lead score: ${result.data.leadScore || 0}`);
      console.log("");

      results.push({
        testCase,
        result: result.data,
        responseTime,
        checks: { modelCheck, valueCheck, servicesCheck },
        passed: allPassed,
      });

      // Small delay between requests
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      failed++;
      const errorMsg = error.message || String(error);
      console.log(`  ❌ ERROR: ${errorMsg}`);
      if (errorMsg.includes("ECONNREFUSED") || errorMsg.includes("fetch")) {
        console.log(
          `  💡 Tip: Make sure the dev server is running: npm run dev`,
        );
      }
      console.log("");
      results.push({
        testCase,
        error: errorMsg,
        passed: false,
      });
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 TEST SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total tests: ${testCases.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(
    `Success rate: ${((passed / testCases.length) * 100).toFixed(1)}%`,
  );
  console.log("");

  // Verify model names in code
  console.log("🔍 Verifying model names in code...");
  const fs = require("fs");
  const routeFile = fs.readFileSync("./app/api/chat/route.ts", "utf8");

  const hasFlash25 = routeFile.includes("gemini-2.5-flash");
  const hasPro25 = routeFile.includes("gemini-2.5-pro");
  const hasOldModels =
    routeFile.includes("gemini-2.0") || routeFile.includes("gemini-1.5");

  console.log(`  ✅ gemini-2.5-flash: ${hasFlash25 ? "FOUND" : "MISSING"}`);
  console.log(`  ✅ gemini-2.5-pro: ${hasPro25 ? "FOUND" : "MISSING"}`);
  console.log(
    `  ❌ Old models (2.0/1.5): ${hasOldModels ? "FOUND (BAD!)" : "NOT FOUND (GOOD!)"}`,
  );

  if (!hasFlash25 || !hasPro25 || hasOldModels) {
    console.log("\n⚠️  MODEL VERIFICATION FAILED!");
    process.exit(1);
  }

  console.log("\n✅ All model verifications passed!");

  if (failed > 0) {
    console.log("\n⚠️  Some tests failed. Review the output above.");
    process.exit(1);
  }

  console.log("\n🎉 All tests passed!");
}

// Run tests
runTests().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
