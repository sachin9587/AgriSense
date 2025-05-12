import React, { useState, useEffect } from 'react';
import '../styles/FinancialOverviews.css';
import { 
  fetchCrops, 
  fetchCropTransactions, 
  addExpense, 
  addIncome, 
  deleteExpense, 
  deleteIncome,
  fetchOverallSummary
} from '../services/api';

const MEASUREMENT_UNITS = [
  { name: 'Kilogram', abbr: 'kg' },
  { name: 'Quintal', abbr: 'q' },
  { name: 'Tonne', abbr: 't' },
  { name: 'Other', abbr: '' }
];

const EXPENSE_CATEGORIES = [
  'Seeds/Seedling',
  'Fertilizer',
  'Pesticides',
  'Machinery',
  'Labour',
  'Land Rent',
  'Irrigation',
  'Electricity',
  'Harvest',
  'Other'
];

const FinancialOverview = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [transactionType, setTransactionType] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [crops, setCrops] = useState([]);
  const [overallSummary, setOverallSummary] = useState(null);
  
  const [expenseData, setExpenseData] = useState({
    category: '',
    name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [incomeData, setIncomeData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    yield: '',
    unit: MEASUREMENT_UNITS[0].name,
    pricePerUnit: '',
  });

  // Load all crops and summary on initial render
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const cropsData = await fetchCrops();
        
        const summaryData = await fetchOverallSummary();
        setOverallSummary(summaryData);
        
        // Merge profit data with crops
        const cropsWithProfit = cropsData.map(crop => {
          const cropSummary = summaryData.crops.find(c => c.name === crop.name);
          return {
            ...crop,
            profit: cropSummary ? cropSummary.profit : 0
          };
        });
        
        setCrops(cropsWithProfit);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Load transactions when a crop is selected
  useEffect(() => {
    const loadCropTransactions = async () => {
      if (selectedCrop) {
        try {
          setLoading(true);
          const data = await fetchCropTransactions(selectedCrop.name);
          setExpenses(data.expenses);
          setIncomes(data.incomes);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    
    loadCropTransactions();
  }, [selectedCrop]);

  const selectCrop = (crop) => {
    setSelectedCrop(crop);
    setTransactionType('');
  };

  const backToOverview = () => {
    setSelectedCrop(null);
    setTransactionType('');
  };

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value
    });
  };

  const handleIncomeChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({
      ...incomeData,
      [name]: value
    });
  };

  const recordExpense = async () => {
    if (!expenseData.category || !expenseData.name || !expenseData.amount) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const newExpenseData = {
        cropName: selectedCrop.name,
        ...expenseData,
        amount: parseFloat(expenseData.amount)
      };
      
      const result = await addExpense(newExpenseData);
      
      // Update local state
      setExpenses([result, ...expenses]);
      
      // Reset form
      setExpenseData({
        category: '',
        name: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      // Refresh summary data and crops with profit
      refreshData();
      
      alert('Expense recorded successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const recordIncome = async () => {
    if (!incomeData.name || !incomeData.yield || !incomeData.pricePerUnit) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const newIncomeData = {
        cropName: selectedCrop.name,
        ...incomeData,
        yield: parseFloat(incomeData.yield),
        pricePerUnit: parseFloat(incomeData.pricePerUnit)
      };
      
      const result = await addIncome(newIncomeData);
      
      // Update local state
      setIncomes([result, ...incomes]);
      
      // Reset form
      setIncomeData({
        name: '',
        date: new Date().toISOString().split('T')[0],
        yield: '',
        unit: MEASUREMENT_UNITS[0].name,
        pricePerUnit: '',
      });
      
      // Refresh summary data and crops with profit
      refreshData();
      
      alert('Income recorded successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Function to refresh data after transactions
  const refreshData = async () => {
    try {
      const summaryData = await fetchOverallSummary();
      setOverallSummary(summaryData);
      
      // Update crops with latest profit data
      setCrops(prevCrops => 
        prevCrops.map(crop => {
          const cropSummary = summaryData.crops.find(c => c.name === crop.name);
          return {
            ...crop,
            profit: cropSummary ? cropSummary.profit : 0
          };
        })
      );
    } catch (err) {
      console.error("Failed to refresh data:", err);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      
      // Update local state
      setExpenses(expenses.filter(expense => expense._id !== id));
      
      // Refresh summary data and crops with profit
      refreshData();
      
      alert('Expense deleted successfully');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(id);
      
      // Update local state
      setIncomes(incomes.filter(income => income._id !== id));
      
      // Refresh summary data and crops with profit
      refreshData();
      
      alert('Income deleted successfully');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Function to calculate total income for a crop
  const calculateTotalIncome = () => {
    return incomes.reduce((total, income) => 
      total + (income.yield * income.pricePerUnit), 0);
  };

  // Function to calculate total expense for a crop
  const calculateTotalExpense = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const renderCropGrid = () => {
    return (
      <div className="crop-overview">
        <h2>Your Crops Financial Overview</h2>
        {loading ? (
          <div className="loading">Loading crops...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
          <>
            {overallSummary && (
              <div className="overall-summary">
                <div className="summary-item">
                  <h3>Total Income</h3>
                  <p className="amount positive">{formatCurrency(overallSummary.totalIncome)}</p>
                </div>
                <div className="summary-item">
                  <h3>Total Expenses</h3>
                  <p className="amount negative">{formatCurrency(overallSummary.totalExpense)}</p>
                </div>
                <div className="summary-item">
                  <h3>Net Profit</h3>
                  <p className={`amount ${overallSummary.totalProfit >= 0 ? 'positive' : 'negative'}`}>
                    {formatCurrency(overallSummary.totalProfit)}
                  </p>
                </div>
              </div>
            )}
            
              <div className="crop-grid">
                 {crops.map(crop => (
                <div 
                  key={crop._id} 
                  className="crop-card"
                  onClick={() => selectCrop(crop)}
                >
                  <div className="crop-image__2">
                    <img src={crop.image} alt={crop.name} />
                  </div>
                  <div className="crop-info">
                    <h3>{crop.name}</h3>
                    <div className={`profit-indicator ${crop.profit >= 0 ? 'profit' : 'loss'}`}>
                      <span className="profit-label">{crop.profit >= 0 ? 'Profit' : 'Loss'}</span>
                      <span className="profit-amount">{formatCurrency(Math.abs(crop.profit || 0))}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderCropDetail = () => {
    if (!selectedCrop) return null;
    
    const totalIncome = calculateTotalIncome();
    const totalExpense = calculateTotalExpense();
    const netProfit = totalIncome - totalExpense;

    return (
      <div className="crop-detail">
        <div className="crop-header">
          <button onClick={backToOverview} className="back-button">
            &larr; Back to Overview
          </button>
          <h2>{selectedCrop.name} Financial Details</h2>
          <div className="crop-image-detail">
            <img src={selectedCrop.image || '/images/default-crop.png'} alt={selectedCrop.name} />
          </div>
        </div>

        <div className="financial-summary">
          <div className="summary-item">
            <h3>Total Income</h3>
            <p className="amount positive">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="summary-item">
            <h3>Total Expenses</h3>
            <p className="amount negative">{formatCurrency(totalExpense)}</p>
          </div>
          <div className="summary-item">
            <h3>Net Profit</h3>
            <p className={`amount ${netProfit >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(netProfit)}
            </p>
          </div>
        </div>

        <div className="transaction-tabs">
          <button 
            className={`tab-button ${transactionType === '' ? 'active' : ''}`}
            onClick={() => setTransactionType('')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${transactionType === 'expense' ? 'active' : ''}`}
            onClick={() => setTransactionType('expense')}
          >
            Add Expense
          </button>
          <button 
            className={`tab-button ${transactionType === 'income' ? 'active' : ''}`}
            onClick={() => setTransactionType('income')}
          >
            Add Income
          </button>
        </div>

        {transactionType === 'expense' && renderExpenseForm()}
        {transactionType === 'income' && renderIncomeForm()}
        {transactionType === '' && renderTransactionHistory()}
      </div>
    );
  };

  const renderExpenseForm = () => {
    return (
      <div className="transaction-form">
        <h3>Record New Expense</h3>
        <div className="form-group">
          <label>Category</label>
          <select 
            name="category" 
            value={expenseData.category} 
            onChange={handleExpenseChange}
            required
          >
            <option value="">Select Category</option>
            {EXPENSE_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <input 
            type="text" 
            name="name" 
            value={expenseData.name} 
            onChange={handleExpenseChange} 
            placeholder="e.g. NPK Fertilizer"
            required
          />
        </div>
        <div className="form-group">
          <label>Amount (₹)</label>
          <input 
            type="number" 
            name="amount" 
            value={expenseData.amount} 
            onChange={handleExpenseChange} 
            placeholder="Amount in Rupees"
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input 
            type="date" 
            name="date" 
            value={expenseData.date} 
            onChange={handleExpenseChange} 
          />
        </div>
        <button className="submit-button" onClick={recordExpense}>Record Expense</button>
      </div>
    );
  };

  const renderIncomeForm = () => {
    return (
      <div className="transaction-form">
        <h3>Record New Income</h3>
        <div className="form-group">
          <label>Description</label>
          <input 
            type="text" 
            name="name" 
            value={incomeData.name} 
            onChange={handleIncomeChange} 
            placeholder="e.g. Harvest Sale"
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input 
            type="date" 
            name="date" 
            value={incomeData.date} 
            onChange={handleIncomeChange} 
          />
        </div>
        <div className="form-row">
          <div className="form-group half">
            <label>Yield</label>
            <input 
              type="number" 
              name="yield" 
              value={incomeData.yield} 
              onChange={handleIncomeChange} 
              placeholder="Quantity"
              required
            />
          </div>
          <div className="form-group half">
            <label>Unit</label>
            <select 
              name="unit" 
              value={incomeData.unit} 
              onChange={handleIncomeChange}
            >
              {MEASUREMENT_UNITS.map(unit => (
                <option key={unit.name} value={unit.name}>{unit.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Price per {incomeData.unit} (₹)</label>
          <input 
            type="number" 
            name="pricePerUnit" 
            value={incomeData.pricePerUnit} 
            onChange={handleIncomeChange} 
            placeholder="Price per unit in Rupees"
            required
          />
        </div>
        <button className="submit-button" onClick={recordIncome}>Record Income</button>
      </div>
    );
  };

  const renderTransactionHistory = () => {
    return (
      <div className="transaction-history">
        <div className="transaction-section">
          <h3>Income History</h3>
          {loading ? (
            <div className="loading">Loading income data...</div>
          ) : incomes.length === 0 ? (
            <p className="no-data">No income records found</p>
          ) : (
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Yield</th>
                  <th>Price/Unit</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map(income => (
                  <tr key={income._id}>
                    <td>{new Date(income.date).toLocaleDateString()}</td>
                    <td>{income.name}</td>
                    <td>{income.yield} {income.unit}</td>
                    <td>{formatCurrency(income.pricePerUnit)}</td>
                    <td className="amount">{formatCurrency(income.yield * income.pricePerUnit)}</td>
                    <td>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDeleteIncome(income._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="transaction-section">
          <h3>Expense History</h3>
          {loading ? (
            <div className="loading">Loading expense data...</div>
          ) : expenses.length === 0 ? (
            <p className="no-data">No expense records found</p>
          ) : (
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(expense => (
                  <tr key={expense._id}>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>{expense.category}</td>
                    <td>{expense.name}</td>
                    <td className="amount">{formatCurrency(expense.amount)}</td>
                    <td>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDeleteExpense(expense._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="financial-overview-container">
      {selectedCrop ? renderCropDetail() : renderCropGrid()}
    </div>
  );
};
  
export default FinancialOverview;