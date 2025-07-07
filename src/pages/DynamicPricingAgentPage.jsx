import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileUpload, FaMoneyBillWave, FaTable } from 'react-icons/fa';
import PageRevealWrapper from '../components/PageRevealWrapper';
import { triggerDynamicPricingAgentWorkflow } from '../services/workflows/dynamicPricing';

const DynamicPricingAgentPage = () => {
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
      const data = await triggerDynamicPricingAgentWorkflow(file);
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to process file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageRevealWrapper>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-green-600 p-3 rounded-lg shadow-lg">
            <FaMoneyBillWave className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-anthropic-dark">Dynamic Pricing Agent Workflow</h1>
        </div>
        <p className="mb-6 text-gray-700">
          Upload your product inventory file to get AI-powered dynamic price recommendations and rules-based insights. The results will show the new prices, reasons, and timestamps for each product.
        </p>
        {/* Example Use Case Section */}
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <h2 className="text-lg font-semibold mb-2 text-blue-700">Example Use Case</h2>
          <p className="text-gray-700">
            <strong>Scenario:</strong> An e-commerce manager wants to optimize prices for 500+ products based on inventory levels, competitor pricing, and sales trends. By uploading a CSV of their current catalog, the Dynamic Pricing Agent instantly recommends new prices, explains the rationale (e.g., "Stock running low, price increased by 10%"), and provides a timestamped audit trail. This enables rapid, data-driven pricing decisions that maximize revenue and reduce manual effort.
          </p>
        </div>
        {/* Why This Stands Out Section */}
        <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-400 rounded">
          <h2 className="text-lg font-semibold mb-2 text-green-700">Why This Stands Out</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Combines AI and business rules for highly accurate, context-aware pricing.</li>
            <li>Explains every price change with clear, human-readable reasons.</li>
            <li>Works with bulk uploads—process thousands of products in seconds.</li>
            <li>Provides a transparent audit trail for compliance and review.</li>
            <li>No coding or data science expertise required—just upload and go!</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <label className="flex items-center cursor-pointer">
              <FaFileUpload className="mr-2 text-blue-500" />
              <input type="file" accept=".csv,.xlsx,.xls,.json" onChange={handleFileChange} className="hidden" />
              <span className="bg-blue-100 px-3 py-2 rounded text-blue-700 font-medium hover:bg-blue-200 transition-colors">
                {file ? file.name : 'Choose File'}
              </span>
            </label>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-5 py-2 rounded font-bold shadow hover:bg-green-700 disabled:bg-green-300"
            >
              {loading ? 'Processing...' : 'Upload & Get Pricing'}
            </motion.button>
          </div>
        </form>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="overflow-x-auto mt-8"
            >
              <div className="flex items-center mb-2 space-x-2">
                <FaTable className="text-gray-500" />
                <h2 className="text-xl font-bold">Pricing Results</h2>
              </div>
              <table className="min-w-full bg-white border rounded shadow">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Product Id</th>
                    <th className="px-4 py-2 text-left">Product Name</th>
                    <th className="px-4 py-2 text-left">Old Price</th>
                    <th className="px-4 py-2 text-left">New Price</th>
                    <th className="px-4 py-2 text-left">Reason</th>
                    <th className="px-4 py-2 text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 font-mono">{row["Product Id"]}</td>
                      <td className="px-4 py-2">{row["Product Name"]}</td>
                      <td className="px-4 py-2 text-right">₹{row["Old Price"]}</td>
                      <td className="px-4 py-2 text-right font-bold text-green-700">₹{row["New Price"]}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{row["Reason"]}</td>
                      <td className="px-4 py-2 text-xs text-gray-500">{row["Timestamp"] ? new Date(row["Timestamp"]).toLocaleString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageRevealWrapper>
  );
};

export default DynamicPricingAgentPage; 