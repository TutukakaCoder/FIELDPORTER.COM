/* eslint-disable react/self-closing-comp, react/no-unescaped-entities */
"use client";

import { useStableMobile } from "@/hooks";
import { chatbotAnalytics } from "@/lib/chatbot-analytics";
import { FALLBACK_RESPONSES } from "@/lib/chatbot-system-prompt";
import { enhancedChatService } from "@/lib/enhanced-chat-service";
import { formatChatResponse } from "@/lib/chat/response-format";
import { cn } from "@/lib/utils";
import type { Message } from "@/types/chat";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MessageManager } from "./message-manager";
import { ResponsiveChatManager } from "./responsive-chat-manager";

interface EnhancedChatWidgetProps {
  className?: string;
}

export function EnhancedChatWidget({ className }: EnhancedChatWidgetProps) {
  const isMobile = useStableMobile();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [messageManager] = useState(() => new MessageManager());
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [isN8nConnected, setIsN8nConnected] = useState(false);
  const [retryableError, setRetryableError] = useState<string | null>(null);
  const [responseStartTime, setResponseStartTime] = useState<number>(0);
  const [leadScore, setLeadScore] = useState(1);

  // Initialize messages and email from Enhanced MessageManager
  useEffect(() => {
    const initializeChat = async () => {
      // Wait a bit for Firebase initialization
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const initialMessages = messageManager.getMessages();
      if (initialMessages.length > 0) {
        // Only show messages if there's an existing conversation
        setMessages(initialMessages);
      } else {
        // Start with empty chat - no welcome message
        setMessages([]);
      }

      const email = messageManager.getUserEmail();
      if (email) {
        setUserEmail(email);
      }

      // Check Firebase connection status
      setIsFirebaseConnected(messageManager.isFirebaseConnected());

      // Check enhanced service health
      const serviceHealth = await enhancedChatService.healthCheck();
      setIsN8nConnected(serviceHealth.healthy);
    };

    initializeChat();
  }, [messageManager]);

  // Listen for open chat widget events from other components
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };

    // Listen for custom event from hero button
    window.addEventListener("open-chat-widget", handleOpenChat);

    return () => {
      window.removeEventListener("open-chat-widget", handleOpenChat);
    };
  }, []);

  // Cleanup effect to flush pending Firebase operations
  useEffect(() => {
    return () => {
      // Cleanup handled automatically by the simplified MessageManager
    };
  }, [messageManager]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userInput = inputValue.trim();
    setError(null);
    setRetryableError(null);

    // Immediately update UI for better perceived performance
    setInputValue("");
    setIsLoading(true);
    setResponseStartTime(Date.now());

    // Add user message
    const userMessage = await messageManager.addMessage(userInput, "user");
    if (!userMessage) {
      setError(
        "Failed to send message. Please check your input and try again.",
      );
      setIsLoading(false);
      return;
    }

    setMessages(messageManager.getMessages());

    try {
      if (process.env.NODE_ENV === "development") {
        console.log("Starting AI request for message:", userInput);
      }

      // Single API call - all processing happens server-side now
      const aiResponse = await enhancedChatService.getChatResponse(
        userInput,
        messageManager.getSessionId(),
        messageManager.getMessages().slice(-8),
        userEmail,
      );

      if (process.env.NODE_ENV === "development") {
        console.log("AI Response received:", {
          responseLength: aiResponse.response.length,
          hasError: !!aiResponse.error,
        });
      }

      let responseContent: string;

      if (aiResponse.error) {
        if (aiResponse.error.retryable) {
          setRetryableError(aiResponse.error.message);
          responseContent = aiResponse.response;
        } else {
          responseContent = FALLBACK_RESPONSES.error;
        }
        setIsN8nConnected(false);
      } else {
        responseContent = formatChatResponse(aiResponse.response);

        // Quick validation only
        if (responseContent.length < 10) {
          responseContent = FALLBACK_RESPONSES.inappropriate;
        }

        setRetryableError(null);
        setIsN8nConnected(true);
      }

      const assistantMessage = await messageManager.addMessage(
        responseContent,
        "assistant",
      );

      if (assistantMessage) {
        messageManager.updateMessageStatus(userMessage.id, "sent");
        setMessages(messageManager.getMessages());

        // Simple analytics tracking
        const finalResponseTime = Date.now() - responseStartTime;
        chatbotAnalytics.trackInteraction({
          sessionId: messageManager.getSessionId(),
          messageCount: messageManager.getMessages().length,
          responseTime: finalResponseTime,
          leadScore: aiResponse.leadScore || 1,
          conversationSource: "chat_widget",
          deviceType: window.innerWidth < 768 ? "mobile" : "desktop",
        });
      } else {
        throw new Error("Failed to process AI response");
      }
    } catch (error) {
      console.error("💥 Error in handleSendMessage:", error);

      // Add error message for user
      await messageManager.addMessage(
        "We're having trouble connecting right now. Please try again, or you can email us directly at freddy@fieldporter.com.",
        "assistant",
      );

      setMessages(messageManager.getMessages());
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookConsultation = async () => {
    // Track the consultation request
    await messageManager.markConsultationRequested();

    setIsOpen(false);
    router.push("/contact");
  };

  const handleNewChat = useCallback(async () => {
    try {
      // Clear local state
      setMessages([]);
      setInputValue("");
      setUserEmail("");
      setError(null);
      setRetryableError(null);
      setIsLoading(false);
      setLeadScore(1);

      // Clear MessageManager conversation
      messageManager.clearConversation();

      // Reset Firebase connection
      setIsFirebaseConnected(messageManager.isFirebaseConnected());

      if (process.env.NODE_ENV === "development") {
        console.log(
          "🔄 New chat session started:",
          messageManager.getSessionId(),
        );
      }

      // No automatic message - let user start fresh
    } catch (error) {
      console.error("Error starting new chat:", error);
      setError("Failed to start new conversation. Please try again.");
    }
  }, [messageManager]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn("", className)}>
      <ResponsiveChatManager
        isOpen={isOpen}
        onToggle={handleToggleChat}
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        onBookConsultation={handleBookConsultation}
        onNewChat={handleNewChat}
      />
    </div>
  );
}
