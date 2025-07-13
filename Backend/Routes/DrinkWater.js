

const express = require("express");
const router = express.Router();
const Water = require("../model/Water");



router.get('/:userId/:date', async (req, res) => {
  const { userId, date } = req.params;
  let data = await Water.findOne({ userId, date });

  if (!data) {
    data = await Water.create({ userId, date });
  }

  res.status(200).json(data);
});
 
router.post('/log', async (req, res) => {
  const { userId, date, glasses } = req.body;

  let data = await Water.findOne({ userId, date });

  if (!data) {
    data = new Water({ userId, date, glassesDrunk: glasses });
  } else {
    data.glassesDrunk += glasses;
  }

  await data.save();
  res.status(200).json({ message: "Glass added", data });
});

module.exports = router;