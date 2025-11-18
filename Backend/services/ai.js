// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.gemini_api);
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//   async function generateContent(prompt) {
//     try {
//         const result = await model.generateContent({
//             contents: [{ role: "user", parts: [{ text: prompt }] }],
//             systemInstruction: ` You are not a doctor but a Routine Analyzer so that you can analyze once routine and give its pros and cons also provide if else something else just return no idea`,
//         });

//         const aiResponse = result.response.text();

//         return { reply: aiResponse }; // Ensure it's an object with a `reply` key
//     } catch (err) {
//         console.error("AI service error:", err.message);
//         return { reply: "Sorry, I couldn't process that." }; // Ensure consistent response format
//     }
// }

  
// // Example usage
// generateContent("Explain how AI works")
//     // .then(console.log)
//     // .catch(console.error);

// module.exports = generateContent;






const { GoogleGenerativeAI } = require("@google/generative-ai");

// NOTE: Please ensure your environment variable name matches the key used here.
// Agar Render mein GEMINI_API_KEY use kiya hai, toh yahan bhi wahi use karein.
const genAI = new GoogleGenerativeAI(process.env.gemini_api); 
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function generateContent(prompt) {
    try {
        const result = await model.generateContent({
            // Prompt ko aur focused banane ke liye 'ANALYZE THIS ROUTINE:' tag add kiya hai
            contents: [{ role: "user", parts: [{ text: `ANALYZE THIS ROUTINE: ${prompt}` }] }],
            
            // Yahan Stronger Instruction hai 
            systemInstruction: `
                **STRICTLY ENFORCE ROLE:** You are a highly focused **ROUTINE ANALYZER** and **NOT** a Travel Planner, Doctor, or General Q&A bot.
                
                Your SOLE purpose is to perform routine analysis:
                1. Analyze the user-provided routine.
                2. Give its pros and cons clearly.
                
                ***DO NOT*** provide any advice or information related to travel, medical issues, or general topics.
                
                If the user prompt is NOT a routine for analysis (e.g., asking about travel, coding, or general knowledge), you **MUST** respond ONLY with the exact phrase: **"no idea, please provide a routine for analysis."**
            `,
        });

        const aiResponse = result.response.text();

        return { reply: aiResponse }; // Ensure it's an object with a `reply` key
    } catch (err) {
        console.error("AI service error:", err.message);
        // Rate Limit error (429) ya anya server error aane par
        return { reply: "Sorry, I couldn't process the request due to a service error. Please try again later." };
    }
}

module.exports = generateContent;