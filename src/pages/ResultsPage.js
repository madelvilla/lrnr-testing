import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultsPage.css';

const ResultsPage = () => {
    const location = useLocation();
    const { answers } = location.state || { answers: [] }; // Get answers from state
    const navigate = useNavigate();

    const totalQuestions = answers.length; // Total number of questions
    const correctAnswers = answers.filter(answer => answer.isCorrect).length; // Assuming answers are objects with isCorrect property

    return (
        <div className="results-page">
            <h2>lrnr</h2>
            <p>Questions Right: {correctAnswers}</p>

            <div className="results-summary">
                {answers.map((answer, index) => (
                    <div key={index} className={`result-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                        <p>Question {index + 1}: {answer.question}</p>
                        <p>Your Answer: {answer.selectedAnswer}</p>
                        {answer.isCorrect ? <p className="correct">✔️ Correct!</p> : <p className="incorrect">❌ Incorrect</p>}
                    </div>
                ))}
            </div>

            <button className='results-button'
            onClick={() => navigate('/quiz-generation')}>TRY ANOTHER QUIZ</button>
        </div>
    );
};

export default ResultsPage;
