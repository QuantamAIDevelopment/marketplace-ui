import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserShield } from 'react-icons/fa';
import axios from 'axios';

const riskColor = (risk) => {
  if (risk === 'High') return 'text-red-600';
  if (risk === 'Medium') return 'text-orange-500';
  return 'text-green-600';
};

const BackgroundVerificationAgent = ({ compact = false }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResults(null);
    setError(null);
    if (e.target.files[0]) {
      console.log('Selected file:', e.target.files[0]);
    }
  };

  const handleFetch = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const formData = new FormData();
      formData.append('aifraud', file);
      // Debug: log FormData content
      for (let pair of formData.entries()) {
        console.log('FormData:', pair[0], pair[1]);
      }
      const response = await axios.post('http://localhost:5678/webhook/ai fraud', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('API response:', response);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setResults(response.data);
      } else {
        setResults(null);
        setError('No results returned or unexpected response: ' + JSON.stringify(response.data));
      }
    } catch (err) {
      console.error('API error:', err);
      if (err.response && err.response.data) {
        setError('API Error: ' + JSON.stringify(err.response.data));
      } else {
        setError('Failed to fetch results: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={compact ? 'space-y-4 w-full overflow-hidden' : 'space-y-8 w-full'}>
      <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
        <div className={compact ? 'bg-blue-600 p-2 rounded-lg shadow' : 'bg-blue-600 p-3 rounded-lg shadow-lg'}>
          <FaUserShield className={compact ? 'w-5 h-5 text-white' : 'w-6 h-6 text-white'} />
        </div>
        <h3 className={compact ? 'text-lg font-display text-anthropic-dark font-bold' : 'text-2xl font-display text-anthropic-dark font-bold'}>
          AI Background Verification Agent
        </h3>
      </div>
      <p className={compact ? 'text-xs text-gray-600' : 'text-sm text-gray-700'}>
        Analyze and validate candidate backgrounds using resume, LinkedIn, GitHub, and social media data. Get risk scores and red flags instantly.
      </p>
      <div className="mb-2">
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {file && <div className="text-xs text-gray-600 mt-1">Selected file: {file.name}</div>}
      </div>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
        whileTap={{ scale: 0.97 }}
        onClick={handleFetch}
        disabled={loading || !file}
        className={compact ? 'w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-blue-700 hover:to-green-600 transition-colors disabled:opacity-60' : 'w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-green-600 transition-colors disabled:opacity-60'}
      >
        {loading ? 'Analyzing...' : 'Run Background Verification'}
      </motion.button>
      {error && <div className="text-red-500 text-sm whitespace-pre-wrap">{error}</div>}
      {results && (
        <div className="space-y-6 mt-4">
          {results.map((candidate, idx) => (
            <div key={idx} className="border rounded-lg p-4 shadow bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">{candidate.name}</span>
                <span className={`font-semibold ${riskColor(candidate.riskRating)}`}>{candidate.riskRating} Risk</span>
              </div>
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-gray-700 font-medium">Score:</span>
                <span className="font-mono text-base">{candidate.score}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium text-gray-700">Flags:</span>
                {candidate.flags && candidate.flags.length > 0 ? (
                  <ul className="list-disc ml-6 text-red-500">
                    {candidate.flags.map((flag, i) => (
                      <li key={i}>{flag}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="ml-2 text-green-600">No red flags</span>
                )}
              </div>
              <div className="text-gray-800 mt-2">
                <span className="font-medium">Summary:</span> {candidate.summary}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BackgroundVerificationAgent; 