// frontend/src/services/api.js

const API_URL = 'http://localhost:5000/api/transactions';

// Crop functions
export const fetchCrops = async () => {
  const response = await fetch(`${API_URL}/crops`);
  if (!response.ok) {
    throw new Error('Failed to fetch crops');
  }
  return response.json();
};

export const fetchCropTransactions = async (cropName) => {
  const response = await fetch(`${API_URL}/crops/${cropName}/transactions`);
  if (!response.ok) {
    throw new Error('Failed to fetch crop transactions');
  }
  return response.json();
};

// Expense functions
export const addExpense = async (expenseData) => {
  const response = await fetch(`${API_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add expense');
  }
  
  return response.json();
};

export const deleteExpense = async (expenseId) => {
  const response = await fetch(`${API_URL}/expenses/${expenseId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete expense');
  }
  
  return response.json();
};

// Income functions
export const addIncome = async (incomeData) => {
  const response = await fetch(`${API_URL}/incomes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(incomeData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add income');
  }
  
  return response.json();
};

export const deleteIncome = async (incomeId) => {
  const response = await fetch(`${API_URL}/incomes/${incomeId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete income');
  }
  
  return response.json();
};

// Summary function
export const fetchOverallSummary = async () => {
  const response = await fetch(`${API_URL}/summary`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch overall summary');
  }
  
  return response.json();
};