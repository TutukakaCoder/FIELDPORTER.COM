/**
 * REAL Firebase SDK Test - Makes actual API calls to test Firebase integration
 *
 * Prerequisites:
 * 1. Firebase AI Logic must be enabled in Firebase Console
 * 2. Dev server must be running: npm run dev
 * 3. Run this script: node scripts/test-firebase-real-api.js
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

async function testRealFirebaseSDK() {
  console.log("🧪 REAL Firebase SDK API Test\n");
  console.log(
    "⚠️  This test makes actual API calls to Firebase AI Logic SDK\n",
  );
  console.log(`Testing endpoint: ${BASE_URL}/api/chat\n`);

  const tests = [
    {
      name: "Health Check",
      message: "health_check",
      expectResponse: true,
    },
    {
      name: "Simple Query (should use Flash)",
      message: "Hello",
      expectModel: "flash",
      checkResponse: (r) => r.length > 10,
    },
    {
      name: "Frustrated User (should use Pro)",
      message: "so?",
      expectModel: "pro",
      checkResponse: (r) =>
        r.length > 50 && !r.toLowerCase().startsWith("what"),
    },
    {
      name: "Gin Company (value-first response)",
      message: "I run a gin company, what could you help with",
      expectModel: "flash",
      checkResponse: (r) => {
        const lower = r.toLowerCase();
        return (
          (lower.includes("gin") ||
            lower.includes("beverage") ||
            lower.includes("alcohol") ||
            lower.includes("company")) &&
          r.length > 100
        );
      },
    },
    {
      name: "Complex Technical (should use Pro)",
      message:
        "How does API integration work exactly with our existing architecture?",
      expectModel: "pro",
      checkResponse: (r) => r.length > 150,
    },
    {
      name: "Service Pricing Question",
      message: "What does your rapid development service cost?",
      expectModel: "flash",
      checkResponse: (r) => {
        const lower = r.toLowerCase();
        return (
          lower.includes("$3,000") ||
          lower.includes("$3000") ||
          lower.includes("$8,000") ||
          lower.includes("investment") ||
          lower.includes("cost")
        );
      },
    },
  ];

  let passed = 0;
  let failed = 0;
  const results = [];

  for (const test of tests) {
    try {
      console.log(`\n📤 Test: ${test.name}`);
      console.log(`   Message: "${test.message}"`);

      const startTime = Date.now();
      const response = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: test.message,
          sessionId: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          conversationHistory: [],
          messageCount: 1,
        }),
      });

      const responseTime = Date.now() - startTime;

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();

      if (!data.response) {
        throw new Error("No response field in API response");
      }

      const responseText = data.response;
      const responseLength = responseText.length;

      console.log(`   ✅ API call successful (${responseTime}ms)`);
      console.log(`   📝 Response length: ${responseLength} chars`);
      console.log(`   📊 Lead score: ${data.leadScore || 0}`);
      console.log(
        `   💬 Response preview: ${responseText.substring(0, 120)}...`,
      );

      // Check if response looks like a real AI response (not fallback)
      const isFallback =
        responseText.includes("technical issue") &&
        responseText.includes("time-waster");
      if (isFallback && test.message !== "health_check") {
        console.log(
          `   ⚠️  WARNING: Response looks like fallback, not real Firebase SDK response`,
        );
        console.log(
          `   💡 Check: Is Firebase AI Logic enabled in Firebase Console?`,
        );
      }

      // Run custom checks if provided
      let testPassed = true;
      if (test.checkResponse) {
        testPassed = test.checkResponse(responseText);
        if (!testPassed) {
          console.log(`   ⚠️  Response check failed`);
        }
      }

      if (testPassed && !isFallback) {
        passed++;
        console.log(`   ✅ Test passed`);
      } else {
        failed++;
        console.log(`   ❌ Test failed`);
      }

      results.push({
        test: test.name,
        passed: testPassed && !isFallback,
        responseTime,
        responseLength,
        isFallback,
        response: responseText.substring(0, 200),
      });

      // Delay between requests
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      failed++;
      const errorMsg = error.message || String(error);
      console.log(`   ❌ ERROR: ${errorMsg}`);

      if (
        errorMsg.includes("ECONNREFUSED") ||
        errorMsg.includes("fetch failed")
      ) {
        console.log(`   💡 Server not running. Start with: npm run dev`);
      } else if (
        errorMsg.includes("401") ||
        errorMsg.includes("403") ||
        errorMsg.includes("permission")
      ) {
        console.log(
          `   💡 Firebase AI Logic may not be enabled. Check Firebase Console.`,
        );
      }

      results.push({
        test: test.name,
        passed: false,
        error: errorMsg,
      });
    }
  }

  // Summary
  console.log("\n" + "=".repeat(70));
  console.log("📊 REAL FIREBASE SDK TEST RESULTS");
  console.log("=".repeat(70));
  console.log(`Total tests: ${tests.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success rate: ${((passed / tests.length) * 100).toFixed(1)}%`);

  // Check for fallback responses
  const fallbackCount = results.filter((r) => r.isFallback).length;
  if (fallbackCount > 0) {
    console.log(
      `\n⚠️  ${fallbackCount} responses appear to be fallbacks (not real Firebase SDK responses)`,
    );
    console.log(
      `   This suggests Firebase AI Logic may not be enabled in Firebase Console.`,
    );
    console.log(
      `   Check: https://console.firebase.google.com/project/fieldporter-website`,
    );
  }

  // Response time analysis
  const successfulTests = results.filter((r) => r.passed && r.responseTime);
  if (successfulTests.length > 0) {
    const avgTime =
      successfulTests.reduce((sum, r) => sum + r.responseTime, 0) /
      successfulTests.length;
    console.log(`\n⏱️  Average response time: ${avgTime.toFixed(0)}ms`);

    if (avgTime > 10000) {
      console.log(
        `   ⚠️  Response times are slow - may indicate Firebase SDK issues`,
      );
    } else if (avgTime < 3000) {
      console.log(`   ✅ Response times are good`);
    }
  }

  console.log("\n" + "=".repeat(70));

  if (failed === 0 && fallbackCount === 0) {
    console.log("🎉 All tests passed! Firebase SDK is working correctly.");
    process.exit(0);
  } else if (fallbackCount > 0) {
    console.log("⚠️  Tests completed but responses appear to be fallbacks.");
    console.log(
      "   Enable Firebase AI Logic in Firebase Console to get real responses.",
    );
    process.exit(1);
  } else {
    console.log("⚠️  Some tests failed. Review errors above.");
    process.exit(1);
  }
}

// Run test
testRealFirebaseSDK().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
