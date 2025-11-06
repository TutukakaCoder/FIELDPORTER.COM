// Test script to verify Gemini chat API is working
const API_URL = 'http://localhost:3000/api/chat';

const TEST_PROMPTS = [
  {
    name: "Test 1: Simple Greeting",
    message: "hello",
    expectedKeywords: ["Porter", "FIELDPORTER", "help"],
    expectedLength: "short"
  },
  {
    name: "Test 2: Services Question",
    message: "What services does FIELDPORTER offer?",
    expectedKeywords: ["AI", "automation", "integration", "research", "development"],
    expectedLength: "medium"
  },
  {
    name: "Test 3: Pricing Question",
    message: "How much does it cost?",
    expectedKeywords: ["$", "2K", "50K", "pricing", "budget", "project"],
    expectedLength: "medium"
  },
  {
    name: "Test 4: Multi-turn (Turn 1)",
    message: "I need help with AI automation",
    expectedKeywords: ["automation", "help", "workflow"],
    expectedLength: "medium"
  },
  {
    name: "Test 5: Multi-turn (Turn 2 - with history)",
    message: "What would that cost?",
    history: [
      { role: "user", content: "I need help with AI automation" },
      { role: "assistant", content: "I can help with AI automation..." }
    ],
    expectedKeywords: ["$", "cost", "automation"],
    expectedLength: "medium"
  }
];

async function testChatAPI(test) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🧪 ${test.name}`);
  console.log(`${'='.repeat(80)}`);
  console.log(`📤 Sending: "${test.message}"`);

  const startTime = Date.now();

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: test.message,
        sessionId: `test-${Date.now()}`,
        conversationHistory: test.history || []
      })
    });

    const duration = Date.now() - startTime;

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ FAILED - Status ${response.status}`);
      console.error(`Error: ${errorText}`);
      return { success: false, error: `HTTP ${response.status}: ${errorText}` };
    }

    const data = await response.json();
    const reply = data.response;

    console.log(`✅ SUCCESS - ${duration}ms`);
    console.log(`📥 Response (${reply.length} chars):`);
    console.log(`"${reply}"`);
    console.log();

    // Validate response
    const checks = {
      hasContent: reply && reply.trim().length > 0,
      hasKeywords: test.expectedKeywords.some(kw => 
        reply.toLowerCase().includes(kw.toLowerCase())
      ),
      lengthOK: validateLength(reply, test.expectedLength),
      responseTime: duration < 5000
    };

    console.log(`🔍 Validation:`);
    console.log(`  • Has content: ${checks.hasContent ? '✅' : '❌'}`);
    console.log(`  • Contains expected keywords: ${checks.hasKeywords ? '✅' : '❌'}`);
    console.log(`  • Appropriate length: ${checks.lengthOK ? '✅' : '❌'}`);
    console.log(`  • Response time <5s: ${checks.responseTime ? '✅' : '❌'} (${duration}ms)`);

    const allChecks = Object.values(checks).every(v => v === true);
    
    return { 
      success: allChecks, 
      reply, 
      duration,
      checks
    };

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ FAILED - ${duration}ms`);
    console.error(`Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

function validateLength(text, expected) {
  const words = text.split(/\s+/).length;
  
  switch(expected) {
    case 'short': return words <= 50;
    case 'medium': return words > 10 && words <= 200;
    case 'long': return words > 50;
    default: return true;
  }
}

async function runAllTests() {
  console.log('\n🚀 FIELDPORTER AI Chat API Test Suite');
  console.log(`Starting tests at ${new Date().toLocaleTimeString()}\n`);

  const results = [];

  for (const test of TEST_PROMPTS) {
    const result = await testChatAPI(test);
    results.push({ test: test.name, ...result });
    
    // Delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(80));

  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  results.forEach(result => {
    const status = result.success ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${result.test}`);
    if (!result.success && result.error) {
      console.log(`         Error: ${result.error}`);
    }
  });

  console.log();
  console.log(`Results: ${passed} passed, ${failed} failed out of ${results.length} tests`);
  
  if (failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! Gemini migration working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Review errors above.');
  }

  console.log('\n' + '='.repeat(80));
}

// Check if server is running
console.log('🔍 Checking if development server is running...');
console.log('If server is not running, please run: npm run dev');
console.log();

// Wait a moment then run tests
setTimeout(runAllTests, 1000);

