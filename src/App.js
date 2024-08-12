// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import QuizGeneration from './components/QuizGeneration';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import AccountPage from './components/AccountPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz-generation" element={<QuizGeneration />} />
                <Route path="/quiz/:quizId" element={<QuizPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/account" element={<AccountPage />} />
            </Routes>
        </Router>
    );
}

export default App;
