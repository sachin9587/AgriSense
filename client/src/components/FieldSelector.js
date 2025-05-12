import React from 'react';

const FieldSelector = ({ fields, selectedField, onSelect, onDelete }) => {
  // Helper function to calculate area representation in both units
  const formatArea = (size, unit) => {
    if (unit === 'acre') {
      const hectares = (size * 0.4047).toFixed(2);
      return `${size} acres (${hectares} ha)`;
    } else {
      const acres = (size * 2.4711).toFixed(2);
      return `${size} ha (${acres} acres)`;
    }
  };

  return (
    <div className="field-selector">
      <h2>Your Fields</h2>
      
      {fields.length === 0 ? (
        <div className="no-fields">
          <p>You haven't added any fields yet.</p>
          <p>Click "Add New Field" to get started.</p>
        </div>
      ) : (
        <div className="fields-list">
          {fields.map(field => (
            <div 
              key={field.id}
              className={`field-item ${selectedField && selectedField.id === field.id ? 'selected' : ''}`}
              onClick={() => onSelect(field)}
            >
              <div className="field-info">
                <h3>{field.name}</h3>
                <p className="field-location">{field.location}</p>
                <p className="field-size">{formatArea(field.size, field.sizeUnit)}</p>
              </div>
              
              <div className="field-actions">
                <button 
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent selecting the field
                    if (window.confirm(`Are you sure you want to delete "${field.name}"?`)) {
                      onDelete(field.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FieldSelector;