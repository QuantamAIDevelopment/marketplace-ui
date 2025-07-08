import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVial } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'https://bhavithareddy.app.n8n.cloud/webhook/doc-input';

const TestCaseGenerator = ({ compact = false }) => {
  const [form, setForm] = useState({ doctitle: '', author: '', docId: '' });
  const [loading, setLoading] = useState(false);
  const [testCase, setTestCase] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTestCase(null);
    try {
      const res = await axios.post(API_URL, form, {
        headers: { 'Content-Type': 'application/json' },
      });
      setTestCase(res.data);
    } catch (err) {
      setError('Failed to generate test case.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={compact ? 'space-y-4 w-full overflow-hidden' : 'space-y-8 w-full'}>
      <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
        <div className={compact ? 'bg-blue-500 p-2 rounded-lg shadow' : 'bg-blue-500 p-3 rounded-lg shadow-lg'}>
          <FaVial className={compact ? 'w-5 h-5 text-white' : 'w-6 h-6 text-white'} />
        </div>
        <h3 className={compact ? 'text-lg font-display text-anthropic-dark font-bold' : 'text-2xl font-display text-anthropic-dark font-bold'}>
          Test Case Generator
        </h3>
      </div>
      <p className={compact ? 'text-xs text-gray-600' : 'text-sm text-gray-700'}>
        Generate QA test cases from your feature docs using Evenmind AI.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="doctitle"
          placeholder="Document Title"
          value={form.doctitle}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="docId"
          placeholder="Google Doc ID"
          value={form.docId}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-blue-600 hover:to-green-600 transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Test Case'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 font-semibold">{error}</div>}
      {testCase && (
        <div className="mt-6 border rounded-lg p-4 bg-gray-50">
          <h4 className="font-bold text-lg mb-2">Test Case Result</h4>
          <div className="space-y-2">
            <div><span className="font-semibold">Test ID:</span> {testCase["test id"]}</div>
            <div><span className="font-semibold">Title:</span> {testCase.title}</div>
            <div><span className="font-semibold">Type:</span> {testCase.type}</div>
            <div>
              <span className="font-semibold">Steps:</span>
              <ol className="list-decimal ml-6">
                {Array.isArray(testCase.steps) && testCase.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
            <div>
              <span className="font-semibold">Expected Results:</span>
              <pre className="bg-white border rounded p-2 whitespace-pre-wrap">{testCase["expected results"]}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCaseGenerator;
