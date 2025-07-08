import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserShield } from 'react-icons/fa';
import { uploadCandidateFileAndGetBGV } from '../../services/workflows/aiBackroundVerification';

const riskColors = {
  Low: 'text-green-600',
  Medium: 'text-yellow-600',
  High: 'text-red-600',
};

const AIBackroundVerificationCard = ({ compact = false }) => {
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
      const data = await uploadCandidateFileAndGetBGV(file);
      setResults(data);
    } catch (err) {
      setError('Failed to process background verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={compact ? 'space-y-4 w-full overflow-hidden' : 'space-y-8 w-full'}>
      <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
        <div className={compact ? 'bg-blue-500 p-2 rounded-lg shadow' : 'bg-blue-500 p-3 rounded-lg shadow-lg'}>
          <FaUserShield className={compact ? 'w-5 h-5 text-white' : 'w-6 h-6 text-white'} />
        </div>
        <h3 className={compact ? 'text-lg font-display text-anthropic-dark font-bold' : 'text-2xl font-display text-anthropic-dark font-bold'}>
          AI Background Verification
        </h3>
      </div>
      <p className={compact ? 'text-xs text-gray-600' : 'text-sm text-gray-700'}>
        Upload a candidate resume or data file to automatically analyze and verify background, social, and technical signals. Get a risk score and red flags instantly.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading || !file}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-blue-600 hover:to-purple-600 transition-colors disabled:bg-gray-300"
        >
          {loading ? 'Verifying...' : 'Run Background Verification'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <div className="mt-6 space-y-4">
        {results && results.length > 0 && results.map((res, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-4 rounded-lg shadow border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg">{res.name}</span>
              <span className={`font-semibold ${riskColors[res.riskRating] || 'text-gray-700'}`}>{res.riskRating} Risk</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Score:</span> <span>{res.score}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Flags:</span>
              {res.flags && res.flags.length > 0 ? (
                <ul className="list-disc list-inside ml-4 text-sm text-red-600">
                  {res.flags.map((flag, i) => (
                    <li key={i}>{flag}</li>
                  ))}
                </ul>
              ) : (
                <span className="ml-2 text-green-600">No red flags</span>
              )}
            </div>
            <div className="mt-2 text-gray-700 text-sm">
              <span className="font-semibold">Summary:</span> {res.summary}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIBackroundVerificationCard; 