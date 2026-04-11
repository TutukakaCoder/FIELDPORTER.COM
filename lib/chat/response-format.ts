export const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

export const formatChatResponse = (content: string): string => {
  let processedContent = content;

  const multipleModelPatterns = [
    /Claude 4 Opus|Claude Opus 4/gi,
    /GPT-4 Turbo/gi,
    /Gemini 2\.5 Pro/gi,
  ];

  multipleModelPatterns.forEach((pattern) => {
    if (pattern.test(processedContent)) {
      processedContent = processedContent.replace(
        pattern,
        "Claude, GPT-4, Gemini, and DeepSeek",
      );
    }
  });

  const false3DCapabilityPatterns = [
    /NVIDIA\s+Omniverse/gi,
    /Blender\s+(scripting|automation|workflows)/gi,
    /Unity\s+(rendering|workflows|optimisation)/gi,
    /(built|developed|created)\s+.*3D.*pipelines?/gi,
  ];

  const hasFalse3DClaim = false3DCapabilityPatterns.some((pattern) =>
    pattern.test(processedContent),
  );

  if (hasFalse3DClaim) {
    processedContent =
      "That's outside our current service focus. We specialize in strategic research, AI implementation, and workflow automation. What specific business challenge are you looking to solve?";
  }

  const falseWorkPatterns = [
    /gaming\s+(client|project|work)/gi,
    /AR\/VR\s+(client|project|work)/gi,
    /visual\s+effects\s+(client|project|work)/gi,
    /40%.*production.*time.*reduction/gi,
    /8\s+hours?\s+to\s+90\s+minutes?/gi,
    /GPU.*optimisation.*for.*clients/gi,
    /(built|developed|created)\s+.*(?:gaming|3D|VR|AR).*(?:pipelines?|workflows?|systems?)/gi,
  ];

  const hasFalseWork = falseWorkPatterns.some((pattern) =>
    pattern.test(processedContent),
  );

  if (hasFalseWork) {
    processedContent = `Here are some real examples of our work:

• Self-Development Platform: 12 months live, 1,000+ daily interactions, 15 hours weekly saved through automation
• VOYCAP Investment News: Improved image success from 30% to 85%, AI content summarisation  
• Lead Generation Platform: 85% email classification accuracy, 70% reduction in manual review time
• Strategic Research: Market entry analysis, VC portfolio validation frameworks

Our services include strategic research ($500-$3,000), rapid development ($3,000-$8,000), and workflow optimization ($2,000-$5,000). What type of challenge are you facing?`;
  }

  const bookingPatterns = [
    /I('ll|'ll|'ll|\s+will)\s+(send|resend|email)\s+(you\s+)?a?\s+(calendar\s+)?(invite|meeting|appointment)/gi,
    /I('ll|'ll|'ll|\s+will)\s+book\s+(you\s+)?a?\s+(meeting|appointment|call)/gi,
    /I('ll|'ll|'ll|\s+will)\s+schedule\s+(you\s+)?a?\s+(meeting|appointment|call)/gi,
    /I('ll|'ll|'ll|\s+will)\s+set\s+up\s+(a\s+)?(meeting|appointment|call)/gi,
    /calendar\s+invite.*(is\s+)?(on\s+its\s+way|sent|coming)/gi,
    /zoom\s+invite.*(is\s+)?(on\s+its\s+way|sent|coming)/gi,
    /let\s+me\s+(resend|send).*(invite|meeting)/gi,
  ];

  const hasBookingClaim = bookingPatterns.some((pattern) =>
    pattern.test(processedContent),
  );

  if (hasBookingClaim) {
    processedContent =
      "I can help connect you with FIELDPORTER's team. Please use the contact page or 'Book Consultation' button to schedule a discussion about your specific needs.";
  }

  if (
    processedContent.includes("fieldporter.com/consult") ||
    processedContent.includes("direct link again") ||
    processedContent.includes("here's the direct link")
  ) {
    processedContent =
      "Please use the 'Book Consultation' button below to connect with our team directly.";
  }

  if (
    processedContent.includes("automate workflows") &&
    !processedContent.includes("strategic research")
  ) {
    processedContent = processedContent.replace(
      /automate workflows?/gi,
      "automate workflows using React, Firebase, and AI tools like Claude and DeepSeek",
    );
  }

  if (
    processedContent.includes("@") &&
    !processedContent.includes("Frederick")
  ) {
    processedContent +=
      " I'll make sure Frederick reaches out within 24 hours to discuss your specific needs.";
  }

  return processedContent
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\*{3,}(.*?)\*{3,}/g, "$1")
    .replace(/\*{2,}(.*?)\*{2,}/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/^\s*\*{4,}\s*$/gm, "")
    .replace(/\*{2,}/g, "")
    .replace(/^\s*[-*]\s+/gm, "• ")
    .replace(/^\s*•\s+/gm, "• ")
    .replace(/[•●◦▪▫]/g, "•")
    .replace(/[→←↑↓]/g, "->")
    .replace(/[✓✔]/g, "✓")
    .replace(/[✗✘]/g, "✗")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\.\s{2,}/g, ". ")
    .replace(/\s+\*\s+/g, " ")
    .replace(/^\*\s*/gm, "")
    .replace(/\s*\*$/gm, "")
    .replace(
      /(?:https?:\/\/)?(?:www\.)?fieldporter\.com\/(?!contact)\S+/gi,
      "our contact page",
    )
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim();
};
