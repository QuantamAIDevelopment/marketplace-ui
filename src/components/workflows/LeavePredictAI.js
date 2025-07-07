import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserShield } from 'react-icons/fa';
import { getLeavePrediction } from '../../services/workflows/leavePredictAI';

const LeavePredictAI = ({ compact = false }) => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const data = await getLeavePrediction(file);
      setResults(data);
    } catch (err) {
      setError('Failed to get leave prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={compact ? 'space-y-4 w-full overflow-hidden' : 'space-y-8 w-full'}>
      <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
        <div className={compact ? 'bg-indigo-500 p-2 rounded-lg shadow' : 'bg-indigo-500 p-3 rounded-lg shadow-lg'}>
          <FaUserShield className={compact ? 'w-5 h-5 text-white' : 'w-6 h-6 text-white'} />
        </div>
        <h3 className={compact ? 'text-lg font-display text-anthropic-dark font-bold' : 'text-2xl font-display text-anthropic-dark font-bold'}>
          LeavePredict AI – Absenteeism & Leave Pattern Prediction
        </h3>
      </div>
      <p className={compact ? 'text-xs text-gray-600' : 'text-sm text-gray-700'}>
        Upload employee leave data to predict absenteeism risk and get actionable HR insights.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading || !file}
          className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 disabled:bg-indigo-300"
        >
          {loading ? 'Predicting...' : 'Predict Absenteeism Risk'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {results.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <motion.table
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-w-full bg-white rounded-lg shadow border"
          >
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2 text-left">Employee ID</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Risk Level</th>
                <th className="px-4 py-2 text-left">Probability</th>
                <th className="px-4 py-2 text-left">Explanation</th>
                <th className="px-4 py-2 text-left">Suggested Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b hover:bg-indigo-50"
                >
                  <td className="px-4 py-2 font-mono">{row.Employee_ID}</td>
                  <td className="px-4 py-2">{row.Department}</td>
                  <td className="px-4 py-2 font-semibold text-indigo-700">{row.RiskLevel}</td>
                  <td className="px-4 py-2">{row.AbsenteeismProbability}</td>
                  <td className="px-4 py-2 text-sm max-w-xs whitespace-pre-line">{row.Explanation}</td>
                  <td className="px-4 py-2 text-sm max-w-xs whitespace-pre-line">{row.SuggestedAction}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      )}
    </div>
  );
};

export default LeavePredictAI; 