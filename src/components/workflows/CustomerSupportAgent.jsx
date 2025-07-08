import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/Customer support';

const CustomerSupportAgent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: input,
      });
      if (!res.ok) throw new Error('Failed to get response');
      const text = await res.text();
      setResponse(text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-500 p-3 rounded-lg">
          <FaRobot className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold">Customer Support Agent</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border rounded p-2 min-h-[80px]"
          placeholder="Enter your name, order ID, and query (e.g. order tracking)"
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl font-bold text-base shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Ask Support Agent'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {response && (
        <div className="mt-6 bg-gray-50 border rounded p-4 whitespace-pre-wrap text-sm">
          {response}
        </div>
      )}
    </div>
  );
};

export default CustomerSupportAgent;
