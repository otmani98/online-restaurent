const mongoose = require('mongoose');

const mealShcema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'the meal name is must'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'the meal price is must'],
  },
  description: {
    type: String,
    required: [true, 'the description is must'],
    trim: true,
  },
  category: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, 'the type of meal is must'],
  },
  photos: [
    {
      type: String,
      required: [true, 'you have to upload photo for meal'],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Meal = mongoose.model('Meal', mealShcema);

module.exports = Meal;
