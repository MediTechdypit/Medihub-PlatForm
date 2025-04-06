import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import winston from 'winston';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_API_ENDPOINT = process.env.GEMINI_API_ENDPOINT;
const API_KEY = process.env.GEMINI_API_KEY;

app.use(bodyParser.json());
app.use(cors());

// ✅ Logger setup using winston
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'server.log' })
//   ]
// });

// ✅ Rate limiter to prevent abuse
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 10, // Limit each IP to 10 requests per minute
//   message: { error: "❌ Too many requests, please try again later." }
// });
// app.use(limiter);

// ✅ List of NON-MEDICAL terms (to filter out non-relevant queries)
const nonMedicalKeywords = [
  "math", "calculation", "weather", "sports", "news", "technology", "movies", "music", "politics", "history",
  "business", "finance", "stocks", "gaming", "coding","code","cooking", "travel", "food", "recipes", "jokes", "random",
  "gossip", "fashion", "shopping", "celebrities", "entertainment", "memes", "crypto", "AI programming",
  "2+2", "sum of", "capital of", "president of", "translate", "who invented", "meaning of"
];

// ✅ Function to check if a prompt contains non-medical keywords
const containsNonMedicalKeywords = (text) => {
  const lowerText = text.toLowerCase();
  return nonMedicalKeywords.some(keyword => lowerText.includes(keyword));
};

// ✅ Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: "✅ Server is running!",
    API_KEY: API_KEY ? "✅ Loaded" : "❌ Not Found",
    GEMINI_API_ENDPOINT: GEMINI_API_ENDPOINT ? "✅ Loaded" : "❌ Not Found"
  });
});

// ✅ Gemini AI endpoint with non-medical filtering
app.post('/gemini', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "❌ No prompt provided." });
  }

  // Check for non-medical terms
  if (containsNonMedicalKeywords(prompt)) {
    return res.status(400).json({ error: "❌ Your query is not related to medical topics. Please ask a health-related question." });
  }

  try {
    const response = await axios.post(`${GEMINI_API_ENDPOINT}?key=${API_KEY}`, {
      contents: [
        {
          parts: [
            {
              text: `${prompt}. Provide the response in a complete sentence. The response should be in a clear, concise format with each point on a new line. If the answer exceeds 4 points, then only summarize it into exactly 3 to 4 key points. Response should be user-friendly. Add numbering. Each point should be clear and concise. Avoid introductory phrases and inline formatting.`,
            },
          ],
        },
      ],
    });

    const botResponse = response.data?.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';
    res.json({ response: botResponse });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error communicating with Gemini API' });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
