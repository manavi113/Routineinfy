// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//   task: {
//     type: mongoose.Schema.Types.Mixed,
//     required: true,
//   }
// });

// module.exports = mongoose.model('Task', taskSchema, 'Task');



const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  task: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  improvement: { type: String }, // ✅ NEW FIELD
});

module.exports = mongoose.model('Task', taskSchema, 'Task');
