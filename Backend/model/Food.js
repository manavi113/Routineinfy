const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['hot', 'pleasant', 'cold'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  benefits: {
    type: String,
    required: true
  },
  recipe: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Foods', foodSchema,'Foods');
