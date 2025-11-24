"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bot,
  Calendar,
  MessageSquare,
  Minimize2,
  RotateCcw,
  Send,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MobileChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  onBookConsultation: () => void;
  onNewChat: () => void;
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
  onNewChat,
  className = "",
}: MobileChatInterfaceProps) {
  // Enhanced state management with localStorage persistence
  const [isMinimized, setIsMinimized] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fieldporter-chat-mobile-minimized");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [unreadCount, setUnreadCount] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Persist minimize state
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "fieldporter-chat-mobile-minimized",
        JSON.stringify(isMinimized),
      );
    }
  }, [isMinimized]);

  // Track unread messages when minimized
  useEffect(() => {
    if (isMinimized && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === "assistant") {
        setUnreadCount((prev) => prev + 1);
      }
    }
  }, [messages, isMinimized]);

  // Clear unread count when expanded
  useEffect(() => {
    if (!isMinimized) {
      setUnreadCount(0);
    }
  }, [isMinimized]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isMinimized]);

  // Handle iOS keyboard
  useEffect(() => {
    if (!isOpen || isMinimized) return;

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
      window.visualViewport.addEventListener("resize", handleViewportChange, {
        passive: true,
      });
      handleResize();
    } else {
      window.addEventListener("resize", handleResize, { passive: true });
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleViewportChange,
        );
      } else {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [isOpen, isMinimized]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current && !isMinimized) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue, isMinimized]);

  const handleMinimizeToggle = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setUnreadCount(0);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    onSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
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

  // Minimized floating state
  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-4 right-4 z-[100]"
      >
        <motion.button
          onClick={handleMinimizeToggle}
          className={cn(
            "w-16 h-16 rounded-2xl",
            "bg-black/20 backdrop-blur-xl border border-white/10",
            "hover:bg-black/30 hover:border-white/20",
            "shadow-[0_0_30px_rgba(59,130,246,0.25)]",
            "flex items-center justify-center relative",
            "touch-manipulation select-none",
          )}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Restore chat window"
        >
          <MessageSquare className="w-7 h-7 text-white/90" strokeWidth={1.5} />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-fieldporter-blue rounded-full flex items-center justify-center"
            >
              <span className="text-xs font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </motion.div>
          )}
        </motion.button>
      </motion.div>
    );
  }

  // Full screen chat interface
  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "fixed inset-0 z-[100] bg-bg-fieldporter-primary flex flex-col",
        "safe-area-inset-top safe-area-inset-bottom",
        className,
      )}
      ref={containerRef}
      style={{
        paddingBottom: keyboardHeight > 0 ? `${keyboardHeight}px` : "0px",
      }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between p-4 border-b border-fieldporter-gray/20 bg-bg-fieldporter-secondary/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-fieldporter-gray/20 transition-colors focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50"
            aria-label="Close chat"
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

        <div className="flex items-center gap-1">
          <button
            onClick={onNewChat}
            className="p-2 rounded-full hover:bg-fieldporter-gray/20 transition-colors focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50"
            aria-label="Start new conversation"
            title="New Chat"
          >
            <RotateCcw className="w-5 h-5 text-fieldporter-gray" />
          </button>
          <button
            onClick={onBookConsultation}
            className="p-2 rounded-full hover:bg-fieldporter-gray/20 transition-colors focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50"
            aria-label="Book consultation"
          >
            <Calendar className="w-5 h-5 text-fieldporter-blue" />
          </button>
          <motion.button
            onClick={handleMinimizeToggle}
            className="p-2 rounded-full hover:bg-fieldporter-gray/20 transition-colors focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50"
            title="Minimize to floating button"
            aria-label="Minimize chat to floating button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Minimize2 className="w-5 h-5 text-fieldporter-gray" />
          </motion.button>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fieldporter-blue/20 flex items-center justify-center">
              <Bot className="w-8 h-8 text-fieldporter-blue" />
            </div>
            <h3 className="text-lg font-semibold text-fieldporter-white mb-2">
              Welcome to FIELDPORTER
            </h3>
            <p className="text-fieldporter-gray text-sm leading-relaxed mb-6">
              We help solve your business challenges with AI automation.
            </p>

            {/* Value-driven questions focused on user outcomes */}
            <div className="space-y-2">
              <p className="text-xs text-fieldporter-gray/80 mb-3">
                What challenge can we help solve?
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "Save 15+ hours weekly?",
                  "Get market insights in days vs weeks?",
                  "Turn manual processes into automation?",
                  "Validate your concept quickly?",
                  "Build production AI systems?",
                ].map((suggestion, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    onClick={() =>
                      setInputValue(
                        suggestion.replace("?", " - how does this work?"),
                      )
                    }
                    className="px-3 py-1.5 text-xs bg-fieldporter-gray/10 hover:bg-fieldporter-gray/20 
                             border border-fieldporter-gray/20 rounded-full transition-all duration-200
                             text-fieldporter-white/80 hover:text-fieldporter-white hover:scale-105"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "flex gap-3 max-w-[85%]",
              message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto",
            )}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              {message.role === "user" ? (
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
                  message.role === "user"
                    ? "bg-fieldporter-blue text-fieldporter-white rounded-br-md"
                    : "bg-fieldporter-gray/10 text-fieldporter-white border border-fieldporter-gray/20 rounded-bl-md",
                )}
              >
                {formatMessage(message.content)}
              </div>
              <div
                className={cn(
                  "text-xs text-fieldporter-gray/60 mt-1 px-2",
                  message.role === "user" ? "text-right" : "text-left",
                )}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 mr-auto max-w-[85%]"
          >
            <div className="w-8 h-8 rounded-full bg-fieldporter-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="w-4 h-4 text-fieldporter-blue" />
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-black border border-white/20 rounded-2xl rounded-bl-md p-2 shadow-lg">
                <div className="relative w-[50px] h-[50px] flex items-center justify-center">
                  <motion.img
                    src="/videos/loading-brain.gif"
                    alt="AI thinking"
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              <span className="text-sm text-fieldporter-gray italic">
                Thinking...
              </span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border-t border-fieldporter-gray/20 bg-bg-fieldporter-secondary/80 backdrop-blur-sm p-4"
      >
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
                "text-sm leading-relaxed",
                "max-h-[120px] min-h-[44px] scrollbar-hide",
              )}
              maxLength={1000}
              disabled={isLoading}
              rows={1}
            />
            <div className="text-xs text-fieldporter-gray/60 mt-1 text-right">
              {inputValue.length}/1000
            </div>
          </div>
          <motion.button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200",
              "bg-fieldporter-blue hover:bg-fieldporter-blue/80",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Send message"
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
