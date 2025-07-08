"use client";

import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Calendar, Maximize2, Minimize2, Send, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PremiumThinkingSphere } from './premium-thinking-sphere';

interface DesktopChatSidebarProps {
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

export function DesktopChatSidebar({
  isOpen,
  onClose,
  messages,
  inputValue,
  setInputValue,
  onSendMessage,
  isLoading,
  onBookConsultation,
  className = ""
}: DesktopChatSidebarProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

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
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        "fixed right-0 top-0 h-full w-[400px] z-[60] flex flex-col",
        "bg-bg-fieldporter-secondary/90 backdrop-blur-xl",
        "border-l border-fieldporter-gray/20 shadow-2xl",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-fieldporter-gray/20 bg-bg-fieldporter-secondary/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
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
        
        <div className="flex items-center gap-1">
          <button
            onClick={onBookConsultation}
            className="p-2 rounded-lg hover:bg-fieldporter-gray/20 transition-colors"
            title="Book Consultation"
          >
            <Calendar className="w-4 h-4 text-fieldporter-blue" />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 rounded-lg hover:bg-fieldporter-gray/20 transition-colors"
            title={isMinimized ? "Restore" : "Minimize"}
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4 text-fieldporter-gray" />
            ) : (
              <Minimize2 className="w-4 h-4 text-fieldporter-gray" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-fieldporter-gray/20 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4 text-fieldporter-gray" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fieldporter-blue/20 flex items-center justify-center">
                    <Bot className="w-8 h-8 text-fieldporter-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-fieldporter-white mb-2">
                    Welcome to FIELDPORTER
                  </h3>
                  <p className="text-fieldporter-gray text-sm leading-relaxed mb-4">
                    I'm here to help you understand how we can solve your business challenges with AI automation.
                  </p>
                  
                  {/* Quick suggestions based on real services */}
                  <div className="space-y-2">
                    <p className="text-xs text-fieldporter-gray/80 mb-3">Quick questions:</p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {[
                        "Strategic research?",
                        "AI work examples?",
                        "Rapid development?",
                        "Pricing ranges?",
                        "Workflow optimization?"
                      ].map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => setInputValue(suggestion.replace('?', ' - tell me more'))}
                          className="px-2 py-1 text-xs bg-fieldporter-gray/10 hover:bg-fieldporter-gray/20 
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
                    "flex gap-3 max-w-[90%]",
                    message.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    {message.role === 'user' ? (
                      <div className="w-full h-full rounded-full bg-fieldporter-gray/20 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-fieldporter-gray" />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-full bg-fieldporter-blue/20 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-fieldporter-blue" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        "rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap",
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
                <div className="flex gap-3 mr-auto max-w-[90%]">
                  <div className="w-7 h-7 rounded-full bg-fieldporter-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-fieldporter-blue" />
                  </div>
                  <div className="bg-fieldporter-gray/10 border border-fieldporter-gray/20 rounded-2xl rounded-bl-md px-3 py-2">
                    <PremiumThinkingSphere />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-fieldporter-gray/20 bg-bg-fieldporter-secondary/50 backdrop-blur-sm p-4">
              <div className="flex items-end gap-3">
                <div className="flex-1 min-w-0">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Message FIELDPORTER Agent..."
                    className={cn(
                      "w-full resize-none bg-fieldporter-gray/10 border border-fieldporter-gray/20 rounded-2xl px-3 py-2",
                      "text-fieldporter-white placeholder:text-fieldporter-gray/70",
                      "focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50 focus:border-fieldporter-blue/50",
                      "text-sm leading-relaxed",
                      "max-h-[120px] min-h-[40px] scrollbar-hide"
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
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                    "bg-fieldporter-blue hover:bg-fieldporter-blue/80",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "shadow-lg hover:shadow-xl active:scale-95"
                  )}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 