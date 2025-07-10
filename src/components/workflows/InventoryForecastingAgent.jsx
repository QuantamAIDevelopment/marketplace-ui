import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/inventory';

const InventoryForecastingAgent = () => {
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
      setError('Please upload a CSV file.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('csv', file);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to get forecast.');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to get forecast. Network Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto mt-10">
      <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-center mb-6 text-gray-800">
        <span className="inline-flex items-center gap-2"><FaChartLine className="text-blue-500" /> Inventory Forecasting Agent</span>
      </motion.h1>
      <p className="text-center text-gray-600 mb-6">
        Upload your inventory CSV to get AI-powered sales forecasts, stockout/overstock risks, and actionable suggestions for each product.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" accept=".csv" onChange={handleFileChange} className="w-full p-2 border rounded" />
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300">
          {loading ? 'Getting Forecast...' : 'Get Forecast'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {result && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-bold mb-2 text-blue-800 flex items-center"><FaChartLine className="mr-2" />Forecast Summary</h3>
          <div className="prose max-w-none">
            {result["\uD83D\uDCE6 Inventory Forecast Summary"] && (
              <p>{result["\uD83D\uDCE6 Inventory Forecast Summary"]}</p>
            )}
            {result.SKU && <p><b>SKU:</b> {result.SKU}</p>}
            {result["Predicted Sales"] && <p><b>Predicted Sales:</b> {result["Predicted Sales"]}</p>}
            {result["Overstock Risk"] && <p><b>Overstock Risk:</b> {result["Overstock Risk"]}</p>}
            {result["Suggested Action"] && <p><b>Suggested Action:</b> {result["Suggested Action"]}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryForecastingAgent; 