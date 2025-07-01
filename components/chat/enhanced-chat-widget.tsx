/* eslint-disable react/self-closing-comp, react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EnterpriseInput } from "@/components/ui/input";
import { chatbotAnalytics } from "@/lib/chatbot-analytics";
import { FALLBACK_RESPONSES } from "@/lib/chatbot-system-prompt";
import { enhancedChatService } from "@/lib/enhanced-chat-service";
import { cn } from "@/lib/utils";
import type { Message } from "@/types/chat";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Bot,
  Calendar,
  MessageCircle,
  RefreshCw,
  Send,
  User,
  Wifi,
  WifiOff,
} from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { MessageManager } from "./message-manager";

// Add new AnimatedChatButton component with forwardRef
const AnimatedChatButton = forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode }
>(function AnimatedChatButton({ children }, ref) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setIsMounted(true);
    // Check for reduced motion preference
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Trigger initial animation after a short delay
    if (!prefersReducedMotion.current && !hasAnimated) {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(true);
        // Hide after 2 seconds
        setTimeout(() => {
          setIsHovered(false);
          setHasAnimated(true);
        }, 2000);
      }, 1500);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hasAnimated]);

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {isHovered && !prefersReducedMotion.current && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
              scale: { duration: 0.2 },
            }}
            className="absolute right-full mr-4 whitespace-nowrap"
          >
            <div className="relative">
              <div className="bg-fieldporter-blue text-fieldporter-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg border border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-3.5 w-3.5 text-fieldporter-white/90" />
                  <span className="text-xs">AI Assistant Available</span>
                </div>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-fieldporter-blue/90 border-r border-b border-white/20" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// Add display name for better debugging
AnimatedChatButton.displayName = "AnimatedChatButton";

// Helper function to decode HTML entities and filter wrong consultation links
const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

// Helper function to format AI responses and prevent capability overpromising
const formatChatResponse = (content: string): string => {
  let processedContent = content;

  // Critical: Filter out booking capability claims and replace with throttled response
  const bookingPatterns = [
    /I('ll|'ll|'ll|\s+will)\s+(send|resend|email)\s+(you\s+)?a?\s+(calendar\s+)?(invite|meeting|appointment)/gi,
    /I('ll|'ll|'ll|\s+will)\s+book\s+(you\s+)?a?\s+(meeting|appointment|call)/gi,
    /I('ll|'ll|'ll|\s+will)\s+schedule\s+(you\s+)?a?\s+(meeting|appointment|call)/gi,
    /I('ll|'ll|'ll|\s+will)\s+set\s+up\s+(a\s+)?(meeting|appointment|call)/gi,
    /calendar\s+invite.*(is\s+)?(on\s+its\s+way|sent|coming)/gi,
    /zoom\s+invite.*(is\s+)?(on\s+its\s+way|sent|coming)/gi,
    /let\s+me\s+(resend|send).*(invite|meeting)/gi,
    /I('ll|'ll|'ll|\s+will)\s+send\s+you.*tomorrow\s+at/gi,
  ];

  const hasBookingClaim = bookingPatterns.some((pattern) =>
    pattern.test(processedContent),
  );

  if (hasBookingClaim) {
    processedContent =
      "We can help connect you with FIELDPORTER's team, but our web scheduling is currently limited. Please use the contact page and our team will get back to you with scheduling options.";
  }

  // Filter out wrong consultation links and replace with proper message
  if (
    processedContent.includes("fieldporter.com/consult") ||
    processedContent.includes("direct link again") ||
    processedContent.includes("here's the direct link")
  ) {
    processedContent =
      "Please use the 'Book Consultation' button below to connect with our team directly.";
  }

  return (
    processedContent
      // Clean up HTML entities
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      // Remove markdown formatting characters that don't render well
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      // Remove excessive punctuation and symbols
      .replace(/[•●◦▪▫]/g, "•")
      .replace(/[→←↑↓]/g, "->")
      .replace(/[✓✔]/g, "✓")
      .replace(/[✗✘]/g, "✗")
      // Clean up spacing - ensure proper paragraph breaks
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      // Ensure single spaces after periods
      .replace(/\.\s{2,}/g, ". ")
      // Clean up list formatting
      .replace(/^\s*[-•]\s*/gm, "• ")
      // Remove any remaining external links
      .replace(
        /(?:https?:\/\/)?(?:www\.)?fieldporter\.com\/\S+/gi,
        "our contact page",
      )
      // Clean up leading/trailing whitespace
      .trim()
  );
};

