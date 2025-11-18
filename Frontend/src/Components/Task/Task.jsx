// import React, { useState } from 'react';
// import axios from 'axios';

// const Task = () => {
//     const [input, setInput] = useState('');
//     const [messages, setMessages] = useState([]);

//     async function getAIResponse() {
//         try {
//             const response = await axios.post(
//                 "https://routineinfy-3.onrender.com/ai/get-review",
//                 { prompt: input.trim() }, // Ensure input isn't empty or just spaces
//                 { headers: { "Content-Type": "application/json" } }
//             );
    
//             console.log("API Response:", response.data);
    
//             if (response.data && response.data.reply) {
//                 setMessages([
//                     ...messages,
//                     { text: input, user: true },
//                     { text: response.data.reply, user: false }
//                 ]);
//             } else {
//                 console.error("Invalid response format:", response.data);
//             }
    
//             setInput('');
//         } catch (error) {
//             console.error("Error fetching AI response:", error.response?.data || error.message);
//             alert("Failed to get a response. Please try again!");
//         }
//     }
    

//     return (
//         <div style={styles.container}>
//             <div style={styles.chatbox}>
//                 {messages.map((msg, index) => (
//                     <div key={index} style={{ ...styles.message, alignSelf: msg.user ? 'flex-end' : 'flex-start', backgroundColor: msg.user ? '#4caf50' : '#2196f3' }}>
//                         {msg.text}
//                     </div>
//                 ))}
//             </div>
//             <div style={styles.inputContainer}>
//                 <input
//                     style={styles.input}
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Ask me anything..."
//                 />
//                 <button style={styles.button} onClick={getAIResponse}>Send</button>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     container: { display: 'flex', flexDirection: 'column', width: '400px', margin: '0 auto', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)' },
//     chatbox: { flex: 1, height: '400px', overflowY: 'auto', padding: '10px', marginBottom: '10px', backgroundColor: '#fff', borderRadius: '8px' },
//     message: { 
//         padding: '10px', 
//         borderRadius: '15px', 
//         margin: '5px 0', 
//         color: '#fff', 
//         backgroundColor:'red', // Change bot message color
//         maxWidth: '70%' 
//     },
//     inputContainer: { display: 'flex', gap: '10px' },
//     input: { flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' },
//     button: { padding: '10px 15px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }
// };

// export default Task;










import React, { useState } from 'react';
import axios from 'axios';

const Task = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

   
    async function getAIResponse() {
        if (!input.trim()) {
            alert("Please enter a prompt.");
            return;  
        }

        try {
            const response = await axios.post(
                "https://routineinfy-3.onrender.com/ai/get-review",
                { prompt: input.trim() },  
                { headers: { "Content-Type": "application/json" } }
            );
    
            console.log("API Response:", response.data);
    
            if (response.data && response.data.reply) {
                // Update the messages using the previous state value to ensure correct ordering
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: input, user: true }, // User's input message
                    { text: response.data.reply, user: false } // AI's response
                ]);
            } else {
                console.error("Invalid response format:", response.data);
                alert("Invalid response format from AI.");
            }
    
            setInput('');
        } catch (error) {
            console.error("Error fetching AI response:", error.response?.data || error.message);
            alert("Failed to get a response. Please try again!");
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.chatbox}>
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        style={{ 
                            ...styles.message, 
                            alignSelf: msg.user ? 'flex-end' : 'flex-start', 
                            backgroundColor: msg.user ? '#4caf50' : '#2196f3' 
                        }}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    style={styles.input}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                />
                <button style={styles.button} onClick={getAIResponse}>Send</button>
            </div>
        </div>
    );
};

const styles = {
    container: { 
        display: 'flex', 
        flexDirection: 'column', 
        width: '400px', 
        margin: '0 auto', 
        padding: '20px', 
        backgroundColor: '#f4f4f4', 
        borderRadius: '10px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)' 
    },
    chatbox: { 
        flex: 1, 
        height: '400px', 
        overflowY: 'auto', 
        padding: '10px', 
        marginBottom: '10px', 
        backgroundColor: '#fff', 
        borderRadius: '8px' 
    },
    message: { 
        padding: '10px', 
        borderRadius: '15px', 
        margin: '5px 0', 
        color: '#fff', 
        maxWidth: '70%' 
    },
    inputContainer: { 
        display: 'flex', 
        gap: '10px' 
    },
    input: { 
        flex: 1, 
        padding: '10px', 
        borderRadius: '5px', 
        border: '1px solid #ddd' 
    },
    button: { 
        padding: '10px 15px', 
        backgroundColor: '#4caf50', 
        color: '#fff', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer' 
    }
};

export default Task;
