import React, { useState } from 'react';
import { FaChartLine, FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { uploadDynamicPricingCSV } from '../../services/workflows/dynamicPricingAgent';

const DynamicPricingAgent = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);
    try {
      if (!file) {
        setError('Please select a CSV file to upload.');
        setLoading(false);
        return;
      }
      const response = await uploadDynamicPricingCSV(file);
      setResults(response);
    } catch (err) {
      setError('Failed to process the file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-500 p-3 rounded-full shadow">
          <FaChartLine className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Dynamic Pricing Agent</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="font-semibold">Upload Product Inventory CSV:</label>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="border p-2 rounded flex-1"
            disabled={loading}
          />
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            <FaUpload className="mr-2" /> {loading ? 'Processing...' : 'Run Pricing Agent'}
          </motion.button>
        </div>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {results.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border text-sm rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">Product Id</th>
                <th className="px-3 py-2 border">Product Name</th>
                <th className="px-3 py-2 border">Old Price</th>
                <th className="px-3 py-2 border">New Price</th>
                <th className="px-3 py-2 border">Reason</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, idx) => (
                <tr key={idx} className="hover:bg-blue-50">
                  <td className="px-3 py-2 border font-mono">{row["Product Id"]}</td>
                  <td className="px-3 py-2 border">{row["Product Name"]}</td>
                  <td className="px-3 py-2 border text-right">₹{row["Old Price"]}</td>
                  <td className="px-3 py-2 border text-right font-semibold text-green-700">₹{row["New Price"]}</td>
                  <td className="px-3 py-2 border text-xs text-gray-700">{row["Reason"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DynamicPricingAgent; 