// Premium thinking messages that build rapport and demonstrate intelligence
const PREMIUM_THINKING_MESSAGES = [
  // Research phase messages
  "Researching your specific challenge...",
  "Cross-referencing our case studies...",
  "Analyzing similar client scenarios...",
  "Consulting our knowledge base...",
  "Reviewing relevant methodologies...",

  // Analysis phase messages
  "Processing your requirements...",
  "Thinking about optimal approaches...",
  "Evaluating potential solutions...",
  "Considering implementation strategies...",
  "Assessing complexity factors...",

  // Intelligence phase messages
  "Refining my understanding...",
  "Connecting the strategic dots...",
  "Building a comprehensive response...",
  "Synthesizing our expertise...",
  "Crafting tailored recommendations...",

  // Relationship building messages
  "I want to give you a thorough answer...",
  "Making sure this is genuinely helpful...",
  "Ensuring we address your core needs...",
  "Drawing from our best practices...",
  "Personalizing this for your situation...",

  // Slow/timeout messages
  "Still working on this - complex questions deserve thoughtful answers...",
  "Taking extra time to ensure quality insights...",
  "Deep analysis in progress - your question deserves our best thinking...",
  "Compiling comprehensive recommendations...",
  "Almost ready with detailed insights...",
];

// Enhanced typing indicator component with premium branding and random messages
const PremiumTypingIndicator = ({
  stage,
}: {
  stage: "thinking" | "analyzing" | "calculating" | "slow" | "timeout";
}) => {
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    let messages: string[];

    switch (stage) {
      case "thinking":
        messages = PREMIUM_THINKING_MESSAGES.slice(0, 5); // Research phase
        break;
      case "analyzing":
        messages = PREMIUM_THINKING_MESSAGES.slice(5, 10); // Analysis phase
        break;
      case "calculating":
        messages = PREMIUM_THINKING_MESSAGES.slice(10, 15); // Intelligence phase
        break;
      case "slow":
        messages = PREMIUM_THINKING_MESSAGES.slice(15, 20); // Relationship building
        break;
      case "timeout":
        messages = PREMIUM_THINKING_MESSAGES.slice(20); // Slow/timeout messages
        break;
      default:
        messages = PREMIUM_THINKING_MESSAGES.slice(0, 5);
    }

    // Pick a random message from the appropriate set
    const randomMessage =
      messages[Math.floor(Math.random() * messages.length)] ||
      "Analyzing your request...";
    setCurrentMessage(randomMessage);
  }, [stage]);

  return (
    <div className="px-4 py-3 flex items-center gap-3">
      <div className="flex space-x-1">
        <motion.div
          className="w-2 h-2 bg-fieldporter-blue rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-2 h-2 bg-fieldporter-blue rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 bg-fieldporter-blue rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        />
      </div>
      <span className="text-sm text-fieldporter-gray italic">
        {currentMessage}
      </span>
    </div>
  );
};

// Business intelligence message analyzer
const analyzeMessageForIntelligence = (
  content: string,
): {
  businessKeywords: string[];
  painPoints: string[];
  urgencySignals: string[];
  technicalSignals: string[];
  budgetIndicators: string[];
  companySignals: string[];
} => {
  const lowerContent = content.toLowerCase();

  const businessKeywords = [
    "scale",
    "growth",
    "efficiency",
    "roi",
    "save time",
    "competitive advantage",
    "optimize",
    "streamline",
    "automate",
    "workflow",
    "process",
  ].filter((keyword) => lowerContent.includes(keyword));

  const painPoints = [
    "manual process",
    "time consuming",
    "inefficient",
    "bottleneck",
    "expensive",
    "difficult to scale",
    "taking too long",
    "costing us",
    "losing money",
    "wasting time",
    "frustrated",
    "stuck",
    "overwhelmed",
  ].filter((keyword) => lowerContent.includes(keyword));

  const urgencySignals = [
    "immediately",
    "asap",
    "urgent",
    "this quarter",
    "within weeks",
    "starting soon",
    "timeline",
    "deadline",
    "need now",
    "can't wait",
    "quickly",
  ].filter((keyword) => lowerContent.includes(keyword));

  const technicalSignals = [
    "api",
    "integration",
    "workflow",
    "automation",
    "system",
    "database",
    "architecture",
    "scalable",
    "enterprise",
    "technical team",
    "developer",
  ].filter((keyword) => lowerContent.includes(keyword));

  const budgetIndicators = [
    "budget",
    "investment",
    "cost",
    "price",
    "spend",
    "roi",
    "savings",
    "expensive",
    "affordable",
    "worth it",
    "pay for itself",
  ].filter((keyword) => lowerContent.includes(keyword));

  const companySignals = [
    "startup",
    "enterprise",
    "team of",
    "employees",
    "company",
    "business",
    "organization",
    "we are",
    "we have",
    "our team",
  ].filter((keyword) => lowerContent.includes(keyword));

  return {
    businessKeywords,
    painPoints,
    urgencySignals,
    technicalSignals,
    budgetIndicators,
    companySignals,
  };
};

