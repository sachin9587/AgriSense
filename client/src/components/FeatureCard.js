import React from 'react';
import '../styles/FeatureCard.css';

const FeatureCard = ({ id, title, description, image, onClick }) => {
  return (
    <div className="feature-card" onClick={() => onClick(id)}>
      <div className="feature-image">
        <img src={image} alt={title} />
      </div>
      <div className="feature-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="feature-link">Learn more →</span>
      </div>
    </div>
  );
};

export default FeatureCard;