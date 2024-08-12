// client/src/components/ResultsPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultsPage = () => {
    const location = useLocation();
    const { answers } = location.state || { answers: [] }; // Get answers from state
    const navigate = useNavigate();

    const totalQuestions = answers.length; // Total number of questions
    const correctAnswers = answers.filter(answer => answer.isCorrect).length; // Assuming answers are objects with isCorrect property

    return (
        <div className="results-page">
            <h2>Quiz Results</h2>
            <p>You answered {correctAnswers} out of {totalQuestions} correctly!</p>

            <div className="results-summary">
                {answers.map((answer, index) => (
                    <div key={index} className={`result-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                        <p>Question {index + 1}: {answer.question}</p>
                        <p>Your Answer: {answer.selectedAnswer}</p>
                        {answer.isCorrect ? <p className="correct">✔️ Correct!</p> : <p className="incorrect">❌ Incorrect</p>}
                    </div>
                ))}
            </div>

            <button onClick={() => navigate('/quiz-generation')}>Try Again</button>
        </div>
    );
};

export default ResultsPage;