// Calculate lead qualification score
const calculateLeadScore = (
  messages: Message[],
): {
  score: number;
  qualification: "cold" | "warm" | "hot" | "qualified";
  reasoning: string[];
} => {
  let score = 2; // Base score
  const reasoning: string[] = [];

  const userMessages = messages.filter((msg) => msg.role === "user");
  const allIntelligence = {
    businessKeywords: [] as string[],
    painPoints: [] as string[],
    urgencySignals: [] as string[],
    technicalSignals: [] as string[],
    budgetIndicators: [] as string[],
    companySignals: [] as string[],
  };

  // Analyze all user messages and accumulate intelligence
  userMessages.forEach((msg) => {
    const intel = analyzeMessageForIntelligence(msg.content);
    allIntelligence.businessKeywords.push(...intel.businessKeywords);
    allIntelligence.painPoints.push(...intel.painPoints);
    allIntelligence.urgencySignals.push(...intel.urgencySignals);
    allIntelligence.technicalSignals.push(...intel.technicalSignals);
    allIntelligence.budgetIndicators.push(...intel.budgetIndicators);
    allIntelligence.companySignals.push(...intel.companySignals);
  });

  // Remove duplicates
  allIntelligence.businessKeywords = [
    ...new Set(allIntelligence.businessKeywords),
  ];
  allIntelligence.painPoints = [...new Set(allIntelligence.painPoints)];
  allIntelligence.urgencySignals = [...new Set(allIntelligence.urgencySignals)];
  allIntelligence.technicalSignals = [
    ...new Set(allIntelligence.technicalSignals),
  ];
  allIntelligence.budgetIndicators = [
    ...new Set(allIntelligence.budgetIndicators),
  ];
  allIntelligence.companySignals = [...new Set(allIntelligence.companySignals)];

  // Scoring logic
  if (allIntelligence.painPoints.length > 0) {
    score += 3;
    reasoning.push(
      `${allIntelligence.painPoints.length} pain points identified`,
    );
  }

  if (allIntelligence.budgetIndicators.length > 0) {
    score += 3;
    reasoning.push("Budget discussion detected");
  }

  if (allIntelligence.urgencySignals.length > 0) {
    score +=
      allIntelligence.urgencySignals.includes("immediately") ||
      allIntelligence.urgencySignals.includes("asap")
        ? 4
        : 2;
    reasoning.push("Timeline urgency indicated");
  }

  if (allIntelligence.technicalSignals.length > 0) {
    score += 2;
    reasoning.push("Technical sophistication detected");
  }

  if (allIntelligence.companySignals.length > 0) {
    score += 2;
    reasoning.push("Business context provided");
  }

  if (userMessages.length >= 3) {
    score += 2;
    reasoning.push("High engagement level");
  }

  // Determine qualification
  let qualification: "cold" | "warm" | "hot" | "qualified" = "cold";
  if (score >= 12) qualification = "qualified";
  else if (score >= 8) qualification = "hot";
  else if (score >= 5) qualification = "warm";

  return { score, qualification, reasoning };
};

