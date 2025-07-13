const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password:  { type: String, required: true },
  age: { type: String, required: true },
  gender: String,
  profilePic: String,
    resetToken: String,
  resetTokenExpiry: Date,
  loginLogs: {
  type: [String],  // e.g., ["2025-06-28", "2025-06-29"]
  default: []
}
});

module.exports = mongoose.model('User', userSchema, 'User');
