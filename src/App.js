// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import QuizGeneration from './pages/QuizGeneration';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import AccountPage from './pages/AccountPage';

function App() {
    return (
        <>
        <Router>
        <div className='header'>
            <Nav />
        <div className='page-content'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz-generation" element={<QuizGeneration />} />
                <Route path="/quiz/:quizId" element={<QuizPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/account" element={<AccountPage />} />
            </Routes>
              </div>
        </div>    
        <Footer />
        </Router>
        </>
    );
}

export default App;
