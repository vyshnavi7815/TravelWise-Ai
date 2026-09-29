import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

// Server-side Gemini API route
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: 'API key not configured' });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const { prompt, context } = req.body;
    const systemPrompt = `You are TravelWise AI, an intelligent, empathetic AI travel assistant.
The traveler is planning a trip to ${context?.destination || 'India'}.
Total Budget: ₹${context?.totalBudget || 15000}.
Travellers: ${context?.travellers || 2}.
Remaining Budget: ₹${context?.remainingBudget || 3000}.
Language code: ${context?.language || 'en'}.
Rules:
1. Always keep budget safety as the top priority.
2. Recommend realistic local food, attractions, and cost-effective transport.
3. Keep responses concise (under 120 words), actionable, and friendly.
4. Reply in the user's selected language (${context?.language || 'en'}).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({ error: error?.message || 'Gemini processing failed' });
  }
});

async function startServer() {
  const port = Number(process.env.PORT) || 3000;

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`TravelWise AI server running on port ${port}`);
  });
}

startServer();
