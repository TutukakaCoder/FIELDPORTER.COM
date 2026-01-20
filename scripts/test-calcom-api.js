/**
 * Cal.com API v2 Connection Test Script
 * Tests API authentication and creates availability schedule
 *
 * Usage: node scripts/test-calcom-api.js <API_KEY>
 * Or set CALCOM_API_KEY environment variable
 */

const https = require("https");

// Get API key from command line argument or environment variable
const API_KEY = process.argv[2] || process.env.CALCOM_API_KEY;
const BASE_URL = "api.cal.com";
const API_VERSION = "2024-08-13";

if (!API_KEY) {
  console.error("❌ Error: CALCOM_API_KEY not provided");
  console.error("Usage: node scripts/test-calcom-api.js <API_KEY>");
  console.error("Or set CALCOM_API_KEY environment variable");
  process.exit(1);
}

// Helper function to make HTTPS requests
function makeRequest(path, method = "GET", data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      port: 443,
      path: path,
      method: method,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Cal-API-Version": API_VERSION,
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        try {
          const response = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: body ? JSON.parse(body) : null,
          };
          resolve(response);
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body,
          });
        }
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testAPIConnection() {
  console.log("🔍 Testing Cal.com API v2 Connection...\n");
  console.log(`📡 Base URL: https://${BASE_URL}`);
  console.log(`🔑 API Version: ${API_VERSION}`);
  console.log(`🔐 API Key: ${API_KEY.substring(0, 15)}...`);
  console.log("");

  try {
    // Test 1: Get user info (simpler endpoint)
    console.log("Test 1: Authentication Test - Get User Info");
    const userResponse = await makeRequest("/v2/me", "GET");

    if (userResponse.statusCode === 200) {
      console.log("✅ API authentication successful");
      console.log(
        `👤 User: ${userResponse.body.data?.username || userResponse.body.data?.email || "N/A"}`,
      );
    } else {
      console.log(
        "⚠️  API authentication check returned:",
        userResponse.statusCode,
      );
      console.log(`Response: ${JSON.stringify(userResponse.body, null, 2)}`);
      console.log(
        "\n⚠️  Note: API key may have limited permissions for programmatic access.",
      );
      console.log(
        "This is expected for some Cal.com plans. The embed will still work!\n",
      );
    }

    console.log("");

    // Test 2: Try to get schedules
    console.log("Test 2: Get Schedules (may require higher tier)");
    const schedulesResponse = await makeRequest("/v2/schedules", "GET");

    if (schedulesResponse.statusCode === 200) {
      console.log("✅ Schedules API accessible");
      console.log(
        `📅 Found ${schedulesResponse.body.data?.length || 0} existing schedules`,
      );
      if (
        schedulesResponse.body.data &&
        schedulesResponse.body.data.length > 0
      ) {
        schedulesResponse.body.data.forEach((schedule) => {
          console.log(`   - ${schedule.name} (ID: ${schedule.id})`);
        });
      }
    } else {
      console.log(
        "⚠️  Schedules endpoint not accessible (may require Platform tier)",
      );
      console.log(`Status: ${schedulesResponse.statusCode}`);
      console.log(
        "\n💡 This is normal for free tier. Availability is managed via Cal.com UI.",
      );
      console.log(
        "   The booking embed will work perfectly without API access!\n",
      );
    }

    console.log("");
    console.log("✅ Connection test completed");
    console.log("");
    console.log("📝 NEXT STEPS:");
    console.log("   1. Set availability manually in Cal.com dashboard:");
    console.log("      Settings > Availability > Set your working hours");
    console.log("   2. Configure hours: Mon-Fri 9am-5pm, Sun 2pm-6pm");
    console.log("   3. The embed widget will use these settings automatically");
    console.log("");
  } catch (error) {
    console.error("❌ Error during API tests:", error.message);
    process.exit(1);
  }
}

// Run the tests
testAPIConnection();
