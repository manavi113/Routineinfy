const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.gemini_api);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


  
  // async function generateContent(prompt) {
  //   try {
  //     const result = await model.generateContent({
  //       contents: [{ role: "user", parts: [{ text: prompt }] }],
  //       systemInstruction: `You are a chatbot of a travel website with experience. You will assist customers asking about places to visit in India, booking guides, and answering their questions.`,
  //     });
  
  //     return result.response.text();
  //   } catch (err) {
  //     console.error("AI service error:", err.message);
  //     return "Sorry, I couldn't process that.";
  //   }
  // }






  // async function generateContent(prompt) {
  //   try {
  //     const result = await model.generateContent({
  //       contents: [{ role: "user", parts: [{ text: prompt }] }],
  //       systemInstruction: `You are a chatbot of a travel website with experience. You will assist customers asking about places to visit in India, booking guides, and answering their questions.`,
  //     });
  
  //     const aiResponse = result.response.text();
  
  //     return { reply: aiResponse }; // Ensure it's an object with a `reply` key
  //   } catch (err) {
  //     console.error("AI service error:", err.message);
  //     return { reply: "Sorry, I couldn't process that." }; // Ensure consistent response format
  //   }
  // }








  async function generateContent(prompt) {
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            systemInstruction: `You are a ayurveda health expert (not a doctor). Analyze the given routine and provide health analysis in **no more than 20 lines**.

Strict Format:
- Use 🔍 for reasons 
- Use 🩺 for possible health issues  
- Use 💡 for suggestions  
- Only one point per line
- No bullet points
- No headings or sub-headings
 
if person share other than routine just reply ---- my job is to analyze routine!
 
 `,
        });

        const aiResponse = result.response.text();

        return { reply: aiResponse };  
    } catch (err) {
        console.error("AI service error:", err.message);
        return { reply: "Sorry, I couldn't process that." }; 
    }
}

  
// Example usage
generateContent("Explain how AI works")
    // .then(console.log)
    // .catch(console.error);

module.exports = generateContent;
