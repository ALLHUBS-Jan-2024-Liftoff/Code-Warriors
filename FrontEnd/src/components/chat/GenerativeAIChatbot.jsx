import React, { useState } from 'react';
import { generateText } from './GenerativeAiApi';

const GenerativeAIChatbot = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
    const generatedText = await generateText(input);
    setResponse(generatedText);
    
    } catch (err) {
      setError('Failed to generate text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="chat-container max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="w-full p-2 border border-gray-300 rounded-md resize-none h-24"
          rows="4"
        />
         <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {response && <p className="response">{response}</p>}
    </div>
  );
};

export default GenerativeAIChatbot;
