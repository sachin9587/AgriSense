import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  cropId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    required: true
  },
  cropName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
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
    ]
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;