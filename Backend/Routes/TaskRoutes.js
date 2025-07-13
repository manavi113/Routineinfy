const express = require('express');
const router = express.Router();
const Task = require('../model/Task');
const verifyToken = require('../middleware/auth');
 
// router.post('/tasks', async (req, res) => {
//   const { task } = req.body;

//   if (!task) return res.status(400).json({ error: 'Task is required' });

//   try {
//     const newTask = new Task({ task });
//     await newTask.save();
//     res.status(201).json({ message: 'Task saved successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to save task' });
//   }
// });

// module.exports = router;




router.post('/tasks', verifyToken, async (req, res) => {
  const { task } = req.body;

 
  const newTask = new Task({
    userId: req.user.id,
    task,
    improvement: "",  
  });

  await newTask.save();
  res.status(201).json({ msg: "Task saved", task: newTask });
});




router.get('/user/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;