import React from 'react';
import FeatureCard from './FeatureCard';
import '../styles/FeatureSection.css';

const FeatureSection = ({ features, onFeatureClick }) => {
  return (
    <section id="features" className="features">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          id={feature.id}
          title={feature.title}
          description={feature.description}
          image={feature.image}
          onClick={onFeatureClick}
        />
      ))}
    </section>
  );
};

export default FeatureSection;