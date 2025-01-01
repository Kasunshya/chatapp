import { useState } from 'react';
import axios from 'axios';
import './index.css'; // Ensure Tailwind is imported

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  async function generateAnswers() {
    setAnswer('Generating...');
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBAPMct2QKJLD2mlSehsL_bZl0KKgMR7Bs',
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );
      setAnswer(response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer found');
    } catch (error) {
      console.error('Error generating answer:', error);
      setAnswer('Error generating answer');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
      🤖 Chat AI
      </h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full max-w-lg h-32 p-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500"
        placeholder="Type your question here..."
      ></textarea>
      <button
        onClick={generateAnswers}
        className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500"
        >
        Generate Answer
      </button>
      <div className="mt-6 max-w-lg text-lg text-white font-medium">
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default App;
