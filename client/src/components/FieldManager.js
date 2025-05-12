import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddFieldForm from './AddFieldForm';
import FieldSelector from './FieldSelector';
import SystemRequirements from './SystemRequirements';
import '../styles/FieldManager.css';

const FieldManager = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [isAddingField, setIsAddingField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSystemReq, setShowSystemReq] = useState(false);
  const accessKey = "040414428e04dede758acbcd737bda48";

  // Load saved fields from localStorage on component mount
  // useEffect(() => {
  //   const savedFields = localStorage.getItem('smartFarmingFields');
  //   if (savedFields) {
  //     setFields(JSON.parse(savedFields));
  //   }
  // }, []);

  // useEffect(() => {
  //   const savedFields = localStorage.getItem('smartFarmingFields');
  //   console.log('Retrieved from localStorage:', savedFields);
  //   if (savedFields) {
  //     setFields(JSON.parse(savedFields));
  //   }
  // }, []);
  // In FieldManager.js - Modify your useEffect for loading data

  useEffect(() => {
    try {
      const savedFields = localStorage.getItem('smartFarmingFields');
      console.log('Retrieved from localStorage:', savedFields);
      
      if (savedFields && savedFields !== 'undefined' && savedFields !== 'null') {
        const parsedFields = JSON.parse(savedFields);
        console.log('Parsed fields:', parsedFields);
        
        // Only set fields if there's actually data
        if (Array.isArray(parsedFields) && parsedFields.length > 0) {
          setFields(parsedFields);
        }
      }
    } catch (error) {
      console.error('Error parsing fields from localStorage:', error);
    }
  }, []);

  // // Save fields to localStorage whenever they change
  // useEffect(() => {
  //   localStorage.setItem('smartFarmingFields', JSON.stringify(fields));
  //   console.log('Fields saved to localStorage:', fields);
  // }, [fields]);
  useEffect(() => {
    // CRITICAL FIX: Only save to localStorage if fields array has items
    // This prevents overwriting with empty array during component initialization
    if (fields.length > 0) {
      localStorage.setItem('smartFarmingFields', JSON.stringify(fields));
      console.log('Fields saved to localStorage:', fields);
    }
  }, [fields]);

  // Add a new field
  const addField = (fieldData) => {
    try {
      // Create new field with ID
      const newField = { 
        ...fieldData, 
        id: Date.now().toString() 
      };
      
      // Update fields state
      const newFields = [...fields, newField];
      setFields(newFields);
      
      // Explicitly save to localStorage (as backup to useEffect)
      localStorage.setItem('smartFarmingFields', JSON.stringify(newFields));
      
      // Close form and select the new field
      setIsAddingField(false);
      setSelectedField(newField);
      
      console.log('Field added successfully:', newField);
    } catch (error) {
      console.error('Error adding field:', error);
      alert('Failed to save field data. Please try again.');
    }
  };

  // Delete a field
  const deleteField = (fieldId) => {
    const updatedFields = fields.filter(field => field.id !== fieldId);
    setFields(updatedFields);
    
    // If currently selected field is deleted, reset selection
    if (selectedField && selectedField.id === fieldId) {
      setSelectedField(null);
    }
  };

  // Handle field selection
  const handleFieldSelect = (field) => {
    setSelectedField(field);
  };

  // Function to fetch data and navigate to weather page
  const routeToWeather = async () => {
    if (!selectedField) {
      alert("Please select a field first");
      return;
    }

    setIsLoading(true);
    
    try {
      // Fetch weather data
      const weatherResponse = await fetch(
        `https://api.weatherstack.com/current?access_key=${accessKey}&query=Chennai,India`
      );
      const weatherData = await weatherResponse.json();
      
      // Navigate to weather page with field data
      navigate('/weather', { 
        state: { 
          weatherData: weatherData,
          selectedField: selectedField
        } 
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSystemReqView = () => {
    setShowSystemReq(!showSystemReq);
  };

  return (
    <div className="field-manager-container">
      <h1>Field Management</h1>
      
      {/* Show either field list or add field form */}
      {isAddingField ? (
        <AddFieldForm 
          onSave={addField} 
          onCancel={() => setIsAddingField(false)}
        />
      ) : showSystemReq ? (
        <SystemRequirements 
          field={selectedField}
          onBack={toggleSystemReqView}
        />
      ) : (
        <div className="field-management-content">
          <FieldSelector 
            fields={fields}
            selectedField={selectedField}
            onSelect={handleFieldSelect}
            onDelete={deleteField}
          />
          
          <div className="action-buttons">
            <button 
              className="add-field-button"
              onClick={() => setIsAddingField(true)}
            >
              Add New Field
            </button>
            
            {selectedField && (
              <>
                <button 
                  className="system-requirements-button"
                  onClick={toggleSystemReqView}
                >
                  View System Requirements
                </button>
                
                <button 
                  className="monitor-button" 
                  onClick={routeToWeather}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Monitor Field'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
      
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default FieldManager;