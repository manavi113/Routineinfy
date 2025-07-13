const aiService = require("../services/ai")


module.exports.getReview = async (req, res) => {
    // const code = req.body.code;
    const { prompt } = req.body; 
     // ✅ Still expects from body

     if (!prompt) {
        return res.status(400).send("Prompt is required");
    }

    try {
        const response = await aiService(prompt);
        res.send(response);
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).send("Failed to generate content");
    }
}