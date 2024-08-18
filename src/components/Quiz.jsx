import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import './Quiz.css';

const Quiz = () => {
    // Define state for quiz options
    // Start quiz options with default values
    const [quizOptions, setQuizOptions] = useState({
        quizTopic: '',
        expertiseLevel: '',
        numberOfQuestions: '',
        styleOfQuestions: ''
    });
    
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);


   // Handle option change event
    const handleOptionChange = (e) => {
        setQuizOptions({ ...quizOptions, [e.target.name]: e.target.value });
    };

    // Handle quiz submit event
    const handleQuizSubmit = async (e) => {
        // Prevent default form submission
        console.log('Submitting quiz...');
        e.preventDefault();
        try {
            // Send POST request to /generate-quiz endpoint
            console.log('Sending POST request to /generate-trivia endpoint');
            const response = await fetch('http://localhost:4000/generate-trivia', {
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
            console.log('Got response data:', data);

            // Set questions in state
            const formattedQuestions = formatQuestions(data.content[0].text);
            setQuestions(formattedQuestions);

        // Catch any errors and log to console
        } catch (error) {
            console.error('Error generating quiz:', error);
        }
    };

    // Format questions function
    const formatQuestions = (text) => {
    
        // Define regex patterns
        const questionPattern = /(\d+)\.\s(.+?)(?=\d+\.|$)/gs;
        const answerPattern = /Answer:\s(.+)/;
        const explanationPattern = /Explanation:\s(.+)/; 
        let match;
        const questionsArray = [];
        
        while ((match = questionPattern.exec(text)) !== null) {
            const questionText = match[2].trim();
            const answerMatch = questionText.match(answerPattern);
            const explanationMatch = questionText.match(explanationPattern); // Match explanation
            const questionWithoutAnswer = questionText.replace(answerPattern, '').replace(explanationPattern, '').trim();
            const correctAnswer = answerMatch ? answerMatch[1].trim() : '';
            const explanation = explanationMatch ? explanationMatch[1].trim() : ''; // Extract explanation
    
            questionsArray.push({
                question: questionWithoutAnswer,
                correctAnswer: correctAnswer,
                explanation: explanation, 
            });
        }
        return questionsArray;
    };
     

    // Handle answer select functions
    const handleAnswerSelect = (answer) => {
        setUserAnswers({ ...userAnswers, [currentQuestionIndex]: { answer } });
    };
    
    
    const handleNextQuestion = () => {
        const userAnswer = userAnswers[currentQuestionIndex]?.answer || '';
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    
        const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    
        setUserAnswers({
            ...userAnswers,
            [currentQuestionIndex]: { answer: userAnswer, isCorrect: isCorrect }
        });

        setShowFeedback(true);
    };
    
    const handleProceedToNextQuestion = () => {
        setShowFeedback(false);
    
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizSubmitted(true);
        }
    };
    
    const handleQuizSubmission = () => {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (userAnswers[index]?.isCorrect) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
        setQuizSubmitted(true);
    };

    // Materialize select dropdown
    useEffect(() => {
        M.FormSelect.init(document.querySelectorAll('select'));
    })

    return (
        <div className="quiz-container">
            {/* If question length is 0, show quiz form  */}
            {questions.length === 0 ? (
                <div className="quiz-form">
                    <h1>Quiz Generation Options</h1>
                    <p>Please choose your preferences below to generate your personalized quiz</p>
                    <form onSubmit={handleQuizSubmit}>
                        <div className="form-group input-field col s12">
                            <select id="quizTopic" name="quizTopic" value={quizOptions.quizTopic} onChange={handleOptionChange}>
                                <option value="" disabled selected></option>
                                <option value="golang">Golang</option>
                                <option value="aws">AWS</option>
                                <option value="javascript">Javascript</option>
                                <option value="ci-cd">CI/CD</option>
                                <option value="home-gardens">Home Gardens</option>
                                <option value="coffee">Coffee</option>
                                <option value="finger-foods">Finger Foods</option>
                            </select>
                            <label htmlFor="quizTopic">Topic</label>
                        </div>
                        <div className="form-group input-field col s12">
                            <select id="expertiseLevel" name="expertiseLevel" value={quizOptions.expertiseLevel} onChange={handleOptionChange}>
                                <option value="" disabled selected></option>
                                <option value="novice">Novice</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                            <label htmlFor="expertiseLevel">Expertise</label>
                        </div>
                        <div className="form-group input-field col s12">
                            <select id="numberOfQuestions" name="numberOfQuestions" value={quizOptions.numberOfQuestions} onChange={handleOptionChange}>
                                <option value="" disabled selected></option>
                                <option className='option' value="5">5</option>
                                <option className='option' value="10">10</option>
                                <option className='option' value="15">15</option>
                            </select>
                            <label htmlFor="numberOfQuestions">Number of Questions</label>
                        </div>
                        <div className="form-group input-field col s12">
                            <select id="styleOfQuestions" name="styleOfQuestions" value={quizOptions.styleOfQuestions} onChange={handleOptionChange}>
                                <option value="" disabled selected></option>
                                <option className='option' value="normal">Normal</option>
                                <option className='option' value="master-oogway">Master Oogway</option>
                                <option className='option' value="1940-gangster">1940's Gangster</option>
                                <option className='option' value="8year-old">Like I am an 8 Year Old</option>
                                <option className='option' value="jedi">Jedi</option>
                                <option className='option' value="jack-sparrow">Captain Jack Sparrow</option>
                                <option className='option' value="matthew-mcconaughey">Matthew McConaughey</option>
                            </select>
                            <label htmlFor="styleOfQuestions">Style of Questions</label>
                        </div>
                        <button className="submit-btn btn waves-effect waves-light" type="submit">Submit</button>
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
                            <input
                                className="answer-input"
                                type="text"
                                placeholder='Enter your answer'
                                value={userAnswers[currentQuestionIndex]?.answer || ''}
                                onChange={(e) => handleAnswerSelect(e.target.value)}
                                disabled={showFeedback} 
                            />
                            {showFeedback ? (
                            <div className='feedback-div'>
                                <h1 className='feedback-title'>Verner's Evaluation</h1>
                                <p className='is-correct'>{userAnswers[currentQuestionIndex].isCorrect ? 'Correct!' : 'Incorrect'}</p>
                                <p className='explanation-text'>{questions[currentQuestionIndex].explanation}</p> {/* Show explanation */}
                                <button className="question-submission btn waves-effect waves-light" onClick={handleProceedToNextQuestion}>
                                    {currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next'}
                                </button>
                            </div>
                            ) : (
                                <button className="question-submission btn waves-effect waves-light" onClick={handleNextQuestion}>
                                    Submit Question
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="quiz-results">
                            <h2>Quiz Results</h2>
                            <p>Your score: {score} out of {questions.length}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;
