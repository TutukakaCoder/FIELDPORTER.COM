'use client';

import { N8NEnhancedChatWidget } from '@/components/chat/n8n-enhanced-chat-widget';
import { useState } from 'react';

export default function N8NDemoPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white'>
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
            FIELDPORTER N8N Integration Demo
          </h1>

          <p className='text-xl text-gray-300 mb-8'>
            Experience our AI-powered chat system with DeepSeek integration through n8n workflow
            automation.
          </p>

          <div className='grid md:grid-cols-2 gap-8 mb-12'>
            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
              <h3 className='text-2xl font-semibold mb-4 text-blue-300'>AI-Powered Responses</h3>
              <p className='text-gray-300'>
                Our chat system uses DeepSeek API through n8n workflows to provide intelligent,
                context-aware responses about FIELDPORTER services.
              </p>
            </div>

            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
              <h3 className='text-2xl font-semibold mb-4 text-purple-300'>Lead Scoring</h3>
              <p className='text-gray-300'>
                Automatic lead qualification based on conversation content, helping identify
                high-value prospects for consultation.
              </p>
            </div>

            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
              <h3 className='text-2xl font-semibold mb-4 text-green-300'>Business Context</h3>
              <p className='text-gray-300'>
                Responses are tailored with FIELDPORTER-specific knowledge about AI strategy,
                automation, and consulting services.
              </p>
            </div>

            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
              <h3 className='text-2xl font-semibold mb-4 text-yellow-300'>Fallback Handling</h3>
              <p className='text-gray-300'>
                Graceful degradation when services are unavailable, ensuring users always receive
                helpful responses.
              </p>
            </div>
          </div>

          <div className='bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10'>
            <h2 className='text-3xl font-bold mb-4'>Try the Chat System</h2>
            <p className='text-gray-300 mb-6'>
              Click the chat button to start a conversation with our AI assistant. Ask about our
              services, pricing, or schedule a consultation.
            </p>

            <button
              onClick={() => setIsChatOpen(true)}
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors'
            >
              Open Chat Demo
            </button>
          </div>

          <div className='mt-12 text-sm text-gray-400'>
            <p>
              This demo showcases the n8n workflow integration with DeepSeek API for
              enterprise-grade AI chat functionality.
            </p>
          </div>
        </div>
      </div>

      <N8NEnhancedChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        userEmail='demo@fieldporter.com'
      />
    </div>
  );
}
