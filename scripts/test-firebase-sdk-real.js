/**
 * Real Firebase SDK Test - Tests actual API calls
 */

const BASE_URL = "http://localhost:3000";

async function testFirebaseSDK() {
  console.log("🧪 Testing Firebase SDK Integration\n");
  console.log(`Testing: ${BASE_URL}/api/chat\n`);

  const testMessages = [
    {
      name: "Simple Greeting (Flash)",
      message: "Hello",
      expectModel: "flash",
    },
    {
      name: "Frustrated User (Pro)",
      message: "so?",
      expectModel: "pro",
    },
    {
      name: "Gin Company Question",
      message: "I run a gin company, what could you help with",
      expectModel: "flash",
    },
    {
      name: "Complex Technical (Pro)",
      message:
        "How does API integration work exactly with our existing architecture?",
      expectModel: "pro",
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of testMessages) {
    try {
      console.log(`\n📤 Testing: ${test.name}`);
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
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.response || typeof data.response !== "string") {
        throw new Error("Invalid response format");
      }

      console.log(`   ✅ Response received (${responseTime}ms)`);
      console.log(`   📝 Response length: ${data.response.length} chars`);
      console.log(`   📊 Lead score: ${data.leadScore || 0}`);
      console.log(`   💬 Preview: ${data.response.substring(0, 150)}...`);

      // Check response quality
      if (data.response.length < 10) {
        console.log(`   ⚠️  Response too short`);
        failed++;
      } else {
        passed++;
      }

      // Small delay between requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      failed++;
      const errorMsg = error.message || String(error);
      console.log(`   ❌ ERROR: ${errorMsg}`);

      if (
        errorMsg.includes("ECONNREFUSED") ||
        errorMsg.includes("fetch failed")
      ) {
        console.log(`   💡 Server not running. Start with: npm run dev`);
      }
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("📊 TEST RESULTS");
  console.log("=".repeat(60));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(
    `Success rate: ${((passed / testMessages.length) * 100).toFixed(1)}%`,
  );

  if (failed > 0) {
    console.log(
      "\n⚠️  Some tests failed. Check server logs for Firebase SDK errors.",
    );
    process.exit(1);
  }

  console.log("\n🎉 All Firebase SDK tests passed!");
}

// Run test
testFirebaseSDK().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
