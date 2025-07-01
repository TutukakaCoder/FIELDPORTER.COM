#!/bin/bash

echo "🚀 FIELDPORTER AI Chat System Optimization Setup"
echo "================================================="

# Check Node.js version
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed. Please install Node.js first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2)
echo "✅ Node.js version: $NODE_VERSION"

# Check if npm dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
fi

# Check environment variables
echo "🔧 Checking environment configuration..."
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    cp env.example .env.local
    echo "✏️  Please update .env.local with your actual API keys and configuration"
fi

# Check n8n webhook URL
if grep -q "NEXT_PUBLIC_N8N_WEBHOOK_URL.*localhost:5678" .env.local; then
    echo "✅ n8n webhook URL configured for local development"
else
    echo "⚠️  Please configure NEXT_PUBLIC_N8N_WEBHOOK_URL in .env.local"
fi

# Check DeepSeek API key
if grep -q "DEEPSEEK_API_KEY.*your_" .env.local; then
    echo "⚠️  Please configure DEEPSEEK_API_KEY in .env.local"
else
    echo "✅ DeepSeek API key appears to be configured"
fi

echo ""
echo "🧪 Running performance test to check current system..."

# Install node-fetch if not present
if ! npm list node-fetch > /dev/null 2>&1; then
    echo "📦 Installing node-fetch for testing..."
    npm install --save-dev node-fetch
fi

# Run performance test
if [ -f "scripts/test-chat-performance.js" ]; then
    echo "🔍 Testing current chat system performance..."
    node scripts/test-chat-performance.js
else
    echo "⚠️  Performance test script not found at scripts/test-chat-performance.js"
fi

echo ""
echo "📋 Setup Checklist:"
echo "==================="
echo ""
echo "1. Environment Configuration:"
echo "   □ Update .env.local with your DeepSeek API key"
echo "   □ Configure Firebase service account credentials"
echo "   □ Set n8n webhook URL (local: http://localhost:5678/webhook/fieldporter-chat)"
echo ""
echo "2. n8n Workflow Setup:"
echo "   □ Import n8n-workflows/fieldporter-optimized-workflow.json"
echo "   □ Configure DeepSeek credentials in n8n"
echo "   □ Test workflow with health check"
echo ""
echo "3. Frontend Testing:"
echo "   □ Start development server: npm run dev"
echo "   □ Test chat widget with sample messages"
echo "   □ Verify FIELDPORTER context in responses"
echo ""
echo "4. Performance Validation:"
echo "   □ Run: node scripts/test-chat-performance.js"
echo "   □ Target: Response time <2s, Quality score >7/10"
echo "   □ Verify FIELDPORTER project examples in responses"
echo ""
echo "📖 Next Steps:"
echo "=============="
echo ""
echo "1. Review docs/OPTIMIZATION_IMPLEMENTATION_GUIDE.md for detailed instructions"
echo "2. Start with Phase 1: Enhanced System Prompt Deployment"
echo "3. Test each phase before proceeding to the next"
echo "4. Monitor performance improvements with the testing script"
echo ""
echo "🎯 Expected Improvements:"
echo "   • Response Time: 5-8s → <2s"
echo "   • Quality Score: 4/10 → 8/10"
echo "   • FIELDPORTER Context: 20% → 90%"
echo "   • Lead Qualification: Manual → Automated"
echo ""
echo "💡 Need help? Check the troubleshooting section in the implementation guide."
echo ""
echo "✨ Ready to transform your chat into a premium AI consulting experience!" 