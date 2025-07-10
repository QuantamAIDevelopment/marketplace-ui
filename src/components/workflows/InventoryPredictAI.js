import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaFileUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { uploadInventoryAndGetForecast } from '../../services/workflows/inventoryPredictAI';

const InventoryPredictAI = ({ compact = false }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setForecast(null);
    if (!file) {
      setError('Please upload an inventory file.');
      return;
    }
    setLoading(true);
    try {
      const response = await uploadInventoryAndGetForecast(file);
      setForecast(response);
    } catch (err) {
      setError('Failed to get forecast. ' + (err?.message || ''));
      console.error('Forecast error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={compact ? 'space-y-4 w-full overflow-hidden' : 'space-y-8 w-full'}>
      <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
        <div className={compact ? 'bg-indigo-500 p-2 rounded-lg shadow' : 'bg-indigo-500 p-3 rounded-lg shadow-lg'}>
          <FaChartLine className={compact ? 'w-5 h-5 text-white' : 'w-6 h-6 text-white'} />
        </div>
        <h3 className={compact ? 'text-lg font-display text-anthropic-dark font-bold' : 'text-2xl font-display text-anthropic-dark font-bold'}>
          Inventory Forecasting AI
        </h3>
      </div>
      <p className={compact ? 'text-xs text-gray-600' : 'text-sm text-gray-700'}>
        Upload your inventory file to get AI-powered sales forecasts, stockout/overstock risks, and actionable suggestions.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <FaFileUpload className="text-gray-500" />
          <input type="file" onChange={handleFileChange} className="hidden" />
          <span className="text-sm">{file ? file.name : 'Choose inventory file...'}</span>
        </label>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {loading ? 'Analyzing...' : 'Get Forecast'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="mt-6 space-y-4">
        {forecast && (
          <motion.div className="bg-white p-4 rounded-lg shadow border" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            {forecast["\ud83d\udce6 Inventory Forecast Summary"] && (
              <div className="mb-2 text-base text-indigo-700 font-semibold whitespace-pre-line">
                {forecast["\ud83d\udce6 Inventory Forecast Summary"]}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {forecast.SKU && <div><b>SKU:</b> {forecast.SKU}</div>}
              {forecast["Predicted Sales"] && <div><b>Predicted Sales:</b> {forecast["Predicted Sales"]}</div>}
              {forecast["Overstock Risk"] && <div><b>Overstock Risk:</b> {forecast["Overstock Risk"]}</div>}
              {forecast["Suggested Action"] && <div className="text-green-700"><b>Suggested Action:</b> {forecast["Suggested Action"]}</div>}
            </div>
          </motion.div>
        )}
      </div>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/inventory-predict-ai')}
        className={compact ? 'w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-indigo-600 hover:to-blue-600 transition-colors' : 'w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 transition-colors'}
      >
        View Details
      </motion.button>
    </div>
  );
};

export default InventoryPredictAI; 