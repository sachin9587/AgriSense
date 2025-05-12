import React, { useState, useEffect } from 'react';
import '../styles/FertilizerCalculation.css';

const FertilizerCalculator = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [area, setArea] = useState('');
  const [areaUnit, setAreaUnit] = useState('hectare');
  const [results, setResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const crops = [
    
      { name: 'Wheat', image: '/images/Wheat.png', npk: { n: 120, p: 60, k: 40 }, fertilizers: { urea: 260, dap: 130, mop: 67 } },
      { name: 'Brinjal', image: '/images/brinjal.png', npk: { n: 100, p: 50, k: 50 }, fertilizers: { urea: 217, dap: 109, mop: 83 } },
      { name: 'Chilli', image: '/images/chilli.png', npk: { n: 120, p: 60, k: 50 }, fertilizers: { urea: 260, dap: 130, mop: 83 } },
      { name: 'Carrot', image: '/images/carrot.png', npk: { n: 80, p: 40, k: 80 }, fertilizers: { urea: 174, dap: 87, mop: 133 } },
      { name: 'Cucumber', image: '/images/cucumber.png', npk: { n: 100, p: 60, k: 50 }, fertilizers: { urea: 217, dap: 130, mop: 83 } },
      { name: 'Rice', image: '/images/rice.png', npk: { n: 120, p: 60, k: 40 }, fertilizers: { urea: 260, dap: 130, mop: 67 } },
      { name: 'Beans', image: '/images/beans.png', npk: { n: 40, p: 60, k: 40 }, fertilizers: { urea: 87, dap: 130, mop: 67 } },
      { name: 'Bitter Gourd', image: '/images/bitter_gourd.png', npk: { n: 100, p: 60, k: 50 }, fertilizers: { urea: 217, dap: 130, mop: 83 } },
      { name: 'Cabbage', image: '/images/cabbage.png', npk: { n: 120, p: 60, k: 60 }, fertilizers: { urea: 260, dap: 130, mop: 100 } },
      { name: 'Cauliflower', image: '/images/cauliflower.png', npk: { n: 120, p: 80, k: 60 }, fertilizers: { urea: 260, dap: 174, mop: 100 } },
      { name: 'Cotton', image: '/images/cotton.png', npk: { n: 150, p: 60, k: 60 }, fertilizers: { urea: 326, dap: 130, mop: 100 } },
      { name: 'Ginger', image: '/images/ginger.png', npk: { n: 120, p: 50, k: 80 }, fertilizers: { urea: 260, dap: 109, mop: 133 } },
      { name: 'Maize', image: '/images/maize.png', npk: { n: 150, p: 75, k: 40 }, fertilizers: { urea: 326, dap: 163, mop: 67 } },
      { name: 'Melon', image: '/images/melon.png', npk: { n: 100, p: 60, k: 100 }, fertilizers: { urea: 217, dap: 130, mop: 167 } },
      { name: 'Millet', image: '/images/millet.png', npk: { n: 80, p: 40, k: 30 }, fertilizers: { urea: 174, dap: 87, mop: 50 } },
      { name: 'Onion', image: '/images/onion.png', npk: { n: 100, p: 50, k: 80 }, fertilizers: { urea: 217, dap: 109, mop: 133 } },
      { name: 'Pea', image: '/images/pea.png', npk: { n: 40, p: 60, k: 40 }, fertilizers: { urea: 87, dap: 130, mop: 67 } },
      { name: 'Peanut', image: '/images/peanut.png', npk: { n: 20, p: 40, k: 30 }, fertilizers: { urea: 43, dap: 87, mop: 50 } },
      { name: 'Potato', image: '/images/potato.png', npk: { n: 120, p: 60, k: 120 }, fertilizers: { urea: 260, dap: 130, mop: 200 } },
      { name: 'Tomato', image: '/images/tomato.png', npk: { n: 120, p: 60, k: 60 }, fertilizers: { urea: 260, dap: 130, mop: 100 } },
      { name: 'Pumpkin', image: '/images/pumkin.png', npk: { n: 100, p: 60, k: 80 }, fertilizers: { urea: 217, dap: 130, mop: 133 } },
      { name: 'Soybean', image: '/images/soybean.png', npk: { n: 30, p: 60, k: 40 }, fertilizers: { urea: 65, dap: 130, mop: 67 } },
      { name: 'Sugarcane', image: '/images/sugarcane.png', npk: { n: 150, p: 60, k: 60 }, fertilizers: { urea: 326, dap: 130, mop: 100 } }
  
  ];

  // Fertilizer information for the educational section
  const fertilizerInfo = {
    urea: {
      name: "Urea",
      composition: "46% Nitrogen",
      benefits: "Promotes leaf and plant growth, essential for photosynthesis",
      application: "Best applied in multiple smaller doses throughout growing season"
    },
    dap: {
      name: "DAP (Diammonium Phosphate)",
      composition: "18% Nitrogen, 46% Phosphorus",
      benefits: "Supports root development, flowering and fruiting",
      application: "Usually applied at planting or early growing stages"
    },
    mop: {
      name: "MOP (Muriate of Potash)",
      composition: "60% Potassium",
      benefits: "Improves crop quality, disease resistance and water regulation",
      application: "Can be applied before planting or as side dressing"
    }
  };

  const filteredCrops = crops.filter(crop => 
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateFertilizer = () => {
    if (!selectedCrop || !area || isNaN(parseFloat(area)) || parseFloat(area) <= 0) {
      return;
    }

    const areaValue = parseFloat(area);
    const conversionFactor = areaUnit === 'acre' ? 0.4047 : 1; // 1 acre = 0.4047 hectares
    const hectares = areaUnit === 'acre' ? areaValue * conversionFactor : areaValue;

    const fertilizers = {
      urea: Math.round(selectedCrop.fertilizers.urea * hectares),
      dap: Math.round(selectedCrop.fertilizers.dap * hectares),
      mop: Math.round(selectedCrop.fertilizers.mop * hectares)
    };

    const npkTotal = {
      n: Math.round(selectedCrop.npk.n * hectares),
      p: Math.round(selectedCrop.npk.p * hectares),
      k: Math.round(selectedCrop.npk.k * hectares)
    };

    setResults({ fertilizers, npkTotal, crop: selectedCrop, area: areaValue, unit: areaUnit, hectares });
  };

  useEffect(() => {
    if (selectedCrop && area && !isNaN(parseFloat(area)) && parseFloat(area) > 0) {
      calculateFertilizer();
    } else {
      setResults(null);
    }
  }, [selectedCrop, area, areaUnit]);

  return (
    <div className="calculator-container">
      <h1 className="calculator-title">Crop Fertilizer Calculator</h1>
      
      <div className="calculator-grid">
        <div className="crop-selector">
          <h2 className="section-title">Select Your Crop</h2>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="crops-list">
            {filteredCrops.map((crop) => (
              <div 
                key={crop.name}
                onClick={() => setSelectedCrop(crop)}
                className={`crop-item ${selectedCrop?.name === crop.name ? 'selected' : ''}`}
              >
                <div className="crop-image">
                  <img 
                    src={crop.image} 
                    alt={crop.name} 
                    className="crop-img"
                  />
                </div>
                <div className="crop-info">
                  <h3 className="crop-name">{crop.name}</h3>
                  <p className="crop-npk">
                    N: {crop.npk.n} P: {crop.npk.p} K: {crop.npk.k} kg/ha
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="calculator-main">
          <div className="calculation-panel">
            <h2 className="section-title">Calculate Fertilizer Needs</h2>
            
            <div className="input-grid">
              <div className="input-group">
                <label className="input-label">Area</label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  min="0.1"
                  step="0.1"
                  placeholder="Enter area"
                  className="text-input"
                />
              </div>
              
              <div className="input-group">
                <label className="input-label">Unit</label>
                <select
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value)}
                  className="select-input"
                >
                  <option value="hectare">Hectare</option>
                  <option value="acre">Acre</option>
                </select>
              </div>
            </div>

            {!selectedCrop && (
              <div className="no-crop-message">
                Please select a crop from the list to calculate fertilizer requirements
              </div>
            )}
            
            {results && (
              <div className="results-container">
                <h3 className="results-title">
                  Fertilizer Requirements for {results.crop.name}
                </h3>
                
                <div className="area-info">
                  <p className="area-text">
                    <span className="bold-text">Area:</span> {results.area} {results.unit}
                    {results.unit === 'acre' ? ` (${results.hectares.toFixed(2)} hectares)` : ''}
                  </p>
                </div>
                
                <div className="npk-grid">
                  <div className="npk-item nitrogen">
                    <h4 className="npk-title">Nitrogen (N)</h4>
                    <p className="npk-value">{results.npkTotal.n} kg</p>
                  </div>
                  
                  <div className="npk-item phosphorus">
                    <h4 className="npk-title">Phosphorus (P)</h4>
                    <p className="npk-value">{results.npkTotal.p} kg</p>
                  </div>
                  
                  <div className="npk-item potassium">
                    <h4 className="npk-title">Potassium (K)</h4>
                    <p className="npk-value">{results.npkTotal.k} kg</p>
                  </div>
                </div>
                
                <h3 className="fertilizer-title">Recommended Fertilizer Products</h3>
                
                <div className="fertilizer-grid">
                  <div className="fertilizer-item urea">
                    <h4 className="fertilizer-name">Urea</h4>
                    <p className="fertilizer-value">{results.fertilizers.urea} kg</p>
                  </div>
                  
                  <div className="fertilizer-item dap">
                    <h4 className="fertilizer-name">DAP</h4>
                    <p className="fertilizer-value">{results.fertilizers.dap} kg</p>
                  </div>
                  
                  <div className="fertilizer-item mop">
                    <h4 className="fertilizer-name">MOP</h4>
                    <p className="fertilizer-value">{results.fertilizers.mop} kg</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="info-panel">
            <h2 className="section-title">Fertilizer Information</h2>
            
            <div className="fertilizer-info-container">
              {Object.values(fertilizerInfo).map((fert) => (
                <div key={fert.name} className="fertilizer-info-item">
                  <h3 className="fertilizer-info-title">{fert.name}</h3>
                  <p className="fertilizer-info-text"><span className="bold-text">Composition:</span> {fert.composition}</p>
                  <p className="fertilizer-info-text"><span className="bold-text">Benefits:</span> {fert.benefits}</p>
                  <p className="fertilizer-info-text"><span className="bold-text">Application:</span> {fert.application}</p>
                </div>
              ))}
            </div>
            
            <div className="application-tips">
              <h3 className="tips-title">Application Tips</h3>
              <ul className="tips-list">
                <li>• Split the total fertilizer application into 2-3 doses for better absorption</li>
                <li>• Apply fertilizers when soil is moist but not waterlogged</li>
                <li>• Incorporate fertilizers into the soil rather than surface application when possible</li>
                <li>• Always follow local agricultural extension recommendations for your specific region</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerCalculator;