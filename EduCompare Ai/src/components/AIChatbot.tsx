import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
// Vite uses import.meta.env to read the .env file
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi! I'm the EduCompare AI Assistant. How can I help you find the perfect course today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !apiKey) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);


// Replace the try block lines 39-41 with this:
try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `You are a helpful assistant for an educational website called EduCompare Ai. 
      Keep your answers short, friendly, and helpful. 
      The user says: ${userMessage}`;

      const result = await model.generateContent(prompt);
      const response = result.response; 
      const botResponse = response.text();
      
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    } catch (error) {
       // Log the error to your browser console so you can see the real reason
       console.error("DETAILED ERROR:", error); 
       
       setMessages(prev => [...prev, { text: "Oops! My brain is a little disconnected right now. Check your API key!", isBot: true }]);
    }
     finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[450px]">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              ✨ EduCompare AI
            </h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200 font-bold">
              ✕
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.isBot ? 'bg-white border border-gray-200 text-gray-800 self-start rounded-tl-none' : 'bg-blue-600 text-white self-end rounded-tr-none'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white border border-gray-200 text-gray-500 self-start rounded-lg rounded-tl-none p-3 text-sm animate-pulse">
                Thinking...
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a course..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-sm"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-transform hover:scale-110 flex items-center justify-center border-2 border-white"
          style={{ width: '60px', height: '60px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
}