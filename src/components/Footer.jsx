import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
        <p>Embrace the power of our app and unlock the secrets of the universe, one quiz at a time. 
            <br></br>
            As I always say, 'Yesterday is history, tomorrow is a mystery, but today is a gift. 
            <br></br>That is why it is called the present.'</p>
      <div className="footer-links">
        <p>Links</p>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Account">Account</Link></li>
            <li><Link to="/quiz-generation">Quiz Generation</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;