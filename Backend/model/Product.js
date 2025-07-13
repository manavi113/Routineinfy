const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,  
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  benefits: {
    type: [String],  
    required: true,
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema, 'Products');
