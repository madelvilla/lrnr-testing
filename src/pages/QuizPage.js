// client/src/components/QuizPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizPage = () => {
    const { quizId } = useParams(); // Assume quizId is used to fetch quiz data
    const [quizData, setQuizData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch quiz data using quizId (simulated as quizId here for demo)
        const fetchQuizData = async () => {
            const response = await axios.get(`/api/quiz/${quizId}`); // Adjust endpoint as necessary
            setQuizData(response.data);
        };
        fetchQuizData();
    }, [quizId]);

    const handleAnswerSelect = (answer) => {
        setUserAnswers([...userAnswers, answer]);
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // If the last question, navigate to results
            navigate('/results', { state: { answers: userAnswers } });
        }
    };

    if (!quizData) {
        return <div>Loading...</div>;
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];

    return (
        <div className="quiz-page">
            <h2>{quizData.title}</h2>
            <p>{currentQuestion.question}</p>
            <div className="answer-options">
                {currentQuestion.answers.map((answer, index) => (
                    <button key={index} onClick={() => handleAnswerSelect(answer)}>
                        {answer}
                    </button>
                ))}
            </div>
            <div className="question-info">
                <p>Question {currentQuestionIndex + 1} of {quizData.questions.length}</p>
            </div>
        </div>
    );
};

export default QuizPage
