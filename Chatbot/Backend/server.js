import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const API_KEY = 'AIzaSyAcRk3S2UOsEQ-vgv98cppG53cawGYJsYE';

app.post('/gemini', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      `${GEMINI_API_ENDPOINT}?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: `${prompt}. Provide the response in a short, numbered format with each point on a new line. At most 2 points.` }] }],
      }
    );

    const botResponse = response.data?.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';
    //console.log(botResponse);
    res.json({ response: botResponse });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error communicating with Gemini API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
