const mongoose = require('mongoose');

const orderingSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: [true, 'you should put your number to contact with you'],
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  meals: [
    {
      meal: {
        type: mongoose.Schema.ObjectId,
        ref: 'Meal',
        required: [true, 'ordering must belong to a meal'],
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  price: {
    type: Number,
    required: [true, 'ordering must have a price'],
  },
  suggestions: {
    type: String,
  },
  executed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

orderingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'meals',
    populate: {
      path: 'meal',
      select: 'name price',
    },
  });
  next();
});

const Ordering = mongoose.model('Ordering', orderingSchema);

module.exports = Ordering;
