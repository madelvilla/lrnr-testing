import React, { useState } from 'react';
import './Quiz.css';

const Quiz = () => {
    // Define state for quiz options
    // Start quiz options with default values
    const [quizOptions, setQuizOptions] = useState({
        quizTopic: 'golang',
        expertiseLevel: 'novice',
        numberOfQuestions: '5',
        styleOfQuestions: 'normal'
    });
    
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);

   // Handle option change event
    const handleOptionChange = (e) => {
        setQuizOptions({ ...quizOptions, [e.target.name]: e.target.value });
    };

    // Handle quiz submit event
    const handleQuizSubmit = async (e) => {
        // Prevent default form submission
        e.preventDefault();
        try {
            // Send POST request to /generate-quiz endpoint
            const response = await fetch('http://localhost:3000/generate-trivia', {
                // Set content type to application/json and body to quizOptions(stringified)
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quizOptions),
            });
            // Check if request was successful and if not throw error
            if (!response.ok) {
                throw new Error('Failed to generate quiz');
            }

            // Get response data
            const data = await response.json();
            console.log(data);
            // Set questions in state
            const formattedQuestions = formatQuestions(data.content[0].text);
            setQuestions(formattedQuestions);
            console.log(formattedQuestions)

        // Catch any errors and log to console
        } catch (error) {
            console.error('Error generating quiz:', error);
        }
    };

    // Format questions function
    const formatQuestions = (text) => {
        const questionPattern = /(\d+)\.\s(.+?)(?=\d+\.|$)/gs;
        const answerPattern = /([a-d])\)\s(.+)/g;
        let match;
        const questionsArray = [];

        while ((match = questionPattern.exec(text)) !== null) {
            const questionText = match[2].trim();
            const answers = [...match[0].matchAll(answerPattern)].map(answerMatch => ({
                option: answerMatch[1],
                text: answerMatch[2]
            }));

            questionsArray.push({
                question: questionText,
                answers: answers
            });
        }
        return questionsArray;
    };


    // Handle answer select functions
    const handleAnswerSelect = (answer) => {
        setUserAnswers({ ...userAnswers, [currentQuestionIndex]: answer });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleQuizSubmission = () => {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
        setQuizSubmitted(true);
    };

    return (
        <div className="quiz-container">
            {/* If question length is 0, show quiz form  */}
            {questions.length === 0 ? (
                <div className="quiz-form">
                    <h1>Quiz Generation Options</h1>
                    <p>Please choose your preferences below to generate your personalized quiz</p>
                    <form onSubmit={handleQuizSubmit}>
                        <div className="form-group">
                            <label htmlFor="quizTopic">Topic</label>
                            <select id="quizTopic" name="quizTopic" value={quizOptions.quizTopic} onChange={handleOptionChange}>
                                <option value="golang">Golang</option>
                                <option value="aws">AWS</option>
                                <option value="javascript">Javascript</option>
                                <option value="ci-cd">CI/CD</option>
                                <option value="home-gardens">Home Gardens</option>
                                <option value="coffee">Coffee</option>
                                <option value="finger-foods">Finger Foods</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="expertiseLevel">Expertise</label>
                            <select id="expertiseLevel" name="expertiseLevel" value={quizOptions.expertiseLevel} onChange={handleOptionChange}>
                                <option value="novice">Novice</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="numberOfQuestions">Number of Questions</label>
                            <select id="numberOfQuestions" name="numberOfQuestions" value={quizOptions.numberOfQuestions} onChange={handleOptionChange}>
                                <option className='option' value="5">5</option>
                                <option className='option' value="10">10</option>
                                <option className='option' value="15">15</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="styleOfQuestions">Style of Questions</label>
                            <select id="styleOfQuestions" name="styleOfQuestions" value={quizOptions.styleOfQuestions} onChange={handleOptionChange}>
                                <option className='option' value="normal">Normal</option>
                                <option className='option' value="master-oogway">Master Oogway</option>
                                <option className='option' value="1940-gangster">1940's Gangster</option>
                                <option className='option' value="8year-old">Like I am an 8 Year Old</option>
                                <option className='option' value="jedi">Jedi</option>
                                <option className='option' value="jack-sparrow">Captain Jack Sparrow</option>
                                <option className='option' value="matthew-mcconaughey">Matthew McConaughey</option>
                            </select>
                        </div>
                        <button className="submit-btn" type="submit">Submit</button>
                    </form>
                </div>
            // If question length is not 0, show quiz
            ) : (
                <div className="quiz-display">
                    {!quizSubmitted ? (
                        <>
                            <h1 className='question-index'>{currentQuestionIndex + 1} of {questions.length}</h1>
                            <h1 className='question-title'>Question</h1>
                            <p className='question-text'>{questions[currentQuestionIndex].question}</p>
                            <h1 className="answer-title">Your Answer</h1>
                            <input className="answer-input" type="text" placeholder='Enter your answer' value={userAnswers[currentQuestionIndex] || ''} onChange={(e) => handleAnswerSelect(e.target.value)} />
                            <div className="navigation-buttons">
                                <button className="nav-btn" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
                                <button className="nav-btn" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
                            </div>
                            {currentQuestionIndex === questions.length - 1 && (
                                <button onClick={handleQuizSubmission}>Submit Quiz</button>
                            )}
                        </>
                    ) : (
                        <div className="quiz-results">
                            <h2>Quiz Results</h2>
                            <p>Your score: {score} out of {questions.length}</p>
                            <ul>
                                {questions.map((question, index) => (
                                    <li key={index}>
                                        <p>{question.question}</p>
                                        <p>Your answer: {userAnswers[index]}</p>
                                        <p>Correct answer: {question.correctAnswer}</p>
                                        <p>{userAnswers[index] === question.correctAnswer ? 'Correct!' : 'Incorrect'}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;