"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Calendar,
  Maximize2,
  Minimize2,
  RotateCcw,
  Send,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DesktopChatSidebarProps {
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

export function DesktopChatSidebar({
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
}: DesktopChatSidebarProps) {
  // Enhanced state management with localStorage persistence
  const [isMinimized, setIsMinimized] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fieldporter-chat-minimized");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Persist minimize state
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "fieldporter-chat-minimized",
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

  // Focus input when opened and not minimized
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

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

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{
        opacity: 1,
        x: 0,
        height: isMinimized ? "80px" : "100vh",
      }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "fixed right-0 top-0 w-[400px] z-[60] flex flex-col overflow-hidden",
        "bg-bg-fieldporter-secondary/95 backdrop-blur-xl",
        "border-l border-fieldporter-gray/20 shadow-2xl",
        isMinimized && "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
        className,
      )}
    >
      {/* Header - Always Visible */}
      <motion.div
        className="flex items-center justify-between p-4 border-b border-fieldporter-gray/20 bg-bg-fieldporter-secondary/80 backdrop-blur-sm relative"
        animate={{
          background: isMinimized ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.5)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-fieldporter-blue/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-fieldporter-blue" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-fieldporter-white">
              FIELDPORTER Agent
            </h3>
            <p className="text-xs text-fieldporter-gray">
              {isMinimized && unreadCount > 0
                ? `${unreadCount} new message${unreadCount > 1 ? "s" : ""}`
                : "AI Strategy Expert"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onNewChat}
            className="p-2 rounded-lg hover:bg-fieldporter-gray/20 transition-colors focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50"
            title="New Chat"
            aria-label="Start new conversation"
          >
            <RotateCcw className="w-4 h-4 text-fieldporter-gray" />
          </button>
          <button
            onClick={onBookConsultation}
            className="p-2 rounded-lg hover:bg-fieldporter-gray/20 transition-colors focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50"
            title="Book Consultation"
            aria-label="Book consultation with FIELDPORTER"
          >
            <Calendar className="w-4 h-4 text-fieldporter-blue" />
          </button>
          <motion.button
            onClick={handleMinimizeToggle}
            className="p-2 rounded-lg hover:bg-fieldporter-gray/20 transition-colors focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50 relative"
            title={isMinimized ? "Restore Chat" : "Minimize Chat"}
            aria-label={
              isMinimized ? "Restore chat window" : "Minimize chat window"
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMinimized ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4 text-fieldporter-gray" />
              ) : (
                <Minimize2 className="w-4 h-4 text-fieldporter-gray" />
              )}
            </motion.div>
            {/* Unread indicator */}
            {isMinimized && unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-fieldporter-blue rounded-full flex items-center justify-center"
              >
                <span className="text-xs font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </motion.div>
            )}
          </motion.button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-fieldporter-gray/20 transition-colors focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50"
            title="Close Chat"
            aria-label="Close chat window"
          >
            <X className="w-4 h-4 text-fieldporter-gray" />
          </button>
        </div>
      </motion.div>

      {/* Chat Content - Animated */}
      <AnimatePresence mode="wait">
        {!isMinimized && (
          <motion.div
            key="chat-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 80px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
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
                  <p className="text-fieldporter-gray text-sm leading-relaxed mb-4">
                    We help solve your business challenges with AI automation.
                  </p>

                  {/* Value-driven questions focused on user outcomes */}
                  <div className="space-y-2">
                    <p className="text-xs text-fieldporter-gray/80 mb-3">
                      What challenge can we help solve?
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {[
                        "Save 15+ hours weekly?",
                        "Get market insights in days vs weeks?",
                        "Turn manual processes into automation?",
                        "Validate your concept quickly?",
                        "Build working prototypes?",
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
                          className="px-2 py-1 text-xs bg-fieldporter-gray/10 hover:bg-fieldporter-gray/20 
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
                    "flex gap-3 max-w-[90%]",
                    message.role === "user"
                      ? "ml-auto flex-row-reverse"
                      : "mr-auto",
                  )}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    {message.role === "user" ? (
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
                  className="flex gap-3 mr-auto max-w-[90%]"
                >
                  <div className="w-7 h-7 rounded-full bg-fieldporter-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-fieldporter-blue" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-black border border-white/20 rounded-2xl rounded-bl-md p-2 shadow-lg">
                      <div className="relative w-[54px] h-[54px] flex items-center justify-center">
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
                      "w-full resize-none bg-fieldporter-gray/10 border border-fieldporter-gray/20 rounded-2xl px-3 py-2",
                      "text-fieldporter-white placeholder:text-fieldporter-gray/70",
                      "focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50 focus:border-fieldporter-blue/50",
                      "text-sm leading-relaxed",
                      "max-h-[120px] min-h-[40px] scrollbar-hide",
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
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                    "bg-fieldporter-blue hover:bg-fieldporter-blue/80",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
