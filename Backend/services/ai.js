const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.gemini_api);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  async function generateContent(prompt) {
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            systemInstruction: `You are a chatbot of a travel website with experience. You will assist customers asking about places to visit in India, booking guides, and answering their questions.`,
        });

        const aiResponse = result.response.text();

        return { reply: aiResponse }; // Ensure it's an object with a `reply` key
    } catch (err) {
        console.error("AI service error:", err.message);
        return { reply: "Sorry, I couldn't process that." }; // Ensure consistent response format
    }
}

  
// Example usage
generateContent("Explain how AI works")
    // .then(console.log)
    // .catch(console.error);

module.exports = generateContent;
