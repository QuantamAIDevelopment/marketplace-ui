import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/03855d19-fadb-4ded-8aaa-07566948c44d';

const AIPoweredRestaurantOrderChatbot = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter your order or question.');
      return;
    }
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await axios.post(API_URL, input, {
        headers: { 'Content-Type': 'text/plain' },
      });
      setResponse(res.data);
      setHistory((prev) => [...prev, { user: input, bot: res.data }]);
      setInput('');
    } catch (err) {
      setError('Failed to get response from the AI. Please try again.');
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FaRobot className="text-purple-500" /> AI-Powered Restaurant Order Chatbot
        </h3>
        <p className="text-sm text-gray-600">
          Chat with our AI assistant to place your restaurant order. You can type your order in any natural format, and the AI will understand, confirm, and summarize your order for you!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-2 items-stretch">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 2 butter chicken, 1 naan, table 4"
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-base"
            disabled={loading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading || !input.trim()}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 rounded-lg font-semibold shadow hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200"
          >
            <FaPaperPlane />
            {loading ? 'Sending...' : 'Send'}
          </motion.button>
        </div>
      </form>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <FaExclamationTriangle />
            <span>{error}</span>
          </div>
        </motion.div>
      )}
      <AnimatePresence>
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg border"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Conversation</h3>
            <div className="space-y-6">
              {history.map((msg, idx) => (
                <div key={idx} className="">
                  <div className="mb-1 text-sm text-gray-500">You:</div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-2 text-gray-900 whitespace-pre-line">{msg.user}</div>
                  <div className="mb-1 text-sm text-gray-500">AI:</div>
                  <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 text-gray-900 whitespace-pre-line">{msg.bot}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 p-6 rounded-lg shadow-lg border border-green-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-green-500" />
            <span className="font-semibold text-green-700">AI Response</span>
          </div>
          <div className="prose prose-sm md:prose-base max-w-none text-anthropic-dark whitespace-pre-line">
            {response}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIPoweredRestaurantOrderChatbot; 