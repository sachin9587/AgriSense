import React from 'react';
// Import images directly to work with React's asset handling
import placeholderImage1 from '../assets/npk.png';
import placeholderImage2 from '../assets/pests.png';
import placeholderImage3 from '../assets/cultivation.png';
import placeholderImage4 from '../assets/finance.png';
import FertilizerCalculation from '../components/FertilizerCalculation';
import FinancialOverview from '../components/FinancialOverviews';
import CropDiseaseInfo from '../components/CropDiseaseInfo';
import CultivationApp from '../components/CultivationTips';
import CultivationTips from '../components/CultivationTips';

export const featureData = [
  {
    id: 'fertilizer',
    title: 'Fertilizer Calculation',
    description: 'Optimize your fertilizer application with precise calculations based on soil analysis, crop requirements, and growth stage.',
    image: placeholderImage1
  },
  {
    id: 'pests',
    title: 'Pests and Diseases',
    description: 'Early detection and identification of pests and diseases with AI-powered image recognition and treatment recommendations.',
    image: placeholderImage2
  },
  {
    id: 'cultivation',
    title: 'Cultivation Tips',
    description: 'Season-specific guides and best practices to enhance crop growth, sustainability, and yield improvement.',
    image: placeholderImage3
  },
  {
    id: 'financial',
    title: 'Financial Overview',
    description: 'Track expenses, analyze profitability, and forecast returns with comprehensive financial analytics tools.',
    image: placeholderImage4
  }
];

export const modalData = {
  fertilizer: {
    title: 'Fertilizer Calculation',
    content: (
      <>

        <FertilizerCalculation></FertilizerCalculation>
      </>
    )
  },
  pests: {
    title: 'Pests and Diseases',
    content: (
      <>
        <CropDiseaseInfo></CropDiseaseInfo>
      </>
    )
  },
  cultivation: {
    title: 'Cultivation Tips',
    content: (
      <>
        <CultivationTips></CultivationTips>
      </>
    )
  },
  financial: {
    title: 'Financial Overview',
    content: (
      <>
      
        <FinancialOverview/>
      </>
    )
  }
};