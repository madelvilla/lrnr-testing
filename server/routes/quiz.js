// // server/routes/quiz.js
// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// const ANTHROPIC_API_KEY = 'Api Key here'; // Add your key here

// router.post('/generate', async (req, res) => {
//     const { topic, expertise, numberOfQuestions, style } = req.body;

//     try {
//         const response = await axios.post('https://api.anthropic.com/v1/complete', {
//             model: 'claude',
//             prompt: `Generate a quiz on ${topic} for ${expertise} level with ${numberOfQuestions} questions in ${style} style.`,
//             max_tokens: 500,
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${ANTHROPIC_API_KEY}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         res.json(response.data);
//     } catch (error) {
//         res.status(500).send('Error generating quiz');
//     }
// });

// module.exports = router;
