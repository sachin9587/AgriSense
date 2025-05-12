import express from 'express';
import {
  getCrops,
  initializeCrops,
  getCropByName,
  getCropTransactions,
  addExpense,
  addIncome,
  deleteExpense,
  deleteIncome,
  getOverallSummary
} from '../controller/transacCtrl.js';

const router = express.Router();

// Crop routes
router.get('/crops', getCrops);
router.post('/crops/initialize', initializeCrops);
router.get('/crops/:name', getCropByName);
router.get('/crops/:name/transactions', getCropTransactions);

// Expense routes
router.post('/expenses', addExpense);
router.delete('/expenses/:id', deleteExpense);

// Income routes
router.post('/incomes', addIncome);
router.delete('/incomes/:id', deleteIncome);

// Summary route
router.get('/summary', getOverallSummary);

export default router;