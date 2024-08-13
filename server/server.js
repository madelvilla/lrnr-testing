// npm package imports
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import axios from 'axios';
import { Anthropic } from '@anthropic-ai/sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get("/", (req, res) => {
    console.log("GET / route accessed");
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/test", (req, res) => {
    console.log("POST /test route accessed");
    console.log("Request body:", req.body);
    res.json({ message: "Test route working!" });
});

app.post('/generate-trivia', async (req, res) => {
    try {
      const { topic, expertiseLevel, questionCount, questionStyle } = req.body;
      
      // Example customization based on the provided parameters
      // Adjust the request body according to the Anthropic API documentation
      const requestBody = {
        model: "claude-3-opus-20240229",
        max_tokens: 2000,
        temperature: 0.5,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Generate ${questionCount} trivia questions on the topic of "${topic}" tailored to an ${expertiseLevel} level audience. Questions should be styled as ${questionStyle}.`
              }
            ]
          }
        ]
      };
  
      const response = await axios.post('https://api.anthropic.com/v1/messages', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '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', 
          'anthropic-version': '2023-06-01'
        }
      });
  
      res.json(response.data); // Send the response data back to the client
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({ error: 'Failed to generate trivia questions' }); // Send an error response
    }
  });

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});