// Enhanced qualification prompt generator
const generateQualificationPrompt = (messages: Message[]): string | null => {
  const { score, qualification } = calculateLeadScore(messages);
  const userMessages = messages.filter((msg) => msg.role === "user");

  if (userMessages.length < 2) return null;

  const lastMessage = userMessages[userMessages.length - 1]?.content || "";
  const intelligence = analyzeMessageForIntelligence(lastMessage);

  // High-value prospect prompts
  if (qualification === "qualified") {
    return "Based on what you've shared, you'd benefit significantly from a personalized automation roadmap. Shall I connect you with our strategic team for a consultation?";
  }

  if (qualification === "hot" && intelligence.budgetIndicators.length > 0) {
    return "For opportunities of this scale, we typically start with a strategic assessment. Would you like to explore a consultation to discuss your specific requirements?";
  }

  // Pain point follow-up
  if (intelligence.painPoints.length > 0 && userMessages.length >= 3) {
    return "You're dealing with exactly the type of operational challenges we help solve. Our approach typically saves businesses 15-20 hours weekly. Would you like to see how this applies to your situation?";
  }

  // Technical sophistication follow-up
  if (intelligence.technicalSignals.length > 0 && qualification === "warm") {
    return "You're asking the right technical questions. This level of implementation typically warrants a direct conversation with our team. Interested in a technical discussion?";
  }

  return null;
};

// Quick response checker for common queries - temporarily disabled
const getQuickResponse = (input: string): string | null => {
  // TODO: Re-implement quick responses with business intelligence
  return null;
};

interface EnhancedChatWidgetProps {
  className?: string;
}

