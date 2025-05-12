import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Brush,
  ReferenceLine
} from 'recharts';
import '../styles/DataVisualization.css';
import { useRef } from 'react';

const DataVisualizationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedField, sheetApiKey } = location.state || {};
  
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [selectedParameter, setSelectedParameter] = useState('all');
  const [parameterOptions, setParameterOptions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Define chart color scheme
  const colorScheme = {
    'Temperature': '#FF6384',
    'Humidity': '#36A2EB',
    'Soil Moisture': '#4BC0C0',
    'CO (ppm)': '#FF9F40',
    'H₂S (ppm)': '#9966FF',
    'CH₄ (ppm)': '#FFCD56',
    'NH₃ (ppm)': '#E67E22',
    'Flammable': '#C9CBCF',
    'Air Quality': '#8E44AD'
  };

  // Define threshold values for each parameter
  const thresholdConfig = {
    'Temperature': [
      { value: 15, label: 'Low', color: '#3498db' },
      { value: 30, label: 'Optimal', color: '#2ecc71' }
    ],
    'Humidity': [
      { value: 30, label: 'Low', color: '#e74c3c' },
      { value: 70, label: 'Optimal', color: '#2ecc71' }
    ],
    'Soil Moisture': [
      { value: 20, label: 'Dry', color: '#e74c3c' },
      { value: 60, label: 'Optimal', color: '#2ecc71' },
      { value: 80, label: 'Saturated', color: '#3498db' }
    ],
    'CO (ppm)': [
      { value: 1, label: 'Safe', color: '#2ecc71' },
      { value: 5, label: 'Moderate', color: '#f39c12' },
      { value: 9, label: 'High', color: '#e74c3c' }
    ],
    'H₂S (ppm)': [
      { value: 0.5, label: 'Safe', color: '#2ecc71' },
      { value: 5, label: 'Caution', color: '#f39c12' },
      { value: 10, label: 'Moderate', color: '#f39c12' },
      { value: 15, label: 'Hazardous', color: '#e74c3c' }
    ],
    'CH₄ (ppm)': [
      { value: 2, label: 'Normal', color: '#2ecc71' },
      { value: 5, label: 'Elevated', color: '#2ecc71' },
      { value: 10, label: 'Moderate', color: '#f39c12' },
      { value: 35, label: 'High', color: '#e74c3c' }
    ],
    'NH₃ (ppm)': [
      { value: 0.1, label: 'Very Low', color: '#2ecc71' },
      { value: 1, label: 'Low', color: '#2ecc71' },
      { value: 5, label: 'Moderate', color: '#f1c40f' },
      { value: 10, label: 'High', color: '#e74c3c' }
    ],
    'Flammable': [
      { value: 400, label: 'Safe', color: '#2ecc71' },
      { value: 600, label: 'Moderate', color: '#f39c12' },
      { value: 1000, label: 'Danger', color: '#e74c3c' }
    ],
    'Air Quality': [
      { value: 50, label: 'Good', color: '#2ecc71' },
      { value: 100, label: 'Moderate', color: '#f39c12' },
      { value: 150, label: 'Poor', color: '#e74c3c' }
    ]
  };
  
  // Function to get appropriate domain for parameters
  const getParameterDomain = (parameter) => {
    const paramLower = parameter.toLowerCase();
    
    if (paramLower.includes('co') || paramLower.includes('carbon monoxide')) {
      return [0, 2.8]; // Fixed CO range to 2.8 ppm
    } else if (paramLower.includes('ch₄') || paramLower.includes('methane')) {
      return [0, 8]; // Fixed CH4 range to 8 ppm
    } else if (paramLower.includes('nh₃') || paramLower.includes('ammonia')) {
      return [0, 2]; // Fixed NH3 range to 2 ppm
    } else if (paramLower.includes('h₂s') || paramLower.includes('hydrogen sulfide')) {
      return [0, 1.6]; // Fixed H2S range to 1.6 ppm
    } else if (paramLower.includes('temperature')) {
      return [0, 50]; // Temperature range 0-50°C
    } else if (paramLower.includes('humidity') || paramLower.includes('moisture')) {
      return [0, 100]; // Humidity/Moisture 0-100%
    } else if (paramLower.includes('flammable')) {
      return [0, 1000]; // Flammable range 0-1000
    } else if (paramLower.includes('air quality')) {
      return [0, 150]; // Air Quality range 0-150
    }
    
    // Default domain if parameter doesn't match any of the above
    return [0, 'auto'];
  };
  
  // Get thresholds for a parameter
  const getThresholds = (parameter) => {
    // Check exact match first
    if (thresholdConfig[parameter]) {
      return thresholdConfig[parameter];
    }
    
    // Check for partial matches if exact match not found
    const paramLower = parameter.toLowerCase();
    if (paramLower.includes('temperature')) {
      return thresholdConfig['Temperature'];
    } else if (paramLower.includes('humidity')) {
      return thresholdConfig['Humidity'];
    } else if (paramLower.includes('moisture')) {
      return thresholdConfig['Soil Moisture'];
    } else if (paramLower.includes('co') || paramLower.includes('carbon monoxide')) {
      return thresholdConfig['CO (ppm)'];
    } else if (paramLower.includes('h₂s') || paramLower.includes('hydrogen sulfide')) {
      return thresholdConfig['H₂S (ppm)'];
    } else if (paramLower.includes('ch₄') || paramLower.includes('methane')) {
      return thresholdConfig['CH₄ (ppm)'];
    } else if (paramLower.includes('nh₃') || paramLower.includes('ammonia')) {
      return thresholdConfig['NH₃ (ppm)'];
    } else if (paramLower.includes('flammable')) {
      return thresholdConfig['Flammable'];
    } else if (paramLower.includes('air quality')) {
      return thresholdConfig['Air Quality'];
    }
    
    return [];
  };

  // Function to get parameter recommendations based on value
  const getParameterRecommendation = (parameter, value) => {
    const paramLower = parameter.toLowerCase();
    const numValue = parseFloat(value);
    
    if (paramLower.includes('temperature')) {
      if (numValue < 15) {
        return 'Temperature is low. Consider protective measures for cold-sensitive crops.';
      } else if (numValue > 30) {
        return 'Temperature is high. Ensure adequate irrigation and shading if possible.';
      } else {
        return 'Temperature is within optimal range for most crops.';
      }
    } else if (paramLower.includes('humidity')) {
      if (numValue < 30) {
        return 'Humidity is low. Consider increasing irrigation or using humidifiers.';
      } else if (numValue > 70) {
        return 'Humidity is high. Monitor for fungal diseases and improve ventilation.';
      } else {
        return 'Humidity is within optimal range for most crops.';
      }
    } else if (paramLower.includes('soil moisture')) {
      if (numValue < 20) {
        return 'Soil moisture is low. Increase irrigation immediately.';
      } else if (numValue > 80) {
        return 'Soil moisture is high. Reduce irrigation to prevent root rot.';
      } else {
        return 'Soil moisture is at optimal levels.';
      }
    } else if (paramLower.includes('co') || paramLower.includes('carbon monoxide')) {
      if (numValue < 1) {
        return 'CO levels are very low and safe.';
      } else if (numValue <= 5) {
        return 'CO levels are within safe range for agricultural environments.';
      } else if (numValue <= 9) {
        return 'CO levels are slightly elevated. Improve ventilation in enclosed spaces.';
      } else {
        return 'CO levels are high! Improve ventilation immediately and check potential sources.';
      }
    } else if (paramLower.includes('h₂s') || paramLower.includes('hydrogen sulfide')) {
      if (numValue < 0.5) {
        return 'H₂S levels are very low and safe.';
      } else if (numValue <= 5) {
        return 'H₂S levels are elevated. Monitor compost piles and organic waste decomposition.';
      } else if (numValue <= 10) {
        return 'H₂S levels indicate moderate risk. Improve ventilation in enclosed spaces.';
      } else {
        return 'H₂S levels are hazardous! Check manure pits, storage areas for leaks. Ventilate immediately.';
      }
    } else if (paramLower.includes('ch₄') || paramLower.includes('methane')) {
      if (numValue < 2) {
        return 'Methane levels are normal background levels.';
      } else if (numValue < 5) {
        return 'Methane levels are slightly elevated but normal for agricultural areas.';
      } else if (numValue < 10) {
        return 'Methane levels are moderately elevated. Check livestock areas and manure storage.';
      } else {
        return 'High methane levels. Check for leaks in biogas systems or improper waste decomposition.';
      }
    } else if (paramLower.includes('nh₃') || paramLower.includes('ammonia')) {
      if (numValue < 0.1) {
        return 'Ammonia levels are very low and safe.';
      } else if (numValue <= 1) {
        return 'Ammonia levels are at normal agricultural range.';
      } else if (numValue <= 5) {
        return 'Ammonia levels are moderately elevated. Monitor fertilizer application and compost areas.';
      } else {
        return 'Ammonia levels are high. Check livestock areas and manure management.';
      }
    } else if (paramLower.includes('flammable')) {
      if (numValue < 400) {
        return 'Flammable gas risk is low.';
      } else if (numValue < 600) {
        return 'Moderate flammable gas risk. Check all storage areas for potential leaks.';
      } else {
        return 'High flammable gas risk! Improve ventilation immediately and investigate sources of gas emissions.';
      }
    } else if (paramLower.includes('air quality')) {
      if (numValue < 50) {
        return 'Air quality is good for all agricultural activities.';
      } else if (numValue < 100) {
        return 'Air quality is moderate. Sensitive plants may be affected. Monitor for signs of stress.';
      } else {
        return 'Air quality is poor. Consider protective measures for outdoor workers and sensitive crops.';
      }
    }
    
    return '';
  };

  const fetchHistoricalData = async () => {
    if (!selectedField || !selectedField.sheetId) {
      setError("Field information is missing. Please go back and select a field.");
      setLoading(false);
      return;
    }

    try {
      // Fetch all data from the sheet
      const sheetResponse = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${selectedField.sheetId}/values/A:J?key=${sheetApiKey}`
      );
      
      // Process historical data
      const values = sheetResponse.data.values || [];
      
      if (values.length > 1) {
        const headers = values[0];
        
        // Skip the header row and process all data rows
        const processedData = values.slice(1).map((row, rowIndex) => {
          const dataPoint = {
            timestamp: row[0] || `Point ${rowIndex + 1}`, // Use provided timestamp or fallback
          };
          
          // Add each sensor reading with its proper name
          for (let i = 1; i < Math.min(row.length, headers.length); i++) {
            dataPoint[headers[i]] = parseFloat(row[i]) || 0;
          }
          
          return dataPoint;
        });
        
        // Set parameter options from headers (excluding timestamp column)
        setParameterOptions(headers.slice(1));
        
        // Set historical data
        setHistoricalData(processedData);
      }
      
      setLastUpdated(new Date());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching historical data:", error);
      setError("Error fetching sensor data history. Please check the Sheet ID and try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedField) {
      setError("No field selected. Please go back and select a field.");
      setLoading(false);
      return;
    }
    
    // Initial data fetch
    fetchHistoricalData();
    
    // Set up interval for data refreshing (every 30 seconds)
    const refreshInterval = setInterval(() => {
      fetchHistoricalData();
    }, 300000);
    
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [selectedField]);

  // Filter data based on selected time range
  const getFilteredData = () => {
    if (selectedTimeRange === 'all') {
      return historicalData;
    }
    
    const now = new Date();
    let cutoffTime;
    
    switch (selectedTimeRange) {
      case '1h':
        cutoffTime = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case '6h':
        cutoffTime = new Date(now.getTime() - 6 * 60 * 60 * 1000);
        break;
      case '24h':
        cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        cutoffTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      default:
        return historicalData;
    }
    
    // Filter data - this assumes your timestamp is in a parseable format
    // You might need to adjust this based on your actual timestamp format
    return historicalData.filter(item => {
      try {
        const itemDate = new Date(item.timestamp);
        return itemDate >= cutoffTime;
      } catch {
        return true; // Include data points with unparseable timestamps
      }
    });
  };

  // Get parameters to display based on selection
  const getParametersToDisplay = () => {
    if (selectedParameter === 'all') {
      return parameterOptions;
    } else if (selectedParameter === 'environment') {
      return parameterOptions.filter(param => 
        param.toLowerCase().includes('temperature') || 
        param.toLowerCase().includes('humidity') || 
        param.toLowerCase().includes('moisture')
      );
    } else if (selectedParameter === 'gases') {
      return parameterOptions.filter(param => 
        param.toLowerCase().includes('co') || 
        param.toLowerCase().includes('h₂s') || 
        param.toLowerCase().includes('ch₄') || 
        param.toLowerCase().includes('nh₃')
      );
    } else if (selectedParameter === 'airquality') {
      return parameterOptions.filter(param => 
        param.toLowerCase().includes('air quality') || 
        param.toLowerCase().includes('flammable')
      );
    } else {
      return [selectedParameter];
    }
  };

  // Function to get appropriate units for parameters
  const getParameterUnit = (parameter) => {
    const paramLower = parameter.toLowerCase();
    if (paramLower.includes('temperature')) return '°C';
    if (paramLower.includes('humidity') || paramLower.includes('moisture')) return '%';
    if (paramLower.includes('co')) return 'ppm';
    if (paramLower.includes('h₂s')) return 'ppm';
    if (paramLower.includes('ch₄') || paramLower.includes('nh₃')) return 'ppm';
    return '';
  };

  // Function to format tooltip values
  const formatTooltipValue = (value, parameter) => {
    return `${value} ${getParameterUnit(parameter)}`;
  };

  // Custom tooltip component with recommendations
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="viz-custom-tooltip">
          <p className="viz-tooltip-time">{`Time: ${label}`}</p>
          {payload.map((entry, index) => {
            const recommendation = getParameterRecommendation(entry.name, entry.value);
            return (
              <div key={index}>
                <p className="viz-tooltip-item" style={{ color: entry.color }}>
                  {`${entry.name}: ${formatTooltipValue(entry.value, entry.name)}`}
                </p>
                {recommendation && (
                  <p className="viz-tooltip-recommendation">
                    {recommendation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  // Function to determine parameter status color based on thresholds
  const getParameterStatusColor = (parameter, value) => {
    const thresholds = getThresholds(parameter);
    const numValue = parseFloat(value);
    
    // Default color if no thresholds defined
    if (!thresholds || thresholds.length === 0) {
      return '#2ecc71'; // Default green
    }
    
    // Find the appropriate threshold color
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (numValue >= thresholds[i].value) {
        return thresholds[i].color;
      }
    }
    
    // If value is below the lowest threshold
    return thresholds[0].color;
  };

  if (loading) {
    return (
      <div className="viz-loading-container">
        <div className="viz-spinner"></div>
        <h2 className="viz-loading-text">Loading historical data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="viz-error-container">
        <h2 className="viz-error">{error}</h2>
        <button className="viz-back-button" onClick={() => navigate('/fields')}>
          Back to Field Manager
        </button>
      </div>
    );
  }

  const filteredData = getFilteredData();
  const parametersToDisplay = getParametersToDisplay();

  // Get the latest reading for each parameter
  const getLatestReadings = () => {
    if (filteredData.length === 0) return {};
    
    const latestDataPoint = filteredData[filteredData.length - 1];
    const readings = {};
    
    parametersToDisplay.forEach(param => {
      readings[param] = {
        value: latestDataPoint[param],
        unit: getParameterUnit(param),
        color: getParameterStatusColor(param, latestDataPoint[param]),
        recommendation: getParameterRecommendation(param, latestDataPoint[param])
      };
    });
    
    return readings;
  };
  
  const latestReadings = getLatestReadings();

  return (
    <div className="viz-dashboard-container">
      <header className="viz-dashboard-header">
        <h1>Sensor Data Visualization - {selectedField?.name || "Unknown Field"}</h1>
        <div className="viz-field-info-header">
          <span className="viz-field-location">{selectedField?.location}</span>
          <span className="viz-field-size">
            {selectedField?.size} {selectedField?.sizeUnit === 'acre' ? 'acres' : 'hectares'}
          </span>
        </div>
        <div className="viz-refresh-info">
          Last updated: {lastUpdated.toLocaleTimeString()} 
          <button className="viz-refresh-button" onClick={fetchHistoricalData}>
            Refresh Now
          </button>
        </div>
      </header>

      <div className="viz-controls">
        <div className="viz-control-group">
          <label htmlFor="timeRange">Time Range:</label>
          <select 
            id="timeRange" 
            value={selectedTimeRange} 
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="viz-select"
          >
            <option value="all">All Data</option>
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
        </div>

        <div className="viz-control-group">
          <label htmlFor="parameter">Parameters:</label>
          <select 
            id="parameter" 
            value={selectedParameter} 
            onChange={(e) => setSelectedParameter(e.target.value)}
            className="viz-select"
          >
            <option value="all">All Parameters</option>
            <option value="environment">Environmental (Temperature, Humidity, Moisture)</option>
            <option value="gases">Gas Readings (CO, H₂S, CH₄, NH₃)</option>
            <option value="airquality">Air Quality & Safety</option>
            {parameterOptions.map(param => (
              <option key={param} value={param}>{param}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Latest Readings Section */}
      <div className="viz-latest-readings">
        <h2>Latest Readings</h2>
        <div className="viz-readings-grid">
          {Object.entries(latestReadings).map(([param, data], index) => (
            <div 
              key={index} 
              className="viz-reading-card"
              style={{ borderColor: data.color }}
            >
              <h3>{param}</h3>
              <div className="viz-reading-value" style={{ color: data.color }}>
                {data.value} {data.unit}
              </div>
              <p className="viz-reading-recommendation">{data.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="viz-charts-container">
        {/* Main Multi-Line Chart */}
        <div className="viz-chart-card viz-main-chart">
          <h2>Sensor Readings Over Time</h2>
          {filteredData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={filteredData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis domain={selectedParameter === 'all' ? [0, 'auto'] : getParameterDomain(parametersToDisplay[0])} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {parametersToDisplay.map((param, index) => (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={param}
                    name={param}
                    stroke={colorScheme[param] || `hsl(${index * 30}, 70%, 50%)`}
                    dot={{ r: 2 }}
                    activeDot={{ r: 5 }}
                  />
                ))}
                <Brush dataKey="timestamp" height={30} stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="viz-no-data">No data available for the selected time range</p>
          )}
        </div>
      </div>
      
      {/* Individual Parameter Charts with inline styling */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Media queries can't be used in inline styles, we apply styles directly */}
        {parametersToDisplay.length <= 6 && parametersToDisplay.map((param, index) => (
          <div key={index} className="viz-chart-card viz-parameter-chart">
            <h3>{param}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                data={filteredData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis domain={getParameterDomain(param)} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey={param} 
                  name={param}
                  stroke={colorScheme[param] || `hsl(${index * 30}, 70%, 50%)`}
                  fill={colorScheme[param] || `hsl(${index * 30}, 70%, 50%)`}
                  fillOpacity={0.3}
                />
                {/* Add threshold reference lines */}
                {getThresholds(param).map((threshold, i) => (
                  <ReferenceLine 
                    key={i}
                    y={threshold.value}
                    stroke={threshold.color}
                    strokeDasharray="3 3"
                    label={{ 
                      value: `${threshold.label} (${threshold.value}${getParameterUnit(param)})`,
                      position: 'insideBottomRight',
                      fill: threshold.color,
                      fontSize: 12
                    }}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Back to Weather button with direct inline styling */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
        marginBottom: '30px'
      }}>
        <button 
          onClick={() => navigate('/weather', { 
            state: { selectedField, weatherData: location.state?.weatherData } 
          })}
          style={{
            backgroundColor: '#34495e',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '12px 24px',
            fontSize: '16px',
            cursor: 'pointer',
            minWidth: '200px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          Back to Weather Page 
        </button>
      </div>
    </div>
  );
};

export default DataVisualizationPage;