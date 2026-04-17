const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function askGroq(messages, options = {}) {
  const res = await groq.chat.completions.create({
    model: options.model || 'llama-3.3-70b-versatile',
    messages,
    temperature: options.temperature || 0.7,
    max_tokens: options.max_tokens || 2048,
  });
  return res.choices[0].message.content;
}

module.exports = { groq, askGroq };
