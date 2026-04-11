import type { Message } from "@/types/chat";
import { TEACHING_SYSTEM_PROMPT } from "./prompts";
import { BusinessIntelligenceAnalyzer } from "@/lib/firebase-analytics";
import { analyzeQueryComplexity } from "./analysis";

export function convertHistoryToGemini(
  history: Message[],
): Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> {
  const converted = history
    .filter((msg) => msg.role !== "system")
    .filter((msg) => msg.content && msg.content.trim())
    .map((msg) => ({
      role: (msg.role === "assistant" ? "model" : "user") as "user" | "model",
      parts: [{ text: msg.content?.trim() || "" }],
    }));

  const firstMessage = converted[0];
  if (firstMessage && firstMessage.role === "model") {
    console.warn("⚠️ History starts with model message, removing");
    return converted.slice(1);
  }

  return converted;
}

export function extractSystemPrompt(
  history: Message[],
  messageCount: number = 1,
  frustrationLevel: "none" | "low" | "high" = "none",
): string {
  const systemMessage = history.find((msg) => msg.role === "system");
  let basePrompt = systemMessage?.content || TEACHING_SYSTEM_PROMPT;

  const contextAdditions: string[] = [];

  if (history.length === 0) {
    contextAdditions.push(
      "This is the start of a new conversation - give a great first impression by providing immediate value!",
    );
  } else {
    contextAdditions.push(
      `This is message ${messageCount} in an ongoing conversation with ${history.length} previous messages.`,
    );
  }

  if (frustrationLevel === "high") {
    contextAdditions.push(
      "CRITICAL: User is showing frustration. Provide concrete examples and actionable advice immediately. Do not ask more questions - give answers.",
    );
  } else if (frustrationLevel === "low") {
    contextAdditions.push(
      "User may be slightly frustrated. Focus on providing value and concrete examples.",
    );
  }

  if (history.length > 5) {
    contextAdditions.push(
      "User is highly engaged - they've been in conversation for a while. This is a good time to naturally mention FIELDPORTER services if relevant.",
    );
  }

  if (history.length > 0) {
    const recentUserMessages = history
      .slice(-3)
      .filter((msg) => msg.role === "user")
      .map((msg) => msg.content);

    if (recentUserMessages.length > 0) {
      const sentiment = BusinessIntelligenceAnalyzer.analyzeMessage(
        recentUserMessages.join(" "),
      );

      if (sentiment.sentiment === "positive") {
        contextAdditions.push(
          "User has shown positive engagement in recent messages - they're interested and engaged.",
        );
      } else if (sentiment.sentiment === "negative") {
        contextAdditions.push(
          "User has shown negative sentiment - pivot to providing concrete value and actionable solutions.",
        );
      }
    }
  }

  if (contextAdditions.length > 0) {
    basePrompt +=
      "\n\n---\n\nCONVERSATION CONTEXT:\n" + contextAdditions.join("\n");
  }

  return basePrompt;
}

export function getContextAwareFallback(
  message: string,
  conversationHistory: Message[],
  complexity: ReturnType<typeof analyzeQueryComplexity>,
): string {
  const lowerMessage = message.toLowerCase();

  const industries = [
    "gin",
    "alcohol",
    "beverage",
    "retail",
    "construction",
    "vc",
    "venture",
    "consulting",
  ];
  const detectedIndustry = industries.find((ind) => lowerMessage.includes(ind));

  if (complexity.userFrustrationLevel === "high") {
    if (detectedIndustry) {
      return `I understand you're looking for help with ${detectedIndustry}. Common challenges in this industry include market differentiation, customer acquisition, and operational efficiency. For ${detectedIndustry} businesses, AI can help with customer insights, inventory optimization, and marketing automation. What specific challenge are you facing right now?`;
    }
    return `I want to help you solve this. Let me give you some concrete examples: First, identify your biggest time-waster. Second, map out where manual processes create bottlenecks. Third, prioritize automation opportunities that deliver quick wins. What's your biggest operational challenge right now?`;
  }

  if (
    detectedIndustry === "gin" ||
    detectedIndustry === "alcohol" ||
    detectedIndustry === "beverage"
  ) {
    return `For beverage companies like yours, common AI applications include customer behavior analysis, inventory forecasting, and personalized marketing. We've helped similar businesses automate order processing and customer communication. What's your biggest operational challenge?`;
  }

  if (conversationHistory.length > 0) {
    return `I'm having a technical issue, but I want to help. Based on our conversation, AI typically helps businesses like yours save 15+ hours weekly through automation. What's the biggest manual process slowing you down? Our team can follow up with specific solutions.`;
  }

  return `I'm experiencing a technical issue right now. AI typically helps businesses save 15+ hours weekly through automation. What's your biggest time-waster? Our team can follow up with specific solutions.`;
}
