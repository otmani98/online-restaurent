const mongoose = require('mongoose');
const validator = require('validator');

const contactShcema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'you have to provide a valid email'],
    trim: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  name: {
    type: String,
    required: [true, 'you have to provide your name'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'you have to provide a message'],
  },
  seen: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

contactShcema.index({ createdAt: 1 });

const Contact = mongoose.model('Contact', contactShcema);

module.exports = Contact;
