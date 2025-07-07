import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartBar, FaFileUpload } from 'react-icons/fa';

const BusinessIntelligenceBOT = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    const formData = new FormData();
    formData.append('Sales', file);
    try {
      const response = await fetch('https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook-test/Sales', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to fetch results');
      const data = await response.json();
      setResult(data[0]);
    } catch (err) {
      setError('Failed to process file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-500 p-3 rounded-lg shadow">
          <FaChartBar className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Business Intelligence BOT</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium">Upload Sales Data File</span>
          <div className="flex items-center mt-2">
            <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} className="mr-2" />
            <FaFileUpload className="text-gray-400" />
          </div>
        </label>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-bold text-lg shadow hover:from-blue-600 hover:to-green-600 transition-colors"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Analyze'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gray-50 p-4 rounded-lg border"
        >
          <h3 className="text-lg font-bold mb-2">KPI Summary Report</h3>
          {typeof result.Summary === 'string' ? (
            <div className="mb-2 text-gray-700">{result.Summary}</div>
          ) : (
            <ul className="mb-2 text-gray-700">
              <li><b>Total Revenue:</b> {result.Summary?.totalRevenue}</li>
              <li><b>Average Revenue:</b> {result.Summary?.averageRevenue}</li>
              <li><b>Min Revenue:</b> {result.Summary?.minRevenue}</li>
              <li><b>Max Revenue:</b> {result.Summary?.maxRevenue}</li>
              <li><b>Rows:</b> {result.Summary?.rowCount}</li>
            </ul>
          )}
          <div className="mb-1"><b>Suggestion:</b> {result.Suggestion}</div>
          <div className="mb-1 text-red-600"><b>Issue:</b> {result.Error}</div>
          <div className="text-xs text-gray-400 mt-2">Time: {new Date(result['Time Stamp']).toLocaleString()}</div>
        </motion.div>
      )}
    </div>
  );
};

export default BusinessIntelligenceBOT;
