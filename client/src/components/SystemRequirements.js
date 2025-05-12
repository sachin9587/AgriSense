import React from 'react';

const AgriculturalSystemRequirements = ({ field, onBack }) => {
  // If no field is selected, show a message
  if (!field) {
    return (
      <div className="system-requirements">
        <h2>Agricultural IoT System Requirements</h2>
        <p>Please select a field to view system requirements.</p>
        <button className="back-button" onClick={onBack}>Back</button>
      </div>
    );
  }

  // Convert size to acres for calculation if it's in hectares
  const sizeInAcres = field.sizeUnit === 'hectare' 
    ? field.size * 2.47105 
    : field.size;
  
  // One system covers 30m × 30m = 900 sq meters
  // 1 acre = 4046.86 sq meters
  // Systems needed = field size in sq meters / 900 sq meters per system
  const squareMetersPerAcre = 4046.86;
  const squareMetersPerSystem = 900; // 30m × 30m
  
  // Calculate systems needed based on coverage area
  const totalSquareMeters = sizeInAcres * squareMetersPerAcre;
  const systemCount = Math.ceil(totalSquareMeters / squareMetersPerSystem);
  
  // Calculate energy requirements based on 800-900 mA at 5V per system
  const currentDraw = 0.85; // 850 mA average (800-900 mA range)
  const operatingVoltage = 5; // 5 volts
  const powerConsumption = currentDraw * operatingVoltage; // Power in watts per system
  const totalPowerConsumption = Math.ceil(powerConsumption * systemCount); // Total power in watts
  
  // Daily energy consumption (assuming 24-hour operation)
  const dailyEnergyConsumption = Math.ceil(powerConsumption * 24 * systemCount); // Watt-hours per day
  
  // Battery capacity needed for 3 days backup (with 50% depth of discharge)
  const batteryCapacity = Math.ceil((dailyEnergyConsumption * 3) / (operatingVoltage * 0.5)); // Amp-hours
  
  // Solar panel sizing (assuming 5 hours of equivalent peak sun per day)
  const solarPanelSize = Math.ceil(dailyEnergyConsumption / 5); // Watts of solar panel needed
  
  const dataTransfer = systemCount * 3; // 3 MB per day per system
  const maintenanceInterval = "Every 2 months";
  const systemCoverage = 0.22; // acres per system (approx 900 sq m)
  
  return (
    <div className="system-requirements">
      <h2>Agricultural IoT System Requirements for {field.name}</h2>
      
      <div className="system-req-content">
        <div className="system-summary">
          <div className="system-count">
            <div className="count-value">{systemCount}</div>
            <div className="count-label">IoT Systems Required</div>
          </div>
          <p className="field-details">
            Field Size: {field.size} {field.sizeUnit === 'acre' ? 'acres' : 'hectares'}
            <br />
            Location: {field.location}
          </p>
        </div>
        
        <div className="requirements-details">
          <div className="req-group">
            <h3>Energy Requirements</h3>
            <table className="req-table">
              <tbody>
                <tr>
                  <td>Number of IoT Nodes:</td>
                  <td>{systemCount}</td>
                </tr>
                <tr>
                  <td>Current Draw per System:</td>
                  <td>{currentDraw * 1000} mA @ {operatingVoltage}V</td>
                </tr>
                <tr>
                  <td>Power per System:</td>
                  <td>{powerConsumption.toFixed(2)} watts</td>
                </tr>
                <tr>
                  <td>Total Power Consumption:</td>
                  <td>{totalPowerConsumption} watts</td>
                </tr>
                <tr>
                  <td>Daily Energy Consumption:</td>
                  <td>{dailyEnergyConsumption} Wh/day</td>
                </tr>
                <tr>
                  <td>Battery Capacity (3-day backup):</td>
                  <td>{batteryCapacity} Ah</td>
                </tr>
                <tr>
                  <td>Solar Panel Requirements:</td>
                  <td>{solarPanelSize} watts</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* <div className="req-group">
            <h3>Operation Information</h3>
            <table className="req-table">
              <tbody>
                <tr>
                  <td>Data Transfer:</td>
                  <td>~{dataTransfer} MB/day</td>
                </tr>
                <tr>
                  <td>Maintenance:</td>
                  <td>{maintenanceInterval}</td>
                </tr>
                <tr>
                  <td>Coverage:</td>
                  <td>~{systemCoverage.toFixed(2)} acres per system</td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>
        
        <div className="system-recommendations">
          <h3>Energy Management Recommendations</h3>
          <ul>
            <li>Mount solar panels at 30° angle facing south (northern hemisphere) or north (southern hemisphere)</li>
            <li>Clean solar panels monthly to maintain optimal efficiency in dusty agricultural environments</li>
            <li>Install systems at field edges where they can receive maximum sunlight exposure</li>
            <li>Use weather-resistant enclosures with proper ventilation to prevent overheating</li>
            <li>Consider adding a small wind turbine (50-100W) as supplementary power in windy regions</li>
            <li>Implement sleep modes during non-critical periods to reduce energy consumption</li>
            <li>Use high-efficiency batteries with deep discharge capability (LiFePO4 recommended)</li>
            <li>Install lightning protection and proper grounding for all systems</li>
            <li>Consider shade impacts from growing crops when planning solar panel placement</li>
            <li>Schedule maintenance visits during low-energy seasons (winter) to ensure system readiness</li>
          </ul>
        </div>
        
        <div className="system-recommendations">
          <h3>Agricultural Installation Strategy</h3>
          <ul>
            <li>Deploy systems in a grid pattern with coverage of 30x30 meters per system</li>
            <li>Position systems at field junctions and boundaries to maximize coverage</li>
            <li>Install systems on stable posts at least 1.5m high above anticipated crop growth</li>
            <li>Ensure clear line-of-sight between nodes for mesh network communication</li>
            <li>Place systems near irrigation lines to monitor water distribution efficiency</li>
            <li>Consider soil types and elevation differences when determining node locations</li>
            <li>Ensure easy access for maintenance while minimizing disruption to farm operations</li>
            <li>Use GPS coordinates to document exact system positions for maintenance and data analysis</li>
            <li>Consider prevailing wind directions for optimal gas monitoring</li>
            <li>Protect all cables and connections from wildlife and agricultural machinery</li>
          </ul>
        </div>
      </div>
      
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
};

export default AgriculturalSystemRequirements;