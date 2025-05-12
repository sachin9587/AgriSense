import Crop from '../models/Crop.js';
import Expense from '../models/Expense.js';
import Income from '../models/Income.js';

// Get all crops
export const getCrops = async (req, res) => {
  try {
    const crops = await Crop.find({});
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Initialize crops (one time setup)
export const initializeCrops = async (req, res) => {
  try {
    const cropCount = await Crop.countDocuments();
    
    if (cropCount === 0) {
      const initialCrops = [
        { name: 'Wheat', image: '/images/wheat.png' },
        { name: 'Brinjal', image: '/images/brinjal.png' },
        { name: 'Chilli', image: '/images/chilli.png' },
        { name: 'Carrot', image: '/images/carrot.png' },
        { name: 'Cucumber', image: '/images/cucumber.png' },
        { name: 'Rice', image: '/images/rice.png' },
        { name: 'Beans', image: '/images/beans.png' },
        { name: 'Bitter Gourd', image: '/images/bitter_gourd.png' },
        { name: 'Cabbage', image: '/images/cabbage.png' },
        { name: 'Cauliflower', image: '/images/cauliflower.png' },
        { name: 'Cotton', image: '/images/cotton.png' },
        { name: 'Ginger', image: '/images/ginger.png' },
        { name: 'Maize', image: '/images/maize.png' },
        { name: 'Melon', image: '/images/melon.png' },
        { name: 'Millet', image: '/images/millet.png' },
        { name: 'Onion', image: '/images/onion.png' },
        { name: 'Pea', image: '/images/pea.png' },
        { name: 'Peanut', image: '/images/peanut.png' },
        { name: 'Potato', image: '/images/potato.png' },
        { name: 'Tomato', image: '/images/tomato.png' },
        { name: 'Pumpkin', image: '/images/pumkin.png' },
        { name: 'Soybean', image: '/images/soybean.png' },
        { name: 'Sugarcane', image: '/images/sugarcane.png' },
      ];
      await Crop.insertMany(initialCrops);
      res.status(201).json({ message: 'Crops initialized successfully' });
    } else {
      res.json({ message: 'Crops already initialized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get crop by name
export const getCropByName = async (req, res) => {
  try {
    const crop = await Crop.findOne({ name: req.params.name });
    
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    
    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transactions for a crop
export const getCropTransactions = async (req, res) => {
  try {
    const crop = await Crop.findOne({ name: req.params.name });
    
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    
    const expenses = await Expense.find({ cropId: crop._id }).sort({ date: -1 });
    const incomes = await Income.find({ cropId: crop._id }).sort({ date: -1 });
    
    // Calculate profit/loss
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalIncomes = incomes.reduce((sum, income) => sum + income.totalAmount, 0);
    const profit = totalIncomes - totalExpenses;
    
    res.json({
      crop,
      expenses,
      incomes,
      summary: {
        totalExpenses,
        totalIncomes,
        profit
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add expense
export const addExpense = async (req, res) => {
  try {
    const { cropName, category, name, amount, date } = req.body;
    
    if (!cropName || !category || !name || !amount) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    const crop = await Crop.findOne({ name: cropName });
    
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    
    const expense = new Expense({
      cropId: crop._id,
      cropName,
      category,
      name,
      amount: parseFloat(amount),
      date: date || new Date()
    });
    
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add income
export const addIncome = async (req, res) => {
  try {
    const { cropName, name, yield: yieldAmount, unit, pricePerUnit, date } = req.body;
    
    if (!cropName || !name || !yieldAmount || !unit || !pricePerUnit) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    const crop = await Crop.findOne({ name: cropName });
    
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    
    const totalAmount = parseFloat(yieldAmount) * parseFloat(pricePerUnit);
    
    const income = new Income({
      cropId: crop._id,
      cropName,
      name,
      yield: parseFloat(yieldAmount),
      unit,
      pricePerUnit: parseFloat(pricePerUnit),
      totalAmount,
      date: date || new Date()
    });
    
    const savedIncome = await income.save();
    res.status(201).json(savedIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update the deleteExpense function
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    // Replace expense.remove() with findByIdAndDelete
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the deleteIncome function
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    
    // Replace income.remove() with findByIdAndDelete
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: 'Income removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get overall financial summary
export const getOverallSummary = async (req, res) => {
  try {
    const crops = await Crop.find({});
    const allExpenses = await Expense.find({});
    const allIncomes = await Income.find({});
    
    const totalExpense = allExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalIncome = allIncomes.reduce((sum, income) => sum + income.totalAmount, 0);
    const totalProfit = totalIncome - totalExpense;
    
    const cropsSummary = await Promise.all(crops.map(async (crop) => {
      const cropExpenses = allExpenses.filter(expense => expense.cropId.toString() === crop._id.toString());
      const cropIncomes = allIncomes.filter(income => income.cropId.toString() === crop._id.toString());
      
      const expenseTotal = cropExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      const incomeTotal = cropIncomes.reduce((sum, income) => sum + income.totalAmount, 0);
      const profit = incomeTotal - expenseTotal;
      
      return {
        id: crop._id,
        name: crop.name,
        image: crop.image,
        expenses: expenseTotal,
        incomes: incomeTotal,
        profit
      };
    }));
    
    res.json({
      totalExpense,
      totalIncome,
      totalProfit,
      crops: cropsSummary
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};