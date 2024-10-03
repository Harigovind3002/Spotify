import React from 'react';
import './herosection.css';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/LoginPage');  // Navigates to the /login route
      };
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Experience Music Like Never Before</h1>
        <p>Stream, Discover, and Enjoy Your Favorite Tunes Anytime, Anywhere.</p>
       <button className="hero-btn" onClick={handleLoginClick}>Get Started</button>
      </div>
    </div>
  );
};

export default HeroSection;
