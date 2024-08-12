// client/src/components/QuizGeneration.js
import React, { useState } from 'react';
import axios from 'axios';

const QuizGeneration = () => {
    const [topic, setTopic] = useState('');
    const [expertise, setExpertise] = useState('');
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [style, setStyle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('/api/quiz/generate', {
            topic,
            expertise,
            numberOfQuestions,
            style
        });
        console.log(response.data); // Handle the quiz data
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
            <input type="text" placeholder="Expertise Level" value={expertise} onChange={(e) => setExpertise(e.target.value)} />
            <input type="number" placeholder="Number of Questions" value={numberOfQuestions} onChange={(e) => setNumberOfQuestions(e.target.value)} />
            <input type="text" placeholder="Style" value={style} onChange={(e) => setStyle(e.target.value)} />
            <button type="submit">Generate Quiz</button>
        </form>
    );
};

export default QuizGeneration;
