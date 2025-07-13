// const express = require('express');
// const router = express.Router();
// const Product = require('../model/Product');

// router.get('/prod', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Product = require('../model/Product');

 
router.post('/prod', async (req, res) => {
  const { keywords } = req.body;
  if (!keywords || keywords.length === 0) {
    return res.status(400).json({ message: 'No keywords provided' });
  }

  try {
    const products = await Product.find({
      benefits: {
        $in: keywords.map(word => new RegExp(word, 'i'))
      }
    });

    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

