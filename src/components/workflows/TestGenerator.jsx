import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVial } from 'react-icons/fa';
import { generateTestCases } from '../../services/workflows/testGenerator';

const TestGenerator = () => {
  const [docTitle, setDocTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [docId, setDocId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateTestCases(docTitle, author, docId);
      setResult(response);
    } catch (err) {
      setError('Failed to generate test cases. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center space-x-4 mb-2">
        <div className="bg-purple-500 p-3 rounded-lg shadow-lg">
          <FaVial className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-display text-anthropic-dark font-bold">Test Case Generator</h3>
      </div>
      <p className="text-sm text-gray-700">
        Generate structured test cases from your feature specification document. Enter the document title, author, and Google Doc ID.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={docTitle}
          onChange={e => setDocTitle(e.target.value)}
          placeholder="Document Title"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Author"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={docId}
          onChange={e => setDocId(e.target.value)}
          placeholder="Google Doc ID"
          className="w-full p-2 border rounded"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #7c3aed33' }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition-colors disabled:bg-purple-300"
        >
          {loading ? 'Generating...' : 'Generate Test Cases'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {result && (
        <div className="mt-6">
          <h4 className="text-lg font-bold mb-2">Test Case Result</h4>
          <div className="bg-white rounded-lg shadow p-4 border">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 text-left">Test ID</th>
                  <th className="px-2 py-1 text-left">Title</th>
                  <th className="px-2 py-1 text-left">Type</th>
                  <th className="px-2 py-1 text-left">Steps</th>
                  <th className="px-2 py-1 text-left">Expected Results</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">{result["test id"]}</td>
                  <td className="border px-2 py-1">{result.title}</td>
                  <td className="border px-2 py-1">{result.type}</td>
                  <td className="border px-2 py-1">
                    <ul className="list-disc pl-4">
                      {Array.isArray(result.steps) ? result.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      )) : <li>{result.steps}</li>}
                    </ul>
                  </td>
                  <td className="border px-2 py-1">{result["expected results"]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestGenerator; 