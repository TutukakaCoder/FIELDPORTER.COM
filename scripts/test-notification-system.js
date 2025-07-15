#!/usr/bin/env node

/**
 * FIELDPORTER Notification System Test
 * Tests the email notification system for qualified leads
 */

const CHAT_API_URL = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/chat`
  : "http://localhost:3000/api/chat";

// Test scenarios that should trigger notifications
const NOTIFICATION_TEST_SCENARIOS = [
  {
    name: "High Lead Score with Email",
    message:
      "I need AI automation for my company with 100+ employees. My email is test@example.com",
    expectedLeadScore: 15, // email (5) + enterprise (3) + automation (3) + scale (3) + technical (2)
    shouldNotify: true,
  },
  {
    name: "Budget Inquiry with Contact",
    message:
      "We have a budget of $50,000 for strategic research. Contact me at test@example.com",
    expectedLeadScore: 14, // email (5) + budget (4) + strategic research (2) + investment (4)
    shouldNotify: true,
  },
  {
    name: "Urgent Project Request",
    message:
      "URGENT: Need AI implementation ASAP for our construction company. Call me at 555-123-4567",
    expectedLeadScore: 12, // phone (4) + urgent (3) + construction (2) + asap (3)
    shouldNotify: true,
  },
  {
    name: "Low Lead Score - No Notification",
    message: "Hi, just browsing",
    expectedLeadScore: 0,
    shouldNotify: false,
  },
];

async function testNotificationScenario(scenario) {
  console.log(`\n🧪 Testing: ${scenario.name}`);
  console.log(`📤 Message: ${scenario.message}`);
  console.log(`🎯 Expected Lead Score: ${scenario.expectedLeadScore}`);
  console.log(`📧 Should Notify: ${scenario.shouldNotify ? "Yes" : "No"}`);

  try {
    const startTime = Date.now();

    const response = await fetch(CHAT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: scenario.message,
        sessionId: `notification_test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        messageCount: 1,
      }),
    });

    const responseTime = Date.now() - startTime;

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!data.response || typeof data.response !== "string") {
      throw new Error("Invalid response structure");
    }

    // Check if notification was triggered
    const actualLeadScore = data.leadScore || 0;
    const actualShouldNotify = data.shouldNotify || false;
    const hasEmail = data.userEmail || false;
    const hasPhone = data.userPhone || false;

    console.log(`✅ Response received in ${responseTime}ms`);
    console.log(`📊 Actual Lead Score: ${actualLeadScore}`);
    console.log(`📧 Actual Should Notify: ${actualShouldNotify}`);
    console.log(`📧 Email Extracted: ${hasEmail || "None"}`);
    console.log(`📱 Phone Extracted: ${hasPhone || "None"}`);

    // Validate results
    const scoreMatch =
      Math.abs(actualLeadScore - scenario.expectedLeadScore) <= 2;
    const notificationMatch = actualShouldNotify === scenario.shouldNotify;

    if (scoreMatch && notificationMatch) {
      console.log(
        `✅ PASS: Lead score and notification logic working correctly`,
      );
      return { success: true, responseTime };
    } else {
      console.log(`❌ FAIL: Score or notification logic mismatch`);
      console.log(
        `   Expected Score: ${scenario.expectedLeadScore}, Got: ${actualLeadScore}`,
      );
      console.log(
        `   Expected Notify: ${scenario.shouldNotify}, Got: ${actualShouldNotify}`,
      );
      return { success: false, error: "Score or notification mismatch" };
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runNotificationTests() {
  console.log("🚀 Starting FIELDPORTER Notification System Tests");
  console.log("=".repeat(60));

  const results = [];
  let passed = 0;
  let failed = 0;

  for (const scenario of NOTIFICATION_TEST_SCENARIOS) {
    const result = await testNotificationScenario(scenario);
    results.push({ scenario: scenario.name, ...result });

    if (result.success) {
      passed++;
    } else {
      failed++;
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 NOTIFICATION SYSTEM TEST RESULTS");
  console.log("=".repeat(60));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(
    `📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`,
  );

  if (failed === 0) {
    console.log(
      "\n🎉 All notification tests passed! Email notifications should be working.",
    );
    console.log("📧 Check freddy@fieldporter.com for test notifications.");
  } else {
    console.log(
      "\n⚠️ Some tests failed. Check the notification system configuration.",
    );
  }

  return { passed, failed, results };
}

// Run tests if called directly
if (require.main === module) {
  runNotificationTests()
    .then(() => {
      console.log("\n✅ Notification system test completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Test failed:", error);
      process.exit(1);
    });
}

module.exports = { runNotificationTests };
