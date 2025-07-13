const express = require('express');
const router = express.Router();
const Food = require('../model/Food'); // Adjust the path according to your project structure

 
router.get('/food/:type', async (req, res) => {
  const { type } = req.params;

  if (!['hot', 'pleasant', 'cold'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type parameter' });
  }

  try {
    const foods = await Food.find({ type });
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
