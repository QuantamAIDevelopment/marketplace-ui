import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaPaperPlane } from 'react-icons/fa';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/dynamic routing agent';

const modelLabels = {
  'perplexity/sonar': 'Perplexity Sonar (Web Search)',
  'openai/gpt-4o-mini': 'OpenAI GPT-4o Mini',
  'anthropic/claude-3.7-sonnet': 'Anthropic Claude 3.7 Sonnet',
  'meta-llama/llama-3-70b-instruct': 'Meta Llama 3 70B Instruct',
  'google/gemini-2.5-pro-preview': 'Google Gemini 2.5 Pro',
  'qwen/qwen-qwq-32b': 'Qwen QWQ 32B',
  'openai/codex-mini': 'OpenAI Codex Mini',
  'openai/o1-pro': 'OpenAI O1 Pro',
};

const DynamicModelSelector = () => {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('question', question);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Server error: ' + response.status);
      }
      let text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
        setResult(data);
      } catch {
        setResult({
          model: null,
          prompt: question,
          answer: text
        });
      }
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError('Network error: Unable to reach the server. Please check your connection or try again later.');
      } else {
        setError('Failed to get model selection. ' + (err.message || ''));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-center mb-4 text-gray-800 flex items-center justify-center gap-2">
        <FaRobot className="text-purple-600" /> Dynamic Model Selector for Optimal AI Responses
      </motion.h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask your question (e.g. What’s the latest news about AI regulation in the EU?)"
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
          required
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading || !question}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:from-purple-700 hover:to-blue-600 disabled:bg-purple-300 text-lg"
        >
          <FaPaperPlane /> {loading ? 'Selecting...' : 'Select Model & Get Response'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-4 text-center font-semibold">{error}</div>}
      {result && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg shadow-inner">
          {result.model && (
            <>
              <div className="font-semibold mb-2 text-gray-700">Model Selection Result:</div>
              <div className="mb-2">
                <span className="font-semibold">Selected Model:</span>{' '}
                <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {modelLabels[result.model] || result.model}
                </span>
              </div>
              <div>
                <span className="font-semibold">Prompt Sent:</span>{' '}
                <span className="text-gray-800">{result.prompt}</span>
              </div>
            </>
          )}
          {result.answer && (
            <div className="mt-4">
              <div className="font-semibold mb-2 text-gray-700">AI Response:</div>
              <div className="whitespace-pre-line text-gray-900 text-base bg-white p-3 rounded border">
                {result.answer}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DynamicModelSelector;
