import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileAlt, FaExclamationCircle, FaClock, FaUser } from 'react-icons/fa';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/documents-status';

const DocumentUploadReminderDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch document status');
      const result = await res.json();
      console.log('API result:', result); // Debug: log API response
      setData(result);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-yellow-500 p-3 rounded-lg shadow-lg">
          <FaFileAlt className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-display text-anthropic-dark font-bold">Document Upload Reminder Status</h2>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
        whileTap={{ scale: 0.97 }}
        onClick={fetchStatus}
        disabled={loading}
        className="w-full bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-blue-600 transition-colors disabled:opacity-50"
      >
        {loading ? 'Checking...' : 'Check Document Status'}
      </motion.button>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-100 text-red-700 p-4 rounded-lg flex items-center space-x-2"
          >
            <FaExclamationCircle className="text-xl" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {console.log('Render data:', data)}
        {Array.isArray(data) && data.map((emp, idx) => (
          <motion.div
            key={emp["employee id"] || idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 rounded-2xl p-6 shadow-inner border border-gray-200 space-y-4 mb-6"
          >
            {emp["Name"] && (
              <div className="flex items-center space-x-3">
                <FaUser className="text-green-500 text-xl" />
                <span className="font-semibold text-gray-700">Employee Name:</span>
                <span className="text-gray-900">{emp["Name"]}</span>
              </div>
            )}
            <div className="flex items-center space-x-3">
              <FaUser className="text-blue-500 text-xl" />
              <span className="font-semibold text-gray-700">Employee ID:</span>
              <span className="text-gray-900">{emp["employee id"]}</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaClock className="text-yellow-600 text-xl" />
              <span className="font-semibold text-gray-700">Remaining Days:</span>
              <span className={Number(emp["remaning days"]) < 0 ? 'text-red-600 font-bold' : 'text-gray-900'}>
                {emp["remaning days"]}
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <FaExclamationCircle className="text-red-500 text-xl mt-1" />
              <div>
                <span className="font-semibold text-gray-700">Missing Documents:</span>
                <ul className="list-disc list-inside text-gray-900 mt-1">
                  {emp["missing documents"].split(',').map((doc, idx2) => (
                    <li key={idx2}>{doc.trim()}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default DocumentUploadReminderDetails; 