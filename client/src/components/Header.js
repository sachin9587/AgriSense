import React from 'react';
import Logo from './Logo';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <nav>
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;