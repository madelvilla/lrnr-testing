require('dotenv').config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const nodemon = require("nodemon");
const { Anthropic } = require("@anthropic-ai/sdk");
const path = require("path");

const port = 3000;

const app = express();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.post("/generate-quiz", async (req, res) => {
    const { quizTopic, expertise, numberOfQuestions, styleOfQuestions } = req.body;
    
    try{
        const prompt = `Generate ${numberOfQuestions} questions quiz on ${quizTopic} at an ${expertise} level, in the style of ${styleOfQuestions}.`;

        const response = await anthropic.complete({
            prompt: `Claude, ${prompt}`,
            max_tokens: 500
        });

        res.json({ quiz: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error generating quiz."});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
