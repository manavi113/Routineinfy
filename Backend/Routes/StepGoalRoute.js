const express = require("express");
const router = express.Router();
const StepGoal = require("../model/StepGoal");

 
router.post("/log", async (req, res) => {
  try {
    const { userId, date, steps } = req.body;
    let log = await StepGoal.findOne({ userId, date });

    if (log) {
      log.stepsTaken += steps;
      await log.save();
    } else {
      log = await StepGoal.create({
        userId,
        date,
        stepsTaken: steps,
      });
    }

    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ error: "Error logging steps" });
  }
});
 
router.get("/:userId/:date", async (req, res) => {
  try {
    const { userId, date } = req.params;
    const log = await StepGoal.findOne({ userId, date });
    res.status(200).json(log || { stepsTaken: 0, goal: 10000 });
  } catch (err) {
    res.status(500).json({ error: "Error fetching steps" });
  }
});

module.exports = router;
