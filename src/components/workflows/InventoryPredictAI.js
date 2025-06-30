import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaFileUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { uploadInventoryAndGetForecast } from '../../services/workflows/inventoryPredictAI';

const parseForecastSummary = (text) => {
  // Split by SKU blocks
  const blocks = text.split(/SKU:/).filter(Boolean);
  return blocks.map((block) => {
    const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
    const skuLine = lines[0] || '';
    const skuMatch = skuLine.match(/^(\S+)\s+—\s+(.+)/);
    const sku = skuMatch ? skuMatch[1] : skuLine;
    const productName = skuMatch ? skuMatch[2] : '';
    const details = {};
    lines.slice(1).forEach(line => {
      if (line.startsWith('🔹 Predicted Sales:')) details.predictedSales = line.replace('🔹 Predicted Sales:', '').trim();
      else if (line.startsWith('🔹 Current Stock:')) details.currentStock = line.replace('🔹 Current Stock:', '').trim();
      else if (line.startsWith('🔹 Lead Time:')) details.leadTime = line.replace('🔹 Lead Time:', '').trim();
      else if (line.startsWith('🔻 Stockout Risk:')) details.stockoutRisk = line.replace('🔻 Stockout Risk:', '').trim();
      else if (line.startsWith('🔹 Overstock Risk:')) details.overstockRisk = line.replace('🔹 Overstock Risk:', '').trim();
      else if (line.startsWith('🔸 Suggested Action:')) details.suggestedAction = line.replace('🔸 Suggested Action:', '').trim();
      else if (line.startsWith('🔹 No immediate action needed')) details.noAction = true;
    });
    return { sku, productName, ...details };
  });
};

const InventoryPredictAI = ({ compact = false }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setForecast([]);
    if (!file) {
      setError('Please upload an inventory file.');
      return;
    }
    setLoading(true);
    try {
      const response = await uploadInventoryAndGetForecast(file);
      console.log('API response:', responsegit ); // Debug log
      // Try to extract the summary string
      const summaryText = typeof response === 'string'
        ? response
        : response.result || response.data || JSON.stringify(response);
      if (!summaryText || summaryText.length < 10) {
        setError('No forecast summary found. Raw response: ' + JSON.stringify(response));
        setForecast([]);
      } else {
        const parsed = parseForecastSummary(summaryText);
        setForecast(parsed);
      }
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
        {forecast.map((item, idx) => (
          <motion.div key={idx} className="bg-white p-4 rounded-lg shadow border" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-bold text-indigo-700">{item.sku}</span>
              <span className="text-gray-700">{item.productName}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {item.predictedSales && <div><b>Predicted Sales:</b> {item.predictedSales}</div>}
              {item.currentStock && <div><b>Current Stock:</b> {item.currentStock}</div>}
              {item.leadTime && <div><b>Lead Time:</b> {item.leadTime}</div>}
              {item.stockoutRisk && <div className="text-red-600"><b>Stockout Risk:</b> {item.stockoutRisk}</div>}
              {item.overstockRisk && <div className="text-yellow-600"><b>Overstock Risk:</b> {item.overstockRisk}</div>}
              {item.suggestedAction && <div className="text-green-700"><b>Suggested Action:</b> {item.suggestedAction}</div>}
              {item.noAction && <div className="text-gray-500 italic">No immediate action needed</div>}
            </div>
          </motion.div>
        ))}
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