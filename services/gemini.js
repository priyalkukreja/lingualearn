const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askGemini(messages, options = {}) {
  const model = genAI.getGenerativeModel({
    model: options.model || 'gemini-2.0-flash',
    generationConfig: {
      temperature: options.temperature || 0.7,
      maxOutputTokens: options.max_tokens || 2048,
    },
  });

  const systemMsg = messages.find(m => m.role === 'system');
  const chatMessages = messages.filter(m => m.role !== 'system');

  const history = chatMessages.slice(0, -1).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const lastMsg = chatMessages[chatMessages.length - 1];

  const chat = model.startChat({
    history,
    systemInstruction: systemMsg ? { parts: [{ text: systemMsg.content }] } : undefined,
  });

  const result = await chat.sendMessage(lastMsg.content);
  return result.response.text();
}

module.exports = { genAI, askGemini };
