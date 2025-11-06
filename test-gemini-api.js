// Quick test script to find correct systemInstruction format
const fetch = require("node:fetch");

async function testAPI() {
  console.log("Testing chat API...");

  const response = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "test",
      sessionId: "test-session",
      conversationHistory: [],
    }),
  });

  const data = await response.json();
  console.log("Response:", data);
}

testAPI().catch(console.error);
