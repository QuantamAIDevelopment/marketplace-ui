import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRupeeSign, FaFileUpload, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';

const MANUAL_BILL_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/c411e19d-03d4-4c49-9e86-10a44edf5f16';
const FILE_UPLOAD_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/ee0c9efc-9d9b-4af0-af24-f7c147e52ee7';

const MonthlyExpenditure = () => {
  // Manual bill entry state
  const [amount, setAmount] = useState('');
  const [paidTo, setPaidTo] = useState('');
  const [date, setDate] = useState('');
  const [manualResponse, setManualResponse] = useState(null);
  const [manualLoading, setManualLoading] = useState(false);
  const [manualError, setManualError] = useState(null);

  // File upload state
  const [file, setFile] = useState(null);
  const [fileResponse, setFileResponse] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState(null);

  // Manual bill submit handler
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setManualLoading(true);
    setManualError(null);
    setManualResponse(null);
    try {
      const formData = new FormData();
      formData.append('Amount', amount);
      formData.append('Paid to', paidTo);
      formData.append('Date', date);
      const res = await axios.post(MANUAL_BILL_URL, formData);
      setManualResponse(res.data);
      setAmount('');
      setPaidTo('');
      setDate('');
    } catch (err) {
      setManualError('Failed to submit bill. Please check your input and try again.');
    } finally {
      setManualLoading(false);
    }
  };

  // File upload submit handler
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileError(null);
    setFileResponse(null);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setFileError('Please select a file to upload.');
      return;
    }
    setFileLoading(true);
    setFileError(null);
    setFileResponse(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(FILE_UPLOAD_URL, formData);
      setFileResponse(res.data);
      setFile(null);
    } catch (err) {
      setFileError('Failed to upload file. Please try again.');
    } finally {
      setFileLoading(false);
    }
  };

  // Helper to render response array
  const renderResponseTable = (data) => {
    if (!Array.isArray(data) || data.length === 0) return null;
    const keys = Object.keys(data[0]);
    return (
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border rounded-lg">
          <thead>
            <tr>
              {keys.map((key) => (
                <th key={key} className="px-4 py-2 border-b bg-gray-100 text-left text-sm font-semibold text-gray-700">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="bg-white hover:bg-gray-50">
                {keys.map((key) => (
                  <td key={key} className="px-4 py-2 border-b text-sm text-gray-800">{row[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      {/* Manual Bill Entry */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaRupeeSign className="text-teal-500" /> Manual Bill Entry</h3>
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount (₹)"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-base"
              required
              disabled={manualLoading}
            />
            <input
              type="text"
              value={paidTo}
              onChange={(e) => setPaidTo(e.target.value)}
              placeholder="Paid to"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-base"
              required
              disabled={manualLoading}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-base"
              required
              disabled={manualLoading}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={manualLoading}
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200"
          >
            {manualLoading ? 'Submitting...' : 'Submit Bill'}
          </motion.button>
        </form>
        {manualError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4"
          >
            <div className="flex items-center space-x-2">
              <FaExclamationTriangle />
              <span>{manualError}</span>
            </div>
          </motion.div>
        )}
        <AnimatePresence>
          {manualResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 p-4 rounded-lg shadow-lg border border-green-200 mt-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <FaCheckCircle className="text-green-500" />
                <span className="font-semibold text-green-700">Response</span>
              </div>
              {renderResponseTable(manualResponse)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* File Upload */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaFileUpload className="text-purple-500" /> Upload Bill File</h3>
        <form onSubmit={handleFileSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-2 items-stretch">
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-base"
              disabled={fileLoading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={fileLoading || !file}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-3 rounded-lg font-semibold shadow hover:from-purple-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200"
            >
              <FaFileUpload />
              {fileLoading ? 'Uploading...' : 'Upload'}
            </motion.button>
          </div>
        </form>
        {fileError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4"
          >
            <div className="flex items-center space-x-2">
              <FaExclamationTriangle />
              <span>{fileError}</span>
            </div>
          </motion.div>
        )}
        <AnimatePresence>
          {fileResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 p-4 rounded-lg shadow-lg border border-green-200 mt-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <FaCheckCircle className="text-green-500" />
                <span className="font-semibold text-green-700">Response</span>
              </div>
              {renderResponseTable(fileResponse)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MonthlyExpenditure; 