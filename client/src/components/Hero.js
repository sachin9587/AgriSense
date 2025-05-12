import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const routeToFieldManager = () => {
    navigate('/fields');
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Smart Farming Solutions</h1>
        <p>Monitor your crops, maximize your yield, and make data-driven decisions with our advanced crop monitoring system.</p>
        <button 
          className="cta-button" 
          onClick={routeToFieldManager}
        >
          Manage Your Fields
        </button>
      </div>
    </section>
  );
};

export default Hero;