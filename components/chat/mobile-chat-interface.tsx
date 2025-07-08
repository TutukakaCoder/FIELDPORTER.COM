"use client";

import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, Calendar, Send, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PremiumThinkingSphere } from './premium-thinking-sphere';

interface MobileChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  onBookConsultation: () => void;
  className?: string;
}

export function MobileChatInterface({
  isOpen,
  onClose,
  messages,
  inputValue,
  setInputValue,
  onSendMessage,
  isLoading,
  onBookConsultation,
  className = ""
}: MobileChatInterfaceProps) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle iOS keyboard
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        const keyboardHeight = windowHeight - viewportHeight;
        setKeyboardHeight(Math.max(0, keyboardHeight));
      }
    };

    const handleViewportChange = () => {
      if (window.visualViewport) {
        handleResize();
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
      handleResize();
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [isOpen]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    onSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (content: string) => {
    return content
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        "fixed inset-0 z-[100] bg-bg-fieldporter-primary flex flex-col",
        "safe-area-inset-top safe-area-inset-bottom",
        className
      )}
      ref={containerRef}
      style={{
        paddingBottom: keyboardHeight > 0 ? `${keyboardHeight}px` : '0px'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-fieldporter-gray/20 bg-bg-fieldporter-secondary/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-fieldporter-gray/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-fieldporter-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-fieldporter-blue/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-fieldporter-blue" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-fieldporter-white">
                FIELDPORTER Agent
              </h3>
              <p className="text-xs text-fieldporter-gray">
                AI Strategy Expert
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onBookConsultation}
          className="p-2 rounded-full hover:bg-fieldporter-gray/20 transition-colors"
        >
          <Calendar className="w-5 h-5 text-fieldporter-blue" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fieldporter-blue/20 flex items-center justify-center">
              <Bot className="w-8 h-8 text-fieldporter-blue" />
            </div>
            <h3 className="text-lg font-semibold text-fieldporter-white mb-2">
              Welcome to FIELDPORTER
            </h3>
            <p className="text-fieldporter-gray text-sm leading-relaxed mb-6">
              I'm here to help you understand how we can solve your business challenges with AI automation.
            </p>
            
            {/* Quick suggestions based on real services */}
            <div className="space-y-2">
              <p className="text-xs text-fieldporter-gray/80 mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "What's strategic research intelligence?",
                  "Show me examples of your AI work",
                  "How does rapid development work?",
                  "What are your pricing ranges?",
                  "Tell me about workflow optimization"
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputValue(suggestion)}
                    className="px-3 py-1.5 text-xs bg-fieldporter-gray/10 hover:bg-fieldporter-gray/20 
                             border border-fieldporter-gray/20 rounded-full transition-colors
                             text-fieldporter-white/80 hover:text-fieldporter-white"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 max-w-[85%]",
              message.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              {message.role === 'user' ? (
                <div className="w-full h-full rounded-full bg-fieldporter-gray/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-fieldporter-gray" />
                </div>
              ) : (
                <div className="w-full h-full rounded-full bg-fieldporter-blue/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-fieldporter-blue" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                  message.role === 'user'
                    ? "bg-fieldporter-blue text-fieldporter-white rounded-br-md"
                    : "bg-fieldporter-gray/10 text-fieldporter-white border border-fieldporter-gray/20 rounded-bl-md"
                )}
              >
                {formatMessage(message.content)}
              </div>
              <div className={cn(
                "text-xs text-fieldporter-gray/60 mt-1 px-2",
                message.role === 'user' ? "text-right" : "text-left"
              )}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-fieldporter-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="w-4 h-4 text-fieldporter-blue" />
            </div>
            <div className="bg-fieldporter-gray/10 border border-fieldporter-gray/20 rounded-2xl rounded-bl-md px-4 py-3">
              <PremiumThinkingSphere />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-fieldporter-gray/20 bg-bg-fieldporter-secondary/80 backdrop-blur-sm p-4">
        <div className="flex items-end gap-3">
          <div className="flex-1 min-w-0">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Message FIELDPORTER Agent..."
              className={cn(
                "w-full resize-none bg-fieldporter-gray/10 border border-fieldporter-gray/20 rounded-2xl px-4 py-3",
                "text-fieldporter-white placeholder:text-fieldporter-gray/70",
                "focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50 focus:border-fieldporter-blue/50",
                "text-base leading-relaxed", // Prevents zoom on iOS
                "max-h-[120px] min-h-[44px]" // Proper touch target
              )}
              maxLength={1000}
              disabled={isLoading}
              rows={1}
            />
            <div className="text-xs text-fieldporter-gray/60 mt-1 text-right">
              {inputValue.length}/1000
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200",
              "bg-fieldporter-blue hover:bg-fieldporter-blue/80",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-lg active:scale-95"
            )}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
} 