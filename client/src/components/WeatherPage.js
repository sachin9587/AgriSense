import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/weather.css';

const WeatherPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(location.state?.weatherData);
  const [selectedField, setSelectedField] = useState(location.state?.selectedField);
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const sheetApiKey = "AIzaSyCPEGh4wMk02QhsaNN1cUnK9Nzt0EjMuck";

  // Function to fetch only sensor data
  const fetchSensorData = async () => {
    if (!selectedField || !selectedField.sheetId) {
      setError("Field information is missing. Please go back and select a field.");
      return;
    }

    try {
      // Fetch sheet data for the selected field
      const sheetResponse = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${selectedField.sheetId}/values/B:J?key=${sheetApiKey}`
      );
      
      // Process sensor data
      const values = sheetResponse.data.values || [];
      const sensorValues = [];
      const units = ['°C', '%', '%', 'ppm', 'ppm', 'ppm', 'ppm', '', ''];
      
      if (values.length > 1) {
        const lastRow = values[values.length - 1];
        const columnNames = values[0];
        
        for (let i = 0; i < lastRow.length && i < columnNames.length; i++) {
          sensorValues.push({
            parameter: columnNames[i],
            value: lastRow[i] + (units[i] ? ` ${units[i]}` : ''),
            rawValue: parseFloat(lastRow[i]) || 0
          });
        }
      }
      
      // Update state with new sensor data
      setSensorData(sensorValues);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      setError("Error fetching sensor data. Please check the Sheet ID and try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if data is available
    if (!weatherData) {
      setError("No weather data available. Please go back and try again.");
      setLoading(false);
      return;
    }
    
    if (!selectedField) {
      setError("No field selected. Please go back and select a field.");
      setLoading(false);
      return;
    }
    
    // Initial data fetch
    fetchSensorData();
    
    // Set up interval for sensor data refreshing (every 30 seconds)
    const refreshInterval = setInterval(() => {
      fetchSensorData();
    }, 300000);
    
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [weatherData, selectedField]);

  // Enhanced threshold info with exposure times and detailed recommendations
  const getThresholdInfo = (parameter, value) => {
    // Convert parameter to lowercase for case-insensitive comparison
    const paramLower = parameter.toLowerCase();
    const numValue = parseFloat(value);
    
    // Default values
    let color = '#2ecc71';
    let recommendation = '';
    let percentage = 50; // Default gauge percentage
    let minValue = 0;
    let maxValue = 100;
    let thresholds = [];
    let exposureTime = '';
    let healthEffects = '';
    
    // Temperature thresholds for agricultural crops
    if (paramLower.includes('temperature')) {
      minValue = 5;
      maxValue = 40;
      thresholds = [
        { value: 15, label: 'Low', color: '#3498db' },
        { value: 30, label: 'Optimal', color: '#2ecc71' },
        { value: 40, label: 'High', color: '#e74c3c' }
      ];
      
      if (numValue < 15) {
        color = '#3498db'; // too cold - blue
        recommendation = 'Temperature is low. Consider protective measures for cold-sensitive crops.';
        healthEffects = 'Plant growth slows, potential frost damage to sensitive crops.';
      } else if (numValue > 30) {
        color = '#e74c3c'; // too hot - red
        recommendation = 'Temperature is high. Ensure adequate irrigation and shading if possible.';
        healthEffects = 'Increased evapotranspiration, potential heat stress in plants.';
      } else {
        color = '#2ecc71'; // optimal - green
        recommendation = 'Temperature is within optimal range for most crops.';
        healthEffects = 'Favorable conditions for photosynthesis and plant growth.';
      }
      percentage = Math.max(0, Math.min(100, ((numValue - minValue) / (maxValue - minValue)) * 100));
    }
    
    // Humidity thresholds
    else if (paramLower.includes('humidity')) {
      minValue = 0;
      maxValue = 100;
      thresholds = [
        { value: 30, label: 'Low', color: '#e74c3c' },
        { value: 70, label: 'Optimal', color: '#2ecc71' },
        { value: 100, label: 'High', color: '#3498db' }
      ];
      
      if (numValue < 30) {
        color = '#e74c3c'; // too dry - red
        recommendation = 'Humidity is low. Consider increasing irrigation or using humidifiers.';
        healthEffects = 'Increased transpiration, potential water stress.';
      } else if (numValue > 70) {
        color = '#3498db'; // too humid - blue
        recommendation = 'Humidity is high. Monitor for fungal diseases and improve ventilation.';
        healthEffects = 'Increased risk of fungal disease development.';
      } else {
        color = '#2ecc71'; // optimal - green
        recommendation = 'Humidity is within optimal range for most crops.';
        healthEffects = 'Good balance for plant processes.';
      }
      percentage = Math.max(0, Math.min(100, numValue));
    }
    
    // Soil Moisture thresholds
    else if (paramLower.includes('soil moisture')) {
      minValue = 0;
      maxValue = 100;
      thresholds = [
        { value: 20, label: 'Dry', color: '#e74c3c' },
        { value: 60, label: 'Optimal', color: '#2ecc71' },
        { value: 80, label: 'Saturated', color: '#3498db' }
      ];
      
      if (numValue < 20) {
        color = '#e74c3c'; // too dry - red
        recommendation = 'Soil moisture is low. Increase irrigation immediately.';
        healthEffects = 'Plants unable to uptake sufficient water and nutrients.';
      } else if (numValue > 80) {
        color = '#3498db'; // too wet - blue
        recommendation = 'Soil moisture is high. Reduce irrigation to prevent root rot.';
        healthEffects = 'Potential for oxygen deficiency in root zone.';
      } else {
        color = '#2ecc71'; // optimal - green
        recommendation = 'Soil moisture is at optimal levels.';
        healthEffects = 'Good balance of water and air in soil for root development.';
      }
      percentage = Math.max(0, Math.min(100, numValue));
    }
    
    // Carbon Monoxide (CO) thresholds - Enhanced based on reference data
    else if (paramLower === 'co (ppm)' || paramLower.includes('carbon monoxide')) {
      minValue = 0;
      maxValue = 35;
      thresholds = [
        { value: 1, label: 'Safe', color: '#2ecc71' },
        { value: 5, label: 'caution', color: '#2ecc71' },
        { value: 9, label: 'Moderate', color: '#f39c12' },
        { value: 35, label: 'High', color: '#e74c3c' }
      ];
      
      if (numValue < 1) {
        color = '#2ecc71'; // good - green
        recommendation = 'CO levels are very low and safe.';
        exposureTime = 'Continuous exposure safe';
        healthEffects = 'Normal background levels; no health effects.';
      } else if (numValue <= 5) {
        color = '#2ecc71'; // still good - green
        recommendation = 'CO levels are within safe range for agricultural environments.';
        exposureTime = 'Continuous exposure safe';
        healthEffects = 'Indoor levels in well-ventilated areas; no expected effects.';
      } else if (numValue <= 9) {
        color = '#f39c12'; // acceptable - orange
        recommendation = 'CO levels are slightly elevated. Improve ventilation in enclosed spaces.';
        exposureTime = 'Up to 24 hours';
        healthEffects = 'Slight elevation; generally safe but may indicate pollution.';
      } else {
        color = '#e74c3c'; // moderate risk - red
        recommendation = 'CO levels are high! Improve ventilation immediately and check potential sources.';
        exposureTime = '8 hours maximum';
        healthEffects = 'Headache, fatigue in sensitive individuals (heart patients).';
      }
      percentage = Math.max(0, Math.min(100, (numValue / maxValue) * 100));
    }
    
    // Hydrogen Sulfide (H₂S) thresholds - Enhanced based on reference data
    else if (paramLower.includes('h₂s') || paramLower.includes('hydrogen sulfide')) {
      minValue = 0;
      maxValue = 15; // Reduced scale as requested
      thresholds = [
        { value: 0.5, label: 'Safe', color: '#2ecc71' },
        { value: 5, label: 'Caution', color: '#f39c12' },
        { value: 10, label: 'Moderate', color: '#f39c12' },
        { value: 15, label: 'Hazardous', color: '#e74c3c' }
      ];
      
      if (numValue < 0.5) {
        color = '#2ecc71'; // good - green
        recommendation = 'H₂S levels are very low and safe.';
        exposureTime = 'Continuous exposure safe';
        healthEffects = 'No symptoms; typical in clean outdoor air.';
      } else if (numValue <= 5) {
        color = '#f39c12'; // caution - orange
        recommendation = 'H₂S levels are elevated. Monitor compost piles and organic waste decomposition.';
        exposureTime = '8+ hours';
        healthEffects = 'Eye and throat irritation for sensitive people.';
      } else if (numValue <= 10) {
        color = '#f39c12'; // moderate risk - orange
        recommendation = 'H₂S levels indicate moderate risk. Improve ventilation in enclosed spaces.';
        exposureTime = 'Max 8 hours (OSHA limit)';
        healthEffects = 'Headache, nausea, fatigue with longer exposure.';
      } else {
        color = '#e74c3c'; // hazardous - red
        recommendation = 'H₂S levels are hazardous! Check manure pits, storage areas for leaks. Ventilate immediately.';
        exposureTime = 'Max 1 hour';
        healthEffects = 'Irritation of eyes, nose, cough, breathing difficulty.';
      }
      percentage = Math.max(0, Math.min(100, (numValue / maxValue) * 100));
    }
    
    // Methane (CH₄) thresholds - Enhanced based on reference data
    else if (paramLower.includes('ch₄') || paramLower.includes('methane')) {
      minValue = 0;
      maxValue = 35; // Reduced scale as requested
      thresholds = [
        { value: 2, label: 'Normal', color: '#2ecc71' },
        { value: 5, label: 'Elevated', color: '#2ecc71' },
        { value: 10, label: 'Moderate', color: '#f39c12' },
        { value: 35, label: 'High', color: '#e74c3c' }
      ];
  
      if (numValue >= 0 && numValue < 2) {
        color = '#2ecc71'; // Green - Normal background
        recommendation = 'Methane levels are normal background levels.';
        exposureTime = 'Continuous exposure safe';
        healthEffects = 'Natural, no health impact; CH₄ is not toxic at these levels.';
      } else if (numValue >= 2 && numValue < 5) {
        color = '#2ecc71'; // Green - Slightly elevated but safe
        recommendation = 'Methane levels are slightly elevated but normal for agricultural areas.';
        exposureTime = 'Continuous exposure safe';
        healthEffects = 'Slightly elevated due to agricultural activities; no health concerns.';
      } else if (numValue >= 5 && numValue < 10) {
        color = '#f39c12'; // Orange - Moderate
        recommendation = 'Methane levels are moderately elevated. Check livestock areas and manure storage.';
        exposureTime = 'Continuous to several hours';
        healthEffects = 'Still safe; no toxic effect — methane is not harmful in small concentrations.';
      } else {
        color = '#e74c3c'; // Red - High
        recommendation = 'High methane levels. Check for leaks in biogas systems or improper waste decomposition.';
        exposureTime = 'Limited hours (ventilation needed)';
        healthEffects = 'Non-toxic, but indoor accumulation could displace oxygen in sealed areas.';
      }
      percentage = Math.max(0, Math.min(100, (numValue / maxValue) * 100));
    }
    
    // Ammonia (NH₃) thresholds - Enhanced based on reference data
    else if (paramLower.includes('nh₃') || paramLower.includes('ammonia')) {
      minValue = 0;
      maxValue = 10; // Reduced scale as requested
      thresholds = [
        { value: 0.1, label: 'Very Low', color: '#2ecc71' },
        { value: 1, label: 'Low', color: '#2ecc71' },
        { value: 5, label: 'Moderate', color: '#f1c40f' },
        { value: 10, label: 'High', color: '#e74c3c' }
      ];
      
      if (numValue < 0.1) {
        color = '#2ecc71'; // good - green
        recommendation = 'Ammonia levels are very low and safe.';
        exposureTime = 'Continuous exposure (24+ hours)';
        healthEffects = 'Normal background levels; no impacts on crops or health.';
      } else if (numValue <= 1) {
        color = '#2ecc71'; // still good - green
        recommendation = 'Ammonia levels are at normal agricultural range.';
        exposureTime = 'Continuous exposure (24+ hours)';
        healthEffects = 'Noticeable odor; mild irritation in very sensitive individuals over long periods.';
      } else if (numValue <= 5) {
        color = '#f1c40f'; // moderate - yellow
        recommendation = 'Ammonia levels are moderately elevated. Monitor fertilizer application and compost areas.';
        exposureTime = '8-12 hours';
        healthEffects = 'Mild odor and throat irritation may occur with long exposure.';
      } else {
        color = '#e74c3c'; // high - red
        recommendation = 'Ammonia levels are high. Check livestock areas and manure management.';
        exposureTime = '1-4 hours maximum';
        healthEffects = 'Stronger odor; throat, eye irritation possible. May impact plant health.';
      }
      percentage = Math.max(0, Math.min(100, (numValue / maxValue) * 100));
    }
    
    // Flammable Index thresholds
    else if (paramLower.includes('flammable')) {
      minValue = 0;
      maxValue = 1000;
      thresholds = [
        { value: 400, label: 'Safe', color: '#2ecc71' },
        { value: 600, label: 'Moderate', color: '#f39c12' },
        { value: 1000, label: 'Danger', color: '#e74c3c' }
      ];
      
      if (numValue < 400) {
        color = '#2ecc71'; // good - green
        recommendation = 'Flammable gas risk is low.';
        exposureTime = 'Continuous monitoring advised';
        healthEffects = 'Safe conditions, no risk of combustion.';
      } else if (numValue < 600) {
        color = '#f39c12'; // moderate - orange
        recommendation = 'Moderate flammable gas risk. Check all storage areas for potential leaks.';
        exposureTime = 'Regular monitoring required';
        healthEffects = 'Potential ignition risk with spark or flame source.';
      } else {
        color = '#e74c3c'; // dangerous - red
        recommendation = 'High flammable gas risk! Improve ventilation immediately and investigate sources of gas emissions.';
        exposureTime = 'Immediate action required';
        healthEffects = 'High risk of combustion if ignition source present.';
      }
      percentage = ((numValue - minValue) / (maxValue - minValue)) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
    }
    
    // Air Quality Index thresholds
    else if (paramLower.includes('air quality')) {
      minValue = 0;
      maxValue = 150;
      thresholds = [
        { value: 50, label: 'Good', color: '#2ecc71' },
        { value: 100, label: 'Moderate', color: '#f39c12' },
        { value: 150, label: 'Poor', color: '#e74c3c' }
      ];
      
      if (numValue < 50) {
        color = '#2ecc71'; // good - green
        recommendation = 'Air quality is good for all agricultural activities.';
        exposureTime = 'Continuous exposure safe';
        healthEffects = 'Good conditions for plant and human health.';
      } else if (numValue < 100) {
        color = '#f39c12'; // moderate - orange
        recommendation = 'Air quality is moderate. Sensitive plants may be affected. Monitor for signs of stress.';
        exposureTime = 'Reduced exposure advised for sensitive crops';
        healthEffects = 'May affect photosynthesis and respiratory function in sensitive plants.';
      } else {
        color = '#e74c3c'; // poor - red
        recommendation = 'Air quality is poor. Consider protective measures for outdoor workers and sensitive crops.';
        exposureTime = 'Limit outdoor work';
        healthEffects = 'Can impair plant growth and cause respiratory issues in workers.';
      }
      percentage = Math.max(0, Math.min(100, numValue / 1.5));
    }
    
    return { 
      color, 
      recommendation, 
      percentage, 
      minValue, 
      maxValue, 
      thresholds,
      exposureTime,
      healthEffects
    };
  };
  
  // Helper function to categorize sensor data
  const categorizeSensorData = (data) => {
    const environmentalData = [];
    const gasData = [];
    const airQualityData = [];
    
    data.forEach(item => {
      const paramLower = item.parameter.toLowerCase();
      
      if (
        paramLower.includes('temperature') || 
        paramLower.includes('humidity') || 
        paramLower.includes('soil moisture')
      ) {
        environmentalData.push(item);
      } 
      else if (
        paramLower.includes('co') || 
        paramLower.includes('h₂s') || 
        paramLower.includes('nh₃') || 
        paramLower.includes('ch₄') ||
        paramLower.includes('carbon monoxide') ||
        paramLower.includes('hydrogen sulfide') ||
        paramLower.includes('ammonia') ||
        paramLower.includes('methane')
      ) {
        gasData.push(item);
      }
      else if (
        paramLower.includes('air quality') ||
        paramLower.includes('flammable')
      ) {
        airQualityData.push(item);
      }
    });
    
    return { environmentalData, gasData, airQualityData };
  };
  
  if (loading) {
    return <h2 className="loading">Loading data...</h2>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2 className="error">{error}</h2>
        <button className="back-button" onClick={() => navigate('/fields')}>
          Back to Field Manager
        </button>
      </div>
    );
  }

  // Prepare weather parameters for display
  const weatherParameters = weatherData ? [
    {
      parameter: "Temperature",
      value: `${weatherData.current.temperature}°C`,
      rawValue: weatherData.current.temperature
    },
    {
      parameter: "Humidity",
      value: `${weatherData.current.humidity}%`,
      rawValue: weatherData.current.humidity
    },
    {
      parameter: "Wind Speed",
      value: `${weatherData.current.wind_speed} km/h`,
      rawValue: weatherData.current.wind_speed
    }
  ] : [];

  // Categorize sensor data
  const { environmentalData, gasData, airQualityData } = categorizeSensorData(sensorData);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Smart Farming Dashboard - {selectedField?.name || "Unknown Field"}</h1>
        <div className="field-info-header">
          <span className="field-location">{selectedField?.location}</span>
          <span className="field-size">
            {selectedField?.size} {selectedField?.sizeUnit === 'acre' ? 'acres' : 'hectares'}
          </span>
        </div>
 
        <div className="refresh-info">
          Last updated: {lastUpdated.toLocaleTimeString()} 
          <button className="refresh-button" onClick={fetchSensorData}>
            Refresh Now
          </button>
        </div>
      </header>
      
      <div className="dashboard-grid">
        {/* Weather Card */}
        <div className="card weather-card">
          <h2>Live Weather Conditions</h2>
          <div className="weather-details">
            {weatherData && (
              <>
                <h3>{weatherData.location.name}, {weatherData.location.country}</h3>
                
                <div className="weather-info">
                  {weatherData.current.weather_icons && (
                    <img 
                      src={weatherData.current.weather_icons[0] || "/images/cloud.png"}
                      alt={weatherData.current.weather_descriptions[0]} 
                      className="weather-icon"
                      onError={(e) => {e.target.src = "/images/cloud.png"}}
                    />
                  )}
                  
                  <div className="weather-data">
                    {weatherParameters.map((item, index) => {
                      const { color } = getThresholdInfo(item.parameter, item.rawValue);
                      return (
                        <p key={index}>
                          <span className="label">{item.parameter}:</span> 
                          <span className="value" style={{ color: color }}>
                            {item.value}
                          </span>
                        </p>
                      );
                    })}
                    {weatherData.current.weather_descriptions && (
                      <p>
                        <span className="label">Condition:</span> 
                        <span className="value">{weatherData.current.weather_descriptions[0]}</span>
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Environmental Data Card */}
        <div className="card env-data-card">
          <h2>Environmental Conditions</h2>
          {environmentalData && environmentalData.length > 0 ? (
            <div className="sensor-parameters">
              {environmentalData.map((item, index) => {
                const { color, percentage, minValue, maxValue, thresholds } = getThresholdInfo(item.parameter, item.rawValue);
                return (
                  <div key={index} className="sensor-item environmental-item">
                    <div className="sensor-header">
                      <span className="sensor-name">{item.parameter}</span>
                      <span className="sensor-value" style={{ color }}>
                        {item.value}
                      </span>
                    </div>
                    <div className="sensor-gauge">
                      <div 
                        className="gauge-fill" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: color
                        }}
                      ></div>
                      {thresholds.map((threshold, i) => (
                        <div 
                          key={i} 
                          className="threshold-marker" 
                          style={{ 
                            left: `${Math.min(100, Math.max(0, ((threshold.value - minValue) / (maxValue - minValue)) * 100))}%`,
                            backgroundColor: threshold.color
                          }}
                          title={`${threshold.label}: ${threshold.value}`}
                        ></div>
                      ))}
                    </div>
                    <div className="gauge-scale">
                      <span>{minValue}</span>
                      {thresholds.map((threshold, i) => {
                        // Special case for the first and last thresholds - use labels instead of numbers
                        const isFirst = i === 0;
                        const isLast = i === thresholds.length - 1;
                        
                        // Generate a threshold display value
                        let displayValue = isFirst ? threshold.label : 
                                          isLast ? threshold.label : 
                                          threshold.value;
                        
                        return (
                          <span 
                            key={i} 
                            className={`gauge-label-${threshold.label.toLowerCase()}`}
                            style={{ 
                              left: `${Math.min(100, Math.max(0, ((threshold.value - minValue) / (maxValue - minValue)) * 100))}%`,
                              color: threshold.color
                            }}
                          >
                            {displayValue}
                          </span>
                        );
                      })}
                      <span>{maxValue}</span>
                    </div>
                    <div className="sensor-recommendation">
                      {getThresholdInfo(item.parameter, item.rawValue).recommendation}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="no-data">No environmental data available</p>
          )}
        </div>
        
        {/* Air Quality and Flammable Index Card */}
        <div className="card air-quality-card">
          <h2>Air Quality & Safety</h2>
          {airQualityData && airQualityData.length > 0 ? (
            <div className="sensor-parameters air-parameters">
              {airQualityData.map((item, index) => {
                const { color, percentage, minValue, maxValue, thresholds, recommendation, exposureTime, healthEffects } = getThresholdInfo(item.parameter, item.rawValue);
                return (
                  <div key={index} className="sensor-item air-quality-item">
                    <div className="sensor-header">
                      <span className="sensor-name">{item.parameter}</span>
                      <span className="sensor-value" style={{ color }}>
                        {item.value}
                      </span>
                    </div>
                    <div className="sensor-gauge">
                      <div 
                        className="gauge-fill" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: color
                        }}
                      ></div>
                      {thresholds.map((threshold, i) => (
                        <div 
                          key={i} 
                          className="threshold-marker" 
                          style={{ 
                            left: `${Math.min(100, Math.max(0, ((threshold.value - minValue) / (maxValue - minValue)) * 100))}%`,
                            backgroundColor: threshold.color
                          }}
                          title={`${threshold.label}: ${threshold.value}`}
                        ></div>
                      ))}
                    </div>
                    <div className="gauge-scale">
                      <span>{minValue}</span>
                      {thresholds.map((threshold, i) => {
                        // Special case for the first and last thresholds - use labels instead of numbers
                        const isFirst = i === 0;
                        const isLast = i === thresholds.length - 1;
                        const isMiddle = !isFirst && !isLast;
                        
                        // Generate a threshold display value - use labels for first/last threshold
                        let displayValue = isFirst || isLast ? threshold.label : threshold.value;
                        
                        return (
                          <span 
                            key={i} 
                            className={`gauge-label-${threshold.label.toLowerCase().replace(/\s+/g, '-')}`}
                            style={{ 
                              left: `${Math.min(100, Math.max(0, ((threshold.value - minValue) / (maxValue - minValue)) * 100))}%`,
                              color: threshold.color
                            }}
                          >
                            {displayValue}
                          </span>
                        );
                      })}
                      <span>{maxValue}</span>
                    </div>
                    <div className="sensor-details-container">
                      <div className="sensor-recommendation">
                        <strong>Recommendation:</strong> {recommendation}
                      </div>
                      <div className="sensor-exposure-time">
                        <strong>Exposure Time:</strong> {exposureTime}
                      </div>
                      <div className="sensor-health-effects">
                        <strong>Effects:</strong> {healthEffects}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="no-data">No air quality data available</p>
          )}
        </div>
        
        {/* Gas Monitoring Card */}
        <div className="card gas-monitoring-card">
          <h2>Gas Concentration Monitoring</h2>
          {gasData && gasData.length > 0 ? (
            <div className="sensor-parameters gas-parameters">
              {gasData.map((item, index) => {
                const { color, percentage, minValue, maxValue, thresholds, recommendation, exposureTime, healthEffects } = getThresholdInfo(item.parameter, item.rawValue);
                return (
                  <div key={index} className="sensor-item gas-item" data-parameter={item.parameter}>
                    <div className="sensor-header">
                      <span className="sensor-name">{item.parameter}</span>
                      <span className="sensor-value" style={{ color }}>
                        {item.value}
                      </span>
                    </div>
                    <div className="sensor-gauge custom-thresholds">
                      <div 
                        className="gauge-fill" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: color
                        }}
                      ></div>
                      {thresholds.map((threshold, i) => (
                        <div 
                          key={i} 
                          className="threshold-marker" 
                          style={{ 
                            left: `${Math.min(100, Math.max(0, ((threshold.value - minValue) / (maxValue - minValue)) * 100))}%`,
                            backgroundColor: threshold.color
                          }}
                          title={`${threshold.label}: ${threshold.value}`}
                        ></div>
                      ))}
                    </div>
                    <div className="gauge-scale">
                      <span>{minValue}</span>
                      {thresholds.map((threshold, i) => {
                        // Special case for the first and last thresholds - use labels instead of numbers
                        const isFirst = i === 0;
                        const isLast = i === thresholds.length - 1;
                        const isMiddle = !isFirst && !isLast;
                        
                        // Generate a threshold display value - use labels for first/last threshold
                        let displayValue = isFirst || isLast ? threshold.label : threshold.value;
                        
                        return (
                          <span 
                            key={i} 
                            className={`gauge-label-${threshold.label.toLowerCase().replace(/\s+/g, '-')}`}
                            style={{ 
                              left: `${Math.min(100, Math.max(0, ((threshold.value - minValue) / (maxValue - minValue)) * 100))}%`,
                              color: threshold.color
                            }}
                          >
                            {displayValue}
                          </span>
                        );
                      })}
                      <span>{maxValue}</span>
                    </div>
                    <div className="sensor-details-container">
                      <div className="sensor-recommendation">
                        <strong>Recommendation:</strong> {recommendation}
                      </div>
                      <div className="sensor-exposure-time">
                        <strong>Exposure Time:</strong> {exposureTime}
                      </div>
                      <div className="sensor-health-effects">
                        <strong>Effects:</strong> {healthEffects}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="no-data">No gas sensor data available</p>
          )}
        </div>
        
        {/* Recommendations Card - Split by Category */}
        <div className="card recommendation-card">
          <h2>Smart Agricultural Recommendations</h2>
          
          <div className="recommendations-grid">
            {/* Environmental Recommendations */}
            <div className="recommendation-section">
              <h3>Environmental Conditions</h3>
              {environmentalData && environmentalData.length > 0 ? (
                <ul className="recommendations">
                  {environmentalData.map((item, index) => {
                    const { recommendation, color } = getThresholdInfo(item.parameter, item.rawValue);
                    return recommendation ? (
                      <li key={`env-${index}`} style={{ borderLeftColor: color }}>
                        <strong>{item.parameter}:</strong> {recommendation}
                      </li>
                    ) : null;
                  })}
                  
                  {/* Weather-based recommendations */}
                  {weatherData && weatherData.current.humidity > 70 && (
                    <li style={{ borderLeftColor: '#3498db' }}>
                      <strong>Humidity:</strong> High humidity detected. Monitor for potential fungal diseases.
                    </li>
                  )}
                  
                  {weatherData && weatherData.current.humidity < 30 && (
                    <li style={{ borderLeftColor: '#e74c3c' }}>
                      <strong>Humidity:</strong> Low humidity detected. Plants may need additional water.
                    </li>
                  )}
                  
                  {weatherData && weatherData.current.precip > 0 && (
                    <li style={{ borderLeftColor: '#3498db' }}>
                      <strong>Precipitation:</strong> Recent precipitation: {weatherData.current.precip}mm. Adjust irrigation accordingly.
                    </li>
                  )}
                  
                  {weatherData && weatherData.current.precip === 0 && (
                    <li style={{ borderLeftColor: '#f39c12' }}>
                      <strong>Precipitation:</strong> No recent precipitation. Consider irrigation based on soil moisture levels.
                    </li>
                  )}
                  
                  {weatherData && weatherData.current.temperature > 30 && (
                    <li style={{ borderLeftColor: '#e74c3c' }}>
                      <strong>Temperature:</strong> High temperature detected. Ensure adequate irrigation and consider shade for sensitive crops.
                    </li>
                  )}
                  
                  {weatherData && weatherData.current.temperature < 15 && (
                    <li style={{ borderLeftColor: '#3498db' }}>
                      <strong>Temperature:</strong> Low temperature detected. Monitor cold-sensitive crops and consider protective measures.
                    </li>
                  )}
                </ul>
              ) : (
                <p className="no-data">No environmental recommendations available</p>
              )}
            </div>
            
            {/* Gas Monitoring Recommendations */}
            <div className="recommendation-section">
              <h3>Gas & Air Quality</h3>
              {gasData && gasData.length > 0 ? (
                <ul className="recommendations">
                  {gasData.map((item, index) => {
                    const { recommendation, color, exposureTime } = getThresholdInfo(item.parameter, item.rawValue);
                    const isCritical = color === '#e74c3c' || color === '#c0392b';
                    
                    return recommendation ? (
                      <li 
                        key={`gas-${index}`} 
                        className={isCritical ? 'critical-alert' : ''} 
                        style={{ borderLeftColor: color }}
                      >
                        <strong>{item.parameter}:</strong> {recommendation}
                        <div className="exposure-note">Max exposure: {exposureTime}</div>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : (
                <p className="no-data">No gas monitoring recommendations available</p>
              )}
              
              {/* Air Quality Recommendations */}
              {airQualityData && airQualityData.length > 0 ? (
                <ul className="recommendations">
                  {airQualityData.map((item, index) => {
                    const { recommendation, color } = getThresholdInfo(item.parameter, item.rawValue);
                    const isCritical = color === '#e74c3c' || color === '#c0392b';
                    
                    return recommendation ? (
                      <li 
                        key={`air-${index}`}
                        className={isCritical ? 'critical-alert' : ''} 
                        style={{ borderLeftColor: color }}
                      >
                        <strong>{item.parameter}:</strong> {recommendation}
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      
      {/* Gas Information Reference Table */}
      <div className="gas-reference-container">
        <h2>Agricultural Gas Monitoring Reference Guide</h2>
        <div className="gas-reference-tables">
          {/* Carbon Monoxide Table */}
          <div className="gas-reference-table">
            <h3>Carbon Monoxide (CO)</h3>
            <table>
              <thead>
                <tr>
                  <th>Level (ppm)</th>
                  <th>Category</th>
                  <th>Max Exposure</th>
                  <th>Agricultural Impact</th>
                  <th>Action Required</th>
                </tr>
              </thead>
              <tbody>
                <tr className="safe-row">
                  <td>0-1</td>
                  <td>Safe</td>
                  <td>Continuous</td>
                  <td>No impact on crops or livestock</td>
                  <td>Normal monitoring</td>
                </tr>
                <tr className="safe-row">
                  <td>1-5</td>
                  <td>Safe</td>
                  <td>Continuous</td>
                  <td>Normal indoor levels; no effects</td>
                  <td>Normal monitoring</td>
                </tr>
                <tr className="caution-row">
                  <td>6-9</td>
                  <td>Caution</td>
                  <td>24 hours max</td>
                  <td>Potential stress on sensitive livestock</td>
                  <td>Check ventilation systems</td>
                </tr>
                <tr className="warning-row">
                  <td>10-35</td>
                  <td>Moderate Risk</td>
                  <td>8 hours max</td>
                  <td>May affect worker health and sensitive animals</td>
                  <td>Improve ventilation immediately</td>
                </tr>
              </tbody>
            </table>
            <div className="reference-source">Source: Based on OSHA workplace guidelines and USDA agricultural safety recommendations</div>
          </div>
          
          {/* Hydrogen Sulfide Table */}
          <div className="gas-reference-table">
            <h3>Hydrogen Sulfide (H₂S)</h3>
            <table>
              <thead>
                <tr>
                  <th>Level (ppm)</th>
                  <th>Category</th>
                  <th>Max Exposure</th>
                  <th>Agricultural Impact</th>
                  <th>Action Required</th>
                </tr>
              </thead>
              <tbody>
                <tr className="safe-row">
                  <td>0.01-0.5</td>
                  <td>Safe</td>
                  <td>Continuous</td>
                  <td>No impact on crops or animals</td>
                  <td>Normal monitoring</td>
                </tr>
                <tr className="caution-row">
                  <td>0.5-5</td>
                  <td>Caution</td>
                  <td>8+ hours</td>
                  <td>Indicator of organic decomposition</td>
                  <td>Monitor composting/manure areas</td>
                </tr>
                <tr className="warning-row">
                  <td>5-10</td>
                  <td>Moderate Risk</td>
                  <td>8 hours max</td>
                  <td>Potential animal respiratory stress</td>
                  <td>Check manure pits and improve ventilation</td>
                </tr>
                <tr className="danger-row">
                  <td>10-15</td>
                  <td>Hazardous</td>
                  <td>1 hour max</td>
                  <td>Toxic to livestock and workers</td>
                  <td>Immediate ventilation; inspect for gas leaks</td>
                </tr>
              </tbody>
            </table>
            <div className="reference-source">Source: NIOSH recommended exposure limits and EPA agricultural guidelines</div>
          </div>
          
          {/* Methane Table */}
          <div className="gas-reference-table">
            <h3>Methane (CH₄)</h3>
            <table>
              <thead>
                <tr>
                  <th>Level (ppm)</th>
                  <th>Category</th>
                  <th>Max Exposure</th>
                  <th>Agricultural Impact</th>
                  <th>Action Required</th>
                </tr>
              </thead>
              <tbody>
                <tr className="safe-row">
                  <td>1.7-2</td>
                  <td>Normal</td>
                  <td>Continuous</td>
                  <td>Normal atmospheric levels</td>
                  <td>No action needed</td>
                </tr>
                <tr className="safe-row">
                  <td>2-5</td>
                  <td>Elevated</td>
                  <td>Continuous</td>
                  <td>Common in agricultural areas</td>
                  <td>Normal monitoring</td>
                </tr>
                <tr className="caution-row">
                  <td>5-10</td>
                  <td>Moderate</td>
                  <td>Several hours</td>
                  <td>May indicate poor waste management</td>
                  <td>Check manure storage and compost</td>
                </tr>
                <tr className="warning-row">
                  <td>10-35</td>
                  <td>High</td>
                  <td>Limited hours</td>
                  <td>Potential biogas leakage or oxygen displacement</td>
                  <td>Check for gas leaks in biogas systems</td>
                </tr>
              </tbody>
            </table>
            <div className="reference-source">Source: WHO air quality guidelines and FAO agricultural management standards</div>
          </div>
          
          {/* Ammonia Table */}
          <div className="gas-reference-table">
            <h3>Ammonia (NH₃)</h3>
            <table>
              <thead>
                <tr>
                  <th>Level (ppm)</th>
                  <th>Category</th>
                  <th>Max Exposure</th>
                  <th>Agricultural Impact</th>
                  <th>Action Required</th>
                </tr>
              </thead>
              <tbody>
                <tr className="safe-row">
                  <td>0.02-0.1</td>
                  <td>Very Low</td>
                  <td>Continuous</td>
                  <td>Background levels; beneficial for plants</td>
                  <td>No action needed</td>
                </tr>
                <tr className="safe-row">
                  <td>0.1-1</td>
                  <td>Low</td>
                  <td>Continuous</td>
                  <td>Normal for agricultural settings</td>
                  <td>Normal monitoring</td>
                </tr>
                <tr className="caution-row">
                  <td>1-5</td>
                  <td>Moderate</td>
                  <td>8-12 hours</td>
                  <td>May indicate over-fertilization</td>
                  <td>Check fertilizer application rates</td>
                </tr>
                <tr className="warning-row">
                  <td>5-10</td>
                  <td>High</td>
                  <td>1-4 hours max</td>
                  <td>Can damage sensitive crops; livestock stress</td>
                  <td>Improve ventilation; reduce nitrogen sources</td>
                </tr>
              </tbody>
            </table>
            <div className="reference-source">Source: ACGIH threshold limit values and USDA agricultural research service guidelines</div>
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons - Moved to bottom of page after the reference tables */}
      <div className="button-container">
        <button className="visualization-button" onClick={() => navigate('/data-visualization', { 
         state: { selectedField, sheetApiKey } 
        })}>
          Live Data Visualization
        </button>
        <button className="back-button" onClick={() => navigate('/fields')}>
          Back to Field Manager
        </button>
      </div>
    </div>
  );
};

export default WeatherPage;