export function EnhancedChatWidget({ className }: EnhancedChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messageManager] = useState(() => new MessageManager());
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<
    "thinking" | "analyzing" | "calculating" | "slow" | "timeout"
  >("thinking");

  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [isN8nConnected, setIsN8nConnected] = useState(false);
  const [retryableError, setRetryableError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [responseStartTime, setResponseStartTime] = useState<number>(0);
  const [detectedContactInfo, setDetectedContactInfo] = useState<{
    email?: string;
    phone?: string;
  } | null>(null);
  const [teamNotified, setTeamNotified] = useState(false);
  const [showContactPrompt, setShowContactPrompt] = useState(false);
  const [leadScore, setLeadScore] = useState(1);
  const prefersReducedMotion = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();
  const slowWarningRef = useRef<NodeJS.Timeout>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
    // Check for reduced motion preference
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Trigger initial animation after a short delay
    if (!prefersReducedMotion.current && !hasAnimated) {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(true);
        // Hide after 2 seconds
        setTimeout(() => {
          setIsHovered(false);
          setHasAnimated(true);
        }, 2000);
      }, 1500);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hasAnimated]);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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

    // Check for quick responses first
    const quickResponse = getQuickResponse(userInput);
    if (quickResponse) {
      // Add user message
      const userMessage = await messageManager.addMessage(userInput, "user");
      if (userMessage) {
        setMessages(messageManager.getMessages());
        setInputValue("");

        // Add quick response immediately
        setTimeout(async () => {
          const assistantMessage = await messageManager.addMessage(
            quickResponse,
            "assistant",
          );
          if (assistantMessage) {
            messageManager.updateMessageStatus(userMessage.id, "sent");
            setMessages(messageManager.getMessages());

            // Track analytics for successful interaction
            const finalResponseTime = Date.now() - responseStartTime;
            chatbotAnalytics.trackInteraction({
              sessionId: messageManager.getSessionId(),
              messageCount: messageManager.getMessages().length,
              responseTime: finalResponseTime,
              leadScore: 1,
              conversationSource: "chat_widget",
              deviceType: window.innerWidth < 768 ? "mobile" : "desktop",
            });
          }
        }, 300); // Brief delay for natural feel
      }
      return;
    }

    // Add user message
    const userMessage = await messageManager.addMessage(userInput, "user");
    if (!userMessage) {
      setError(
        "Failed to send message. Please check your input and try again.",
      );
      return;
    }

    setMessages(messageManager.getMessages());
    setInputValue("");
    setIsLoading(true);
    setLoadingStage("thinking");
    setResponseStartTime(Date.now());

    // Set up progressive loading indicators
    slowWarningRef.current = setTimeout(() => {
      setLoadingStage("slow");
    }, 5000);

    loadingTimeoutRef.current = setTimeout(() => {
      setLoadingStage("timeout");
      // Auto-suggest direct contact after timeout
      setTimeout(async () => {
        if (isLoading) {
          setIsLoading(false);
          const timeoutMessage = await messageManager.addMessage(
            FALLBACK_RESPONSES.timeout,
            "assistant",
          );
          if (timeoutMessage) {
            messageManager.updateMessageStatus(userMessage.id, "failed");
            setMessages(messageManager.getMessages());

            // Track failed interaction
            const finalResponseTime = Date.now() - responseStartTime;
            chatbotAnalytics.trackInteraction({
              sessionId: messageManager.getSessionId(),
              messageCount: messageManager.getMessages().length,
              responseTime: finalResponseTime,
              leadScore: 0,
              conversationSource: "chat_widget_error",
              deviceType: window.innerWidth < 768 ? "mobile" : "desktop",
            });
          }
        }
      }, 3000);
    }, 8000);

    try {
      // Business intelligence analysis before sending
      const updatedMessages = messageManager.getMessages();
      const { score, qualification, reasoning } =
        calculateLeadScore(updatedMessages);
      const intelligence = analyzeMessageForIntelligence(userInput);

      // Advanced loading stages based on message complexity
      if (intelligence.businessKeywords.length > 0) {
        setLoadingStage("analyzing");
      }
      if (intelligence.budgetIndicators.length > 0) {
        setLoadingStage("calculating");
      }

      if (process.env.NODE_ENV === "development") {
        console.log("🚀 Starting AI request for message:", userInput);
        console.log("🧠 Business Intelligence:", {
          score,
          qualification,
          reasoning,
          intelligence,
        });
      }

      setIsLoading(true);
      const aiResponse = await enhancedChatService.getChatResponse(
        userInput,
        messageManager.getSessionId(),
        messageManager.getMessages().slice(-8), // Increased memory window from 3 to 8
        userEmail,
      );

      if (process.env.NODE_ENV === "development") {
        console.log("📥 AI Response received:", {
          responseLength: aiResponse.response.length,
          hasError: !!aiResponse.error,
        });
      }

      const responseTime = Date.now() - responseStartTime;

      let responseContent: string;

      if (aiResponse.error) {
        if (aiResponse.error.retryable) {
          setRetryableError(aiResponse.error.message);
          responseContent = aiResponse.response; // Enhanced service provides better fallbacks
        } else {
          responseContent = FALLBACK_RESPONSES.error;
        }
        setIsN8nConnected(false);
      } else {
        responseContent = aiResponse.response;

        // Validate response quality
        if (responseContent.length < 10) {
          responseContent = FALLBACK_RESPONSES.inappropriate;
        }

        // Check for confidentiality breaches
        if (
          responseContent.toLowerCase().includes("self-development platform")
        ) {
          responseContent =
            "I'd be happy to discuss how FIELDPORTER can help with your strategic challenges. What specific business problem are you looking to solve?";
        }

        setRetryableError(null);
        setIsN8nConnected(true);
      }

      // Add qualification prompts for high-value prospects
      const qualificationPrompt = generateQualificationPrompt(updatedMessages);
      if (qualificationPrompt && score >= 8) {
        responseContent += "\n\n" + qualificationPrompt;
      }

      const assistantMessage = await messageManager.addMessage(
        responseContent,
        "assistant",
      );

      if (assistantMessage) {
        messageManager.updateMessageStatus(userMessage.id, "sent");
        setMessages(messageManager.getMessages());

        // Enhanced analytics with business intelligence
        const finalResponseTime = Date.now() - responseStartTime;
        chatbotAnalytics.trackInteraction({
          sessionId: messageManager.getSessionId(),
          messageCount: messageManager.getMessages().length,
          responseTime: finalResponseTime,
          leadScore: score,
          conversationSource: "chat_widget",
          deviceType: window.innerWidth < 768 ? "mobile" : "desktop",
        });

        // High-value lead notification
        if (score >= 12) {
          console.log("🔥 QUALIFIED LEAD DETECTED:", {
            sessionId: messageManager.getSessionId(),
            score,
            qualification,
            reasoning,
            painPoints: intelligence.painPoints,
            urgencySignals: intelligence.urgencySignals,
            email: userEmail,
          });

          // TODO: Trigger email notification to Frederick
          // This would typically call a Firebase function or n8n webhook
        }
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
      setLoadingStage("thinking");
    }
  };

  const handleRetryMessage = (messageId: string) => {
    const retryMessage = messageManager.retryMessage(messageId);
    if (retryMessage) {
      setMessages(messageManager.getMessages());
      setError(null);
      setRetryableError(null);
      // Trigger resend logic here
      handleSendMessage();
    }
  };

  const handleRetryN8nRequest = async () => {
    if (!retryableError) return;

    setRetryableError(null);
    setError(null);

    // Get the last user message to retry
    const lastUserMessage = messages.filter((m) => m.role === "user").pop();
    if (lastUserMessage) {
      setInputValue(lastUserMessage.content);
      await handleSendMessage();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmailSubmit = async () => {
    if (!userEmail.trim()) return;

    try {
      await messageManager.setUserEmail(userEmail);

      const thankYouMessage = await messageManager.addMessage(
        `Thank you for providing your email (${userEmail}). Our team will follow up with you. In the meantime, feel free to continue asking about our AI consulting services.`,
        "assistant",
      );

      if (thankYouMessage) {
        setMessages(messageManager.getMessages());

        // Track email capture as an interaction
        chatbotAnalytics.trackInteraction({
          sessionId: messageManager.getSessionId(),
          messageCount: messageManager.getMessages().length,
          responseTime: 100, // Immediate response
          leadScore: 5, // Email capture indicates higher interest
          conversationSource: "email_capture",
          deviceType: window.innerWidth < 768 ? "mobile" : "desktop",
        });
      }

      setUserEmail("");
    } catch (error) {
      console.error("Email submission failed:", error);
      setError("Failed to save email. Please try again.");
    }
  };

  const handleBookConsultation = async () => {
    // Track the consultation request
    await messageManager.markConsultationRequested();

    // Close the chat dialog
    setIsOpen(false);

    // Route to contact page
    window.location.href = "/contact";
  };

  const getMessageStatusIcon = (message: Message) => {
    if (message.role === "assistant") return null;

    switch (message.status) {
      case "sending":
        return (
          <RefreshCw className="h-3 w-3 animate-spin text-fieldporter-gray" />
        );
      case "failed":
        return (
          <button
            onClick={() => handleRetryMessage(message.id)}
            className="text-red-400 hover:text-red-300 transition-colors"
            title="Click to retry"
          >
            <AlertCircle className="h-3 w-3" />
          </button>
        );
      case "sent":
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50",
        className,
      )}
    >
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* Chat Button Container with improved positioning */}
        <div className="relative flex items-center justify-end">
          {/* Animated tooltip that appears to the left of the button */}
          {isMounted && (
            <AnimatePresence>
              {isHovered && !prefersReducedMotion.current && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                    scale: { duration: 0.2 },
                  }}
                  className="absolute right-full mr-3 whitespace-nowrap z-[60]"
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <div className="relative flex items-center">
                    <div className="bg-fieldporter-blue text-fieldporter-white px-3 py-2.5 rounded-lg text-sm font-medium shadow-lg border border-white/20 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-3.5 w-3.5 text-fieldporter-white/90 flex-shrink-0" />
                        <span className="text-xs font-medium leading-none">
                          AI Assistant Available
                        </span>
                      </div>
                    </div>
                    {/* Tooltip arrow pointing precisely to button center */}
                    <div
                      className="absolute left-full w-2 h-2 bg-fieldporter-blue/90 border-r border-b border-white/20 rotate-45"
                      style={{
                        top: "50%",
                        transform: "translateY(-50%) translateX(-1px)",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Chat Button - Precisely positioned */}
          <DialogTrigger asChild>
            <Button
              data-chat-trigger="true"
              data-chat-toggle="true"
              variant="primary"
              size="icon"
              className={cn(
                "h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg hover:shadow-xl",
                "transition-all duration-300 ease-out",
                "hover:scale-110 active:scale-95",
                "bg-fieldporter-blue hover:bg-fieldporter-blue/90",
                "border-2 border-white/20",
                "relative z-[51]",
                "flex items-center justify-center", // Ensure icon is perfectly centered
              )}
              aria-label="Open FIELDPORTER Agent"
              onMouseEnter={() =>
                !prefersReducedMotion.current && setIsHovered(true)
              }
              onMouseLeave={() =>
                !prefersReducedMotion.current && setIsHovered(false)
              }
            >
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent
          className={cn(
            "sm:max-w-md w-full max-h-[85vh] flex flex-col",
            "md:max-w-lg lg:max-w-xl",
            "p-0 gap-0 mx-4 sm:mx-auto",
            "max-w-[calc(100vw-2rem)]",
          )}
        >
          <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-fieldporter-gray/20">
            <DialogTitle className="flex items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-fieldporter-blue/20 flex items-center justify-center">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-fieldporter-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base sm:text-lg font-semibold text-fieldporter-white truncate">
                  FIELDPORTER Agent
                </div>
                <div className="text-xs sm:text-sm text-fieldporter-gray font-normal">
                  AI Strategy Consulting Expert
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                {/* Firebase Status */}
                <div className="flex items-center gap-1">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      isFirebaseConnected ? "bg-green-400" : "bg-yellow-400",
                    )}
                  />
                  <span className="text-xs text-fieldporter-gray hidden sm:inline">
                    {isFirebaseConnected ? "DB" : "Local"}
                  </span>
                </div>

                {/* n8n AI Status */}
                <div className="flex items-center gap-1">
                  {isN8nConnected ? (
                    <Wifi className="h-3 w-3 text-green-400" />
                  ) : (
                    <WifiOff className="h-3 w-3 text-red-400" />
                  )}
                  <span className="text-xs text-fieldporter-gray hidden sm:inline">
                    {isN8nConnected ? "AI" : "Offline"}
                  </span>
                </div>
              </div>
            </DialogTitle>
            <DialogDescription className="text-fieldporter-gray/80 mt-2 text-sm sm:text-base">
              Discuss your challenges with our AI agent to help articulate what
              you need from us more clearly.
            </DialogDescription>
          </DialogHeader>

          {/* Error Display */}
          {error && (
            <div className="mx-4 sm:mx-6 mt-3 sm:mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* n8n Retry Display */}
          {retryableError && (
            <div className="mx-4 sm:mx-6 mt-3 sm:mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm text-yellow-400 min-w-0">
                  <WifiOff className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">
                    {retryableError}
                  </span>
                </div>
                <Button
                  variant="fieldporter-secondary"
                  size="sm"
                  onClick={handleRetryN8nRequest}
                  className="text-xs px-2 sm:px-3 py-1 flex-shrink-0"
                >
                  Retry
                </Button>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 min-h-[250px] sm:min-h-[300px] max-h-[350px] sm:max-h-[400px] scrollbar-thin">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2 sm:gap-3",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {message.role === "assistant" && (
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-fieldporter-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-fieldporter-blue" />
                  </div>
                )}

                <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[80%]">
                  <div
                    className={cn(
                      "rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm leading-relaxed whitespace-pre-wrap",
                      message.role === "user"
                        ? "bg-fieldporter-blue text-fieldporter-white"
                        : "bg-bg-fieldporter-secondary border border-fieldporter-gray/20 text-fieldporter-white",
                    )}
                  >
                    {formatChatResponse(message.content)}
                  </div>

                  {/* Message Status */}
                  <div
                    className={cn(
                      "flex items-center gap-1 px-2",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {getMessageStatusIcon(message)}
                    <span className="text-xs text-fieldporter-gray/60">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-fieldporter-gray/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-fieldporter-gray" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 sm:gap-3 justify-start">
                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-fieldporter-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-fieldporter-blue" />
                </div>
                <div className="bg-bg-fieldporter-secondary border border-fieldporter-gray/20 rounded-lg max-w-[85%] sm:max-w-[80%]">
                  <PremiumTypingIndicator stage={loadingStage} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 sm:p-6 pt-3 sm:pt-4 border-t border-fieldporter-gray/20">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 mb-3">
              <Button
                variant="fieldporter-secondary"
                size="sm"
                onClick={handleBookConsultation}
                className="flex items-center justify-center gap-2 text-xs sm:text-sm h-9 px-3"
              >
                <Calendar className="h-3 w-3" />
                <span className="hidden sm:inline">Book Consultation</span>
                <span className="sm:hidden">Book Call</span>
              </Button>
            </div>

            <div className="flex gap-2">
              <EnterpriseInput
                ref={inputRef}
                placeholder="Describe your business challenge or what you need help with..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm"
                disabled={isLoading}
                maxLength={1000}
              />
              <Button
                variant="primary"
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0"
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>

            {/* Character count */}
            <div className="text-xs text-fieldporter-gray/60 mt-1 text-right">
              {inputValue.length}/1000
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
