// ============================================================
//  SERVER.JS – Backend API for Review Generator
// ============================================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- SECURITY MIDDLEWARE ----------
app.use(helmet());

// CORS: Allow your frontend
const allowedOrigins = ['https://nbc-frontend-n9rv.vercel.app'];
// Add your deployed frontend URL when hosted
// allowedOrigins.push('https://your-frontend-domain.com');

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS not allowed'), false);
    }
    return callback(null, true);
  }
}));

// Rate Limiting: 100 requests per hour per IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again after an hour.',
});
app.use('/api/', limiter);

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.use(express.json({ limit: '10kb' }));

// ---------- API KEY CHECK ----------
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('❌ ERROR: GEMINI_API_KEY is not set in .env file!');
  console.error('Please create a .env file with: GEMINI_API_KEY=your-key-here');
  process.exit(1);
}
console.log('✅ Gemini API key loaded');

// ---------- HEALTH CHECK ----------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Review Generator API is running!' });
});

// ---------- MAIN GENERATION ENDPOINT ----------
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, shopCode, businessName } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log(`📝 Request from: ${shopCode || 'unknown'} | Business: ${businessName || 'unknown'}`);

    // Call Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
        ],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 200,
          topP: 0.95,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', errorData);
      return res.status(response.status).json({ error: 'Gemini API error' });
    }

    const data = await response.json();
    let review = data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    if (!review) {
      return res.status(500).json({ error: 'Failed to generate review' });
    }

    // Clean up
    review = review.replace(/\s+/g, ' ').trim();
    review = review.charAt(0).toUpperCase() + review.slice(1);
    if (!/[.!?]$/.test(review)) review += '.';

    console.log(`✅ Review generated for: ${shopCode || 'unknown'} (${review.length} chars)`);

    res.json({ success: true, review: review });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health`);
  console.log(`📍 Generate: http://localhost:${PORT}/api/generate`);
});