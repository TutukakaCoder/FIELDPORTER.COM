#!/usr/bin/env node

/**
 * FIELDPORTER AI Chat Performance Testing Script
 * Tests response times, message quality, and system reliability
 */

const fetch = require('node-fetch');

// Configuration
const N8N_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/fieldporter-chat';
const TEST_SCENARIOS = [
  {
    name: 'Enterprise AI Strategy Inquiry',
    message:
      'We are a Fortune 500 company looking to implement AI strategy across our operations. What is your approach?',
    expectedKeywords: [
      'FIELDPORTER',
      'build what we recommend',
      'enterprise',
      'strategy',
      'Frederick',
    ],
    category: 'enterprise',
  },
  {
    name: 'Startup AI Implementation',
    message: 'I am a startup founder. How can AI help automate our business processes?',
    expectedKeywords: ['automation', 'startup', 'business processes', 'AI', 'Frederick'],
    category: 'startup',
  },
  {
    name: 'VC Portfolio Question',
    message: 'As a VC, how can I help my portfolio companies implement AI more effectively?',
    expectedKeywords: ['VC', 'portfolio', 'AI implementation', 'advisory', 'Frederick'],
    category: 'vc',
  },
  {
    name: 'Individual Learning',
    message: 'I want to learn about AI agents and how they work. Can you help?',
    expectedKeywords: ['AI agents', 'learn', 'Frederick', 'individual'],
    category: 'individual',
  },
  {
    name: 'Complex Technical Question',
    message:
      'What are the performance considerations for deploying large language models in production?',
    expectedKeywords: ['Frederick should discuss', 'technical', 'production', 'performance'],
    category: 'technical',
  },
];

// Performance metrics
const metrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  averageResponseTime: 0,
  responseTimes: [],
  qualityScores: [],
  errors: [],
};

/**
 * Test a single chat interaction
 */
async function testChatInteraction(scenario) {
  const startTime = Date.now();

  try {
    console.log(`\n🧪 Testing: ${scenario.name}`);
    console.log(`📤 Message: ${scenario.message.substring(0, 80)}...`);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: scenario.message,
        sessionId: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        messageCount: 1,
        timestamp: new Date().toISOString(),
      }),
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!data.response || typeof data.response !== 'string') {
      throw new Error('Invalid response structure');
    }

    // Calculate quality score
    const qualityScore = calculateQualityScore(data.response, scenario);

    // Record metrics
    metrics.totalRequests++;
    metrics.successfulRequests++;
    metrics.responseTimes.push(responseTime);
    metrics.qualityScores.push(qualityScore);

    // Output results
    console.log(`✅ Success - ${responseTime}ms`);
    console.log(`📊 Quality Score: ${qualityScore}/10`);
    console.log(
      `📝 Response (${data.response.length} chars): ${data.response.substring(0, 120)}...`
    );

    // Check for FIELDPORTER-specific content
    const hasFieldporterContext = checkFieldporterContent(data.response);
    console.log(`🎯 FIELDPORTER Context: ${hasFieldporterContext ? '✓' : '✗'}`);

    return {
      success: true,
      responseTime,
      qualityScore,
      response: data.response,
      hasFieldporterContext,
    };
  } catch (error) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    metrics.totalRequests++;
    metrics.failedRequests++;
    metrics.errors.push({
      scenario: scenario.name,
      error: error.message,
      responseTime,
    });

    console.log(`❌ Failed - ${responseTime}ms`);
    console.log(`💥 Error: ${error.message}`);

    return {
      success: false,
      responseTime,
      error: error.message,
    };
  }
}

/**
 * Calculate quality score based on response content
 */
function calculateQualityScore(response, scenario) {
  let score = 0;

  // Length check (optimal range: 100-400 characters)
  if (response.length >= 100 && response.length <= 400) {
    score += 2;
  } else if (response.length >= 50 && response.length <= 600) {
    score += 1;
  }

  // Keyword relevance
  const foundKeywords = scenario.expectedKeywords.filter(keyword =>
    response.toLowerCase().includes(keyword.toLowerCase())
  );
  score += Math.min(foundKeywords.length, 3); // Max 3 points for keywords

  // FIELDPORTER branding
  if (response.includes('FIELDPORTER') || response.includes('Frederick')) {
    score += 2;
  }

  // Professional tone (no generic responses)
  if (!response.includes('I am an AI') && !response.includes('I can help you with')) {
    score += 1;
  }

  // Call to action or next steps
  if (
    response.includes('Frederick should discuss') ||
    response.includes('consultation') ||
    response.includes('connect') ||
    response.includes('contact')
  ) {
    score += 2;
  }

  return Math.min(score, 10);
}

/**
 * Check for FIELDPORTER-specific content
 */
function checkFieldporterContent(response) {
  const fieldporterIndicators = [
    'FIELDPORTER',
    'Frederick',
    'build what we recommend',
    'VOYCAP',
    'Harpers',
    'PAPPS Mastery',
    'vLLM',
    'SIR The Label',
    '90% faster',
    'McKinsey insights at Silicon Valley speed',
  ];

  return fieldporterIndicators.some(indicator =>
    response.toLowerCase().includes(indicator.toLowerCase())
  );
}

