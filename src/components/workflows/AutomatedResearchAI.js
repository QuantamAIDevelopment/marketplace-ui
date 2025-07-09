import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaFilePdf, FaSpinner } from 'react-icons/fa';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/research-start';

const AutomatedResearchAI = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!topic.trim()) {
      setError('Please enter a research topic.');
      return;
    }
    setLoading(true);
    try {
      // Send as query param, as per cURL example
      const url = `${API_URL}?Topic=${encodeURIComponent(topic)}`;
      const response = await fetch(url, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to generate research report.');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-blue-500 p-3 rounded-lg shadow-lg">
          <FaRobot className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-display font-bold text-anthropic-dark">Automated Research with AI</h2>
      </div>
      <p className="text-gray-700 mb-4">Enter a topic and get a structured, in-depth research report as a downloadable PDF, powered by AI.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter research topic (e.g. Gandhi)"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          disabled={loading}
        />
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-bold text-lg shadow-lg hover:from-blue-600 hover:to-green-600 transition-colors flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            <FaFilePdf className="mr-2" />
          )}
          {loading ? 'Generating...' : 'Generate Research PDF'}
        </motion.button>
      </form>
      {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}
      {result && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 border flex flex-col items-center">
          <p className="font-semibold text-green-700 mb-2">Research PDF is ready!</p>
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg font-bold shadow hover:bg-green-600 transition-colors"
          >
            <FaFilePdf className="mr-2" /> Download PDF ({result.pageCount} pages)
          </a>
          <p className="text-xs text-gray-500 mt-2">Link valid till: {new Date(result.outputLinkValidTill).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default AutomatedResearchAI;
