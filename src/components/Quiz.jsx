import React, { useState } from 'react';
import './Quiz.css';

const Quiz = () => {

    const [topic, setTopic] = useState('');
    const [expertiseLevel, setExpertiseLevel] = useState('');
    const [questionCount, setQuestionCount] = useState(5);
    const [questionStyle, setQuestionStyle] = useState('');
    const [quiz, setQuiz] = useState(null);

  const generateQuiz = async () => {
    try {
      const response = await axios.post('/generate-trivia', {
        topic,
        expertiseLevel,
        questionCount,
        questionStyle,
      });
      setQuiz(response.data);
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  };

    
  return (
    <div className="quiz-container">
        <h1>Quiz Generation Options</h1>
        <p>Please choose your preferences below to generate your personalized quiz</p>
        <form id="quiz-form">
            <div className="form-group">
                <label htmlFor="quiz-topic">Topic</label>
                <select id="quiz-topic" name="quiz-topic">
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
            <label htmlFor="expertise">Expertise</label>
            <select id="expertise" name="expertise">
                <option value="novice">Novice</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>
            </div>
            <div className="form-group">
            <label htmlFor="number-of-questions">Number of Questions</label>
            <select id="number-of-questions" name="number-of-questions">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
            </div>
            <div className="form-group">
            <label htmlFor="style-of-questions">Style of Questions</label>
            <select id="style-of-questions" name="style-of-questions">
                <option value="master-oogway">Master Oogway</option>
                <option value="1940-gangster">1940's Gangster</option>
                <option value="8year-old">Like I am an 8 Year Old</option>
                <option value="normal">Normal</option>
                <option value="jedi">Jedi</option>
                <option value="jack-sparrow">Captain Jack Sparrow</option>
                <option value="matthew-mcconaughey">Matthew McConaughey</option>
            </select>
            </div>
            <button className="submit-btn" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Quiz;