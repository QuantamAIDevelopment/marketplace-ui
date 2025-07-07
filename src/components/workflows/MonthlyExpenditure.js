import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRupeeSign, FaFileUpload, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { uploadMonthlyExpenditureFile, submitManualBill } from '../../services/workflows/monthlyExpenditure';

const MonthlyExpenditure = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [manualResponse, setManualResponse] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid file.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await uploadMonthlyExpenditureFile(file);
      setResult(response);
    } catch (err) {
      setError('Failed to process expenditure file. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualBillSubmit = async (billData) => {
    setLoading(true);
    setError(null);
    setManualResponse(null);
    try {
      const response = await submitManualBill(billData);
      setManualResponse(response);
    } catch (err) {
      setError('Failed to submit bill. Check the console for more details.');
      setManualResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const renderBreakdown = (categorized) => {
    if (!categorized || typeof categorized !== 'object') return null;
    return (
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Breakdown by Category</h4>
        <ul className="space-y-2">
          {Object.entries(categorized).map(([category, data]) => (
            <li key={category} className="bg-gray-50 rounded p-3 border flex flex-col md:flex-row md:items-center md:justify-between">
              <span className="font-medium text-blue-700">{category}</span>
              <span className="text-gray-700">Total: ₹{data.total}</span>
              <span className="text-xs text-gray-500">{data.items.length} items</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaRupeeSign className="text-teal-500" /> Monthly Expenditure</h3>
        <p className="text-sm text-gray-600">
          Upload your monthly expense file (CSV, XLSX, or JSON) to get instant insights and breakdowns.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors">
          <FaFileUpload className="mx-auto text-4xl text-gray-400 mb-4" />
          <input
            type="file"
            accept=".csv,.xlsx,.json"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-lg font-medium text-gray-700 mb-2">
              {file ? file.name : 'Click to upload expense file'}
            </div>
            <div className="text-sm text-gray-500">
              {file ? 'File selected' : 'CSV, XLSX, or JSON files supported'}
            </div>
          </label>
        </div>
        {file && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-green-50 p-4 rounded-lg border border-green-200"
          >
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-500" />
              <span className="text-green-700 font-medium">File ready for processing</span>
            </div>
          </motion.div>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading || !file}
          className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Analyze Expenditure'
          )}
        </motion.button>
      </form>
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <FaExclamationTriangle />
            <span>{error}</span>
          </div>
        </motion.div>
      )}
      {manualResponse && (
        <div className="mt-6 p-4 rounded-xl border bg-white">
          <h3 className="font-bold mb-2">Response</h3>
          {manualResponse.status === 200 && (
            <div className="text-green-600 mb-2 font-semibold">Bill submitted successfully!</div>
          )}
          <pre className="bg-gray-50 rounded p-3 text-xs overflow-x-auto">
            {JSON.stringify(manualResponse.data, null, 2)}
          </pre>
        </div>
      )}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg border"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Expenditure Summary</h3>
            {result.totalAmount !== undefined && (
              <div className="mb-4 text-lg font-semibold text-teal-700">Total Spent: ₹{result.totalAmount}</div>
            )}
            {renderBreakdown(result.categorized)}
            {result.summary && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold mb-2 text-blue-700">AI Summary</h4>
                <div className="prose prose-sm md:prose-base max-w-none text-anthropic-dark whitespace-pre-line">
                  {typeof result.summary === 'string' ? result.summary : JSON.stringify(result.summary, null, 2)}
                </div>
              </div>
            )}
            {(!result.totalAmount && !result.categorized && !result.summary) && (
              <div className="prose prose-sm md:prose-base max-w-none text-anthropic-dark whitespace-pre-line">
                {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MonthlyExpenditure; 