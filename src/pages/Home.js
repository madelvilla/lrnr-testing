// client/src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <h1>Welcome to the Quiz App!</h1>
            <p>Your guided path to programming enlightenment.</p>
            <Link to="/quiz-generation">
                <button>Begin Journey</button>
            </Link>
            <h2>Personalized Quizzes</h2>
            <p>Get quizzes tailored to your needs.</p>
            <h2>Rewarding</h2>
            <p>Earn rewards as you progress.</p>
            <h2>Personal SME</h2>
            <p>Access a subject matter expert to assist you.</p>
        </div>
    );
};

export default Home;