/**
 * Generate performance report
 */
function generateReport() {
  console.log('\n📊 FIELDPORTER AI Chat Performance Report');
  console.log('='.repeat(60));

  // Calculate averages
  if (metrics.responseTimes.length > 0) {
    metrics.averageResponseTime =
      metrics.responseTimes.reduce((a, b) => a + b, 0) / metrics.responseTimes.length;
  }

  const averageQuality =
    metrics.qualityScores.length > 0
      ? metrics.qualityScores.reduce((a, b) => a + b, 0) / metrics.qualityScores.length
      : 0;

  // Performance metrics
  console.log(`\n🎯 Overall Performance:`);
  console.log(`   Total Requests: ${metrics.totalRequests}`);
  console.log(
    `   Success Rate: ${((metrics.successfulRequests / metrics.totalRequests) * 100).toFixed(1)}%`
  );
  console.log(`   Average Response Time: ${metrics.averageResponseTime.toFixed(0)}ms`);
  console.log(`   Average Quality Score: ${averageQuality.toFixed(1)}/10`);

  // Response time analysis
  if (metrics.responseTimes.length > 0) {
    const sortedTimes = [...metrics.responseTimes].sort((a, b) => a - b);
    const p50 = sortedTimes[Math.floor(sortedTimes.length * 0.5)];
    const p95 = sortedTimes[Math.floor(sortedTimes.length * 0.95)];

    console.log(`\n⏱️  Response Time Analysis:`);
    console.log(`   Fastest: ${Math.min(...metrics.responseTimes)}ms`);
    console.log(`   Slowest: ${Math.max(...metrics.responseTimes)}ms`);
    console.log(`   50th percentile: ${p50}ms`);
    console.log(`   95th percentile: ${p95}ms`);

    // Performance assessment
    const target = 2000; // 2 second target
    const fastResponses = metrics.responseTimes.filter(t => t < target).length;
    const fastPercent = (fastResponses / metrics.responseTimes.length) * 100;

    console.log(`   Under ${target}ms: ${fastPercent.toFixed(1)}% (Target: >90%)`);

    if (fastPercent >= 90) {
      console.log(`   🎉 Performance target met!`);
    } else {
      console.log(`   ⚠️  Performance below target`);
    }
  }

  // Quality analysis
  if (metrics.qualityScores.length > 0) {
    const highQuality = metrics.qualityScores.filter(s => s >= 7).length;
    const qualityPercent = (highQuality / metrics.qualityScores.length) * 100;

    console.log(`\n🌟 Quality Analysis:`);
    console.log(`   High Quality Responses (7+/10): ${qualityPercent.toFixed(1)}%`);

    if (qualityPercent >= 80) {
      console.log(`   🎉 Quality target met!`);
    } else {
      console.log(`   ⚠️  Quality needs improvement`);
    }
  }

  // Error analysis
  if (metrics.errors.length > 0) {
    console.log(`\n❌ Errors (${metrics.errors.length}):`);
    metrics.errors.forEach(error => {
      console.log(`   ${error.scenario}: ${error.error}`);
    });
  }

  // Recommendations
  console.log(`\n💡 Recommendations:`);

  if (metrics.averageResponseTime > 3000) {
    console.log(`   • Optimize n8n workflow to reduce response time`);
    console.log(`   • Consider caching common responses`);
    console.log(`   • Review DeepSeek API configuration`);
  }

  if (averageQuality < 7) {
    console.log(`   • Enhance system prompt with more FIELDPORTER context`);
    console.log(`   • Improve response formatting for chat interface`);
    console.log(`   • Add more specific business examples`);
  }

  if (metrics.failedRequests > 0) {
    console.log(`   • Improve error handling and fallback responses`);
    console.log(`   • Add retry logic for failed requests`);
    console.log(`   • Monitor n8n workflow health`);
  }

  console.log('\n' + '='.repeat(60));
}

/**
 * Run performance tests
 */
async function runTests() {
  console.log('🚀 Starting FIELDPORTER AI Chat Performance Tests');
  console.log(`📍 Testing endpoint: ${N8N_WEBHOOK_URL}`);

  // Test health check first
  console.log('\n🔍 Testing health check...');
  try {
    const healthResult = await testChatInteraction({
      name: 'Health Check',
      message: 'health_check',
      expectedKeywords: ['healthy', 'running'],
      category: 'health',
    });

    if (!healthResult.success) {
      console.log('❌ Health check failed. Stopping tests.');
      return;
    }
  } catch (error) {
    console.log(`❌ Health check failed: ${error.message}`);
    return;
  }

  // Run test scenarios
  console.log('\n🧪 Running test scenarios...');
  for (const scenario of TEST_SCENARIOS) {
    await testChatInteraction(scenario);
    // Brief pause between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Generate report
  generateReport();
}

// Run tests if called directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('💥 Test run failed:', error);
    process.exit(1);
  });
}

module.exports = { runTests, testChatInteraction, calculateQualityScore };
