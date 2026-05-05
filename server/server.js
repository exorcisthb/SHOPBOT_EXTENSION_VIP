// server.js - Backend proxy cho ShopBot Extension

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: '*', methods: ['POST', 'GET'] }));

// XÃ¡c thá»±c extension secret
function authMiddleware(req, res, next) {
  const token = req.headers['x-extension-secret'];
  if (!token || token !== process.env.EXTENSION_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Rate limiting Ä‘Æ¡n giáº£n
const rateLimit = new Map();
const RATE_LIMIT = 30;
const RATE_WINDOW = 60000;

function rateLimitMiddleware(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return next();
  }
  if (entry.count >= RATE_LIMIT) {
    return res.status(429).json({ error: 'QuÃ¡ nhiá»u request, thá»­ láº¡i sau 1 phÃºt.' });
  }
  entry.count++;
  next();
}

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'ShopBot Proxy' });
});

// Proxy gá»i AI API (Há»— trá»£ cáº£ Gemini vÃ  OpenRouter)
app.post('/api/chat', authMiddleware, rateLimitMiddleware, async (req, res) => {
  try {
    const { system, messages, model } = req.body;
    let targetModel = String(model || 'gemini-2.5-flash').trim();

    if (targetModel === 'auto') {
      targetModel = 'gemini-2.5-flash';
    }

    if (targetModel === 'qwen/qwen3-coder-480b-a35b-instruct:free') {
      targetModel = 'qwen/qwen3-coder:free';
    }

    const geminiModels = new Set([
      'gemini-2.5-flash',
      'gemini-3-flash-preview',
      'gemma-3-12b-it',
      'gemma-3-27b-it'
    ]);

    const openRouterModels = new Set([
      'qwen/qwen3-coder:free',
      'openai/gpt-oss-120b:free'
    ]);

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Thiáº¿u messages' });
    }

    console.log('[ShopBot API] model:', targetModel, 'provider:', openRouterModels.has(targetModel) ? 'openrouter' : 'gemini');

    // --- Xá»¬ LÃ OPENROUTER ---
    if (openRouterModels.has(targetModel)) {
      const openRouterApiKey = process.env.OPENROUTER_API_KEY;
      if (!openRouterApiKey) {
        return res.status(500).json({ error: 'Server chÆ°a cáº¥u hÃ¬nh OPENROUTER_API_KEY' });
      }

      // Chuyá»ƒn Ä‘á»•i format sang OpenRouter (OpenAI vision format)
      const openRouterMessages = [{ role: 'system', content: system || '' }];

      for (const msg of messages) {
        let content;
        if (typeof msg.content === 'string') {
          content = msg.content;
        } else if (Array.isArray(msg.content)) {
          content = msg.content.map(item => {
            if (item.type === 'text') return { type: 'text', text: item.text };
            if (item.type === 'image' && item.source?.type === 'base64') {
              return {
                type: 'image_url',
                image_url: {
                  url: `data:${item.source.media_type};base64,${item.source.data}`
                }
              };
            }
            return null;
          }).filter(Boolean);
        }
        openRouterMessages.push({ role: msg.role, content });
      }

      const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterApiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://shopbot-extension.com", // Required by OpenRouter
          "X-Title": "ShopBot Extension"
        },
        body: JSON.stringify({
          model: targetModel,
          messages: openRouterMessages,
          temperature: 0.7
        })
      });

      if (!openRouterRes.ok) {
        const err = await openRouterRes.json().catch(() => ({}));
        return res.status(openRouterRes.status).json({
          error: err?.error?.message || `OpenRouter API lá»—i ${openRouterRes.status}`
        });
      }

      const data = await openRouterRes.json();
      return res.json({ text: data.choices?.[0]?.message?.content || '' });
    }

    if (!geminiModels.has(targetModel)) {
      return res.status(400).json({ error: `Model chÆ°a há»— trá»£: ${targetModel}` });
    }

    // --- Xá»¬ LÃ GEMINI (Máº¶C Äá»ŠNH) ---
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server chÆ°a cáº¥u hÃ¬nh GEMINI_API_KEY' });
    }

    // Chuyá»ƒn Ä‘á»•i format sang Gemini (Giá»¯ nguyÃªn logic cÅ© cá»§a báº¡n)
    const contents = [];
    const systemText = system || '';

    for (const msg of messages) {
      const role = msg.role === 'assistant' ? 'model' : 'user';
      const parts = [];

      if (typeof msg.content === 'string') {
        const text = (role === 'user' && contents.length === 0 && systemText)
          ? systemText + '\n\n' + msg.content
          : msg.content;
        parts.push({ text });
      } else if (Array.isArray(msg.content)) {
        for (const item of msg.content) {
          if (item.type === 'text') {
            const text = (role === 'user' && contents.length === 0 && systemText)
              ? systemText + '\n\n' + item.text
              : item.text;
            parts.push({ text });
          } else if (item.type === 'image' && item.source?.type === 'base64') {
            parts.push({
              inline_data: {
                mime_type: item.source.media_type,
                data: item.source.data
              }
            });
          }
        }
      }

      if (parts.length > 0) contents.push({ role, parts });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            maxOutputTokens: 8192,
            temperature: 0.7
          }
        })
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.json().catch(() => ({}));
      return res.status(geminiRes.status).json({
        error: err?.error?.message || `Gemini API lá»—i ${geminiRes.status}`
      });
    }

    const data = await geminiRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.json({ text });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`âœ… ShopBot proxy cháº¡y táº¡i http://localhost:${PORT}`);
});
