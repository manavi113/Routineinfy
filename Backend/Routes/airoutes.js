const express = require('express');
const aiController = require("../controller/ai.controller.js")

const router = express.Router();
const generateContent = require("../services/ai.js");

router.post("/get-review", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }
    try {
        const botReply = await generateContent(prompt);
        res.json(botReply);
    } catch (error) {
        res.status(500).json({ error: "AI service failed" });
    }
});

module.exports = router;
