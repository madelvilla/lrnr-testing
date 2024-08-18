// npm package imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const port = 4000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Serve static files
app.use(express.static(path.join(__dirname, 'public')));


app.post("/test", (req, res) => {
    console.log("POST /test route accessed");
    console.log("Request body:", req.body);
    res.json({ message: "Test route working!" });
});

app.post('/generate-trivia', async (req, res) => {
    try {
      const { quizTopic, expertiseLevel, numberOfQuestions, styleOfQuestions } = req.body;
      console.log('Generating trivia...', { quizTopic, expertiseLevel, numberOfQuestions, styleOfQuestions });
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
                text: `Generate ${numberOfQuestions} trivia questions on the topic of "${quizTopic}" tailored to an ${expertiseLevel} level audience. Questions should be styled as ${styleOfQuestions}. Provide the answer to the questions after the question, make sure that the answer to questions are simple sentences with a maximum of three words,  preferably though they will be one word answers. Also provide an explanation for each question after the answer.`
              }
            ]
          }
        ]
      };
      console.log(requestBody);

      const response = await axios.post('https://api.anthropic.com/v1/messages', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY, 
          'anthropic-version': '2023-06-01'
        }
      });
  
      res.json(response.data); 
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({ error: 'Failed to generate trivia questions' }); // Send an error response
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});