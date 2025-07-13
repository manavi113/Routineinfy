const mongoose = require('mongoose');

const waterSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  glassesDrunk: { type: Number, default: 0 },
  goal: { type: Number, default: 8 }
});

module.exports = mongoose.model('Water', waterSchema);
 