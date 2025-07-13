const mongoose = require("mongoose");

const stepGoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: String }, // Format: "2025-06-30"
  goal: { type: Number, default: 10000 },
  stepsTaken: { type: Number, default: 0 },
});

module.exports = mongoose.model("StepGoal", stepGoalSchema);
