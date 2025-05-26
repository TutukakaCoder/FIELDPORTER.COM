'use client';

import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Loader2, MessageCircle, Send, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { n8nChatService, type ChatMessage, type N8NChatResponse } from './n8n-chat-service';

interface N8NEnhancedChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  userEmail?: string;
  className?: string;
}

interface ConversationState {
  messages: ChatMessage[];
  sessionId: string;
  leadScore: number;
  leadQuality: 'low' | 'medium' | 'high';
  isLoading: boolean;
  error: string | null;
  connectionStatus: 'connected' | 'disconnected' | 'testing';
}

export function N8NEnhancedChatWidget({
  isOpen,
  onToggle,
  userEmail,
  className = '',
}: N8NEnhancedChatWidgetProps) {
  const [conversation, setConversation] = useState<ConversationState>({
    messages: [],
    sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    leadScore: 0,
    leadQuality: 'low',
    isLoading: false,
    error: null,
    connectionStatus: 'testing',
  });

  const [inputMessage, setInputMessage] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Test n8n connection on mount
  useEffect(() => {
    testConnection();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages, showTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const testConnection = async () => {
    setConversation(prev => ({ ...prev, connectionStatus: 'testing' }));

    try {
      const isConnected = await n8nChatService.testConnection();
      setConversation(prev => ({
        ...prev,
        connectionStatus: isConnected ? 'connected' : 'disconnected',
      }));
    } catch (error) {
      setConversation(prev => ({ ...prev, connectionStatus: 'disconnected' }));
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    const message = inputMessage.trim();
    if (!message || conversation.isLoading) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };

    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    setInputMessage('');
    setShowTyping(true);

    try {
      // Send to n8n workflow
      const response: N8NChatResponse = await n8nChatService.sendMessage({
        message,
        sessionId: conversation.sessionId,
        userEmail,
        conversationHistory: conversation.messages,
      });

      setShowTyping(false);

      // Add AI response
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: response.timestamp,
      };

      setConversation(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        leadScore: response.leadScore,
        leadQuality: response.leadQuality,
        isLoading: false,
        connectionStatus: response.success ? 'connected' : 'disconnected',
      }));
    } catch (error) {
      setShowTyping(false);

      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

      setConversation(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        connectionStatus: 'disconnected',
      }));

      // Add fallback message
      const fallbackMessage: ChatMessage = {
        role: 'assistant',
        content:
          "I apologize, but I'm experiencing technical difficulties. Please try again in a moment, or contact us directly for immediate assistance.",
        timestamp: new Date().toISOString(),
      };

      setConversation(prev => ({
        ...prev,
        messages: [...prev.messages, fallbackMessage],
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getLeadScoreColor = (quality: string) => {
    switch (quality) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (conversation.connectionStatus) {
      case 'connected':
        return <CheckCircle className='w-3 h-3 text-green-500' />;
      case 'disconnected':
        return <AlertCircle className='w-3 h-3 text-red-500' />;
      case 'testing':
        return <Loader2 className='w-3 h-3 text-yellow-500 animate-spin' />;
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 bg-fieldporter-blue hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${className}`}
        aria-label='Open chat'
      >
        <MessageCircle className='w-6 h-6' />
        {conversation.leadScore > 0 && (
          <Badge
            className={`absolute -top-2 -right-2 ${getLeadScoreColor(conversation.leadQuality)} text-white text-xs`}
          >
            {conversation.leadScore}
          </Badge>
        )}
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50 ${className}`}
    >
      {/* Header */}
      <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-fieldporter-blue text-white rounded-t-lg'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
            <MessageCircle className='w-4 h-4' />
          </div>
          <div>
            <h3 className='font-semibold text-sm'>FIELDPORTER AI Assistant</h3>
            <div className='flex items-center space-x-2 text-xs opacity-90'>
              {getConnectionStatusIcon()}
              <span>
                {conversation.connectionStatus === 'connected' && 'Connected'}
                {conversation.connectionStatus === 'disconnected' && 'Offline'}
                {conversation.connectionStatus === 'testing' && 'Connecting...'}
              </span>
            </div>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          {conversation.leadScore > 0 && (
            <Badge className={`${getLeadScoreColor(conversation.leadQuality)} text-white text-xs`}>
              Score: {conversation.leadScore}
            </Badge>
          )}
          <button
            onClick={onToggle}
            className='text-white/80 hover:text-white transition-colors'
            aria-label='Close chat'
          >
            <X className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {conversation.messages.length === 0 && (
          <div className='text-center text-gray-500 dark:text-gray-400 py-8'>
            <MessageCircle className='w-12 h-12 mx-auto mb-4 opacity-50' />
            <p className='text-sm'>
              Welcome to FIELDPORTER! I'm here to help you explore our AI strategy and automation
              services.
            </p>
            <p className='text-xs mt-2 opacity-75'>
              Ask me about our services, approach, or schedule a consultation.
            </p>
          </div>
        )}

        {conversation.messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-fieldporter-blue text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              }`}
            >
              <p className='text-sm whitespace-pre-wrap'>{message.content}</p>
              {message.timestamp && (
                <p
                  className={`text-xs mt-1 opacity-70 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        ))}

        {showTyping && (
          <div className='flex justify-start'>
            <div className='bg-gray-100 dark:bg-gray-800 p-3 rounded-lg'>
              <div className='flex space-x-1'>
                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                <div
                  className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {conversation.error && (
          <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3'>
            <div className='flex items-center space-x-2'>
              <AlertCircle className='w-4 h-4 text-red-500' />
              <p className='text-sm text-red-700 dark:text-red-300'>{conversation.error}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
        <div className='flex space-x-2'>
          <input
            ref={inputRef}
            type='text'
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Ask about our AI strategy services...'
            className='flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-fieldporter-blue dark:bg-gray-800 dark:text-white text-sm'
            disabled={conversation.isLoading}
            maxLength={1000}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || conversation.isLoading}
            className='bg-fieldporter-blue hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors'
            aria-label='Send message'
          >
            {conversation.isLoading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <Send className='w-4 h-4' />
            )}
          </button>
        </div>

        {/* Character count */}
        <div className='flex justify-between items-center mt-2 text-xs text-gray-500'>
          <span>
            {conversation.connectionStatus === 'connected' ? 'Connected to AI' : 'Offline mode'}
          </span>
          <span>{inputMessage.length}/1000</span>
        </div>
      </div>
    </div>
  );
}
