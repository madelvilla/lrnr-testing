import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Nav.css';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="lrnr-link">
      <Link to="/" onClick={() => setIsOpen(false)}>lrnr</Link>
      </div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/Account" onClick={() => setIsOpen(false)}>Account</Link></li>
          <li><Link to="/quiz-generation" onClick={() => setIsOpen(false)}>Quiz Generation</Link></li>
        </ul>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
}

export default Nav;