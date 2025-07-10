import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartBar } from 'react-icons/fa';
import { uploadSalesFileAndGetInsights } from '../../services/workflows/businessIntelligenceBot';

const parseSummary = (summary) => {
  // Try to parse JSON summary, otherwise return as is
  try {
    const parsed = JSON.parse(summary);
    if (typeof parsed === 'object') {
      return Object.entries(parsed).map(([key, value]) => (
        <div key={key} className="text-xs text-gray-700"><b>{key}:</b> {value}</div>
      ));
    }
  } catch {
    // Not JSON, return as string
  }
  return <div className="text-xs text-gray-700">{summary}</div>;
};

const BusinessIntelligenceBOT = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const response = await uploadSalesFileAndGetInsights(file);
      setResults(response);
    } catch (err) {
      setError('Failed to process file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center space-x-4 mb-2">
        <div className="bg-blue-500 p-3 rounded-lg shadow-lg">
          <FaChartBar className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-display text-anthropic-dark font-bold">Business Intelligence Explainer Bot</h3>
      </div>
      <p className="text-sm text-gray-700">
        Upload your sales data file (CSV/Excel) to get instant business insights, error detection, and actionable suggestions powered by AI.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Processing...' : 'Upload & Analyze'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="mt-6 space-y-4">
        {results.length > 0 && (
          <motion.div
            key={0}
            className="bg-white p-4 rounded-lg shadow border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <div className="text-xs text-gray-500 mb-1">{results[0]['Time Stamp'] && new Date(results[0]['Time Stamp']).toLocaleString()}</div>
            <div className="mb-1">{parseSummary(results[0]['Summary'])}</div>
            {results[0]['Error'] && <div className="text-sm text-red-600"><b>Error:</b> {results[0]['Error']}</div>}
            {results[0]['Suggestion'] && <div className="text-sm text-green-700"><b>Suggestion:</b> {results[0]['Suggestion']}</div>}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BusinessIntelligenceBOT; 