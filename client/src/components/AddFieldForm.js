import React, { useState } from 'react';

const AddFieldForm = ({ onSave, onCancel }) => {
  const [fieldName, setFieldName] = useState('');
  const [sheetId, setSheetId] = useState('');
  const [location, setLocation] = useState('Chennai,India');
  const [fieldSize, setFieldSize] = useState('');
  const [sizeUnit, setSizeUnit] = useState('acre'); // 'acre' or 'hectare'
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!fieldName.trim()) {
      newErrors.fieldName = 'Field name is required';
    }
    
    if (!sheetId.trim()) {
      newErrors.sheetId = 'Google Sheet ID is required';
    }
    
    if (!location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!fieldSize || isNaN(parseFloat(fieldSize)) || parseFloat(fieldSize) <= 0) {
      newErrors.fieldSize = 'Valid field size is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const fieldData = {
        name: fieldName,
        sheetId: sheetId,
        location: location,
        size: parseFloat(fieldSize),
        sizeUnit: sizeUnit
      };
      
      onSave(fieldData);
    }
  };

  return (
    <div className="add-field-form">
      <h2>Add New Field</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fieldName">Field Name:</label>
          <input
            type="text"
            id="fieldName"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            placeholder="e.g., North Paddy Field"
          />
          {errors.fieldName && <span className="error">{errors.fieldName}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="sheetId">Google Sheet ID:</label>
          <input
            type="text"
            id="sheetId"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
            placeholder="e.g., 1Bp5cESQ4goFSSphw55kA22jEmjCIW3AOjtRK-N5wEOc"
          />
          {errors.sheetId && <span className="error">{errors.sheetId}</span>}
          <small className="help-text">
            Find the Sheet ID in the URL of your Google Sheet:
            <br />
            https://docs.google.com/spreadsheets/d/<strong>sheet-id-here</strong>/edit
          </small>
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Chennai,India"
          />
          {errors.location && <span className="error">{errors.location}</span>}
          <small className="help-text">
            Enter as 'City,Country' format (e.g., Chennai,India)
          </small>
        </div>
        
        <div className="form-group size-input">
          <label htmlFor="fieldSize">Field Size:</label>
          <div className="size-input-container">
            <input
              type="number"
              id="fieldSize"
              value={fieldSize}
              onChange={(e) => setFieldSize(e.target.value)}
              placeholder="e.g., 5"
              step="0.1"
              min="0.1"
            />
            <select 
              value={sizeUnit} 
              onChange={(e) => setSizeUnit(e.target.value)}
            >
              <option value="acre">Acres</option>
              <option value="hectare">Hectares</option>
            </select>
          </div>
          {errors.fieldSize && <span className="error">{errors.fieldSize}</span>}
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save Field
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFieldForm;