import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureSection from './components/FeatureSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import WeatherPage from './components/WeatherPage'; // Ensure this matches the actual file name
import { featureData, modalData } from './data/featureData';
import FieldManager from './components/FieldManager';
import DataVisualizationPage from './components/DataVisualization.js';
// import FertilizerCalculation from './components/FertilizerCalculation';


function App() {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (id) => {
    setActiveModal(id);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Hero /> 
                <FeatureSection features={featureData} onFeatureClick={openModal} />
              </>
            } 
          />
           <Route path="/" element={<Hero />} />
           <Route path="/fields" element={<FieldManager />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/data-visualization" element={<DataVisualizationPage />} />
        </Routes>

        <Footer />

        {activeModal && (
          <Modal 
            title={modalData[activeModal].title}
            content={modalData[activeModal].content}
            onClose={closeModal}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
