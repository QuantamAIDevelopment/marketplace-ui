import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FraudDetection = ({ compact = false }) => {
  const navigate = useNavigate();
  return (
    <div className={compact ? "space-y-4 w-full overflow-hidden" : "space-y-8 w-full"}>
      <div className={compact ? "flex items-center space-x-2 mb-1" : "flex items-center space-x-4 mb-2"}>
        <div className={compact ? "bg-red-500 p-2 rounded-lg shadow" : "bg-red-500 p-3 rounded-lg shadow-lg"}>
          <FaShieldAlt className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
        </div>
        <h3 className={compact ? "text-lg font-display text-anthropic-dark font-bold" : "text-2xl font-display text-anthropic-dark font-bold"}>Fraud Detection</h3>
      </div>
      <p className={compact ? "text-xs text-gray-600" : "text-sm text-gray-700"}>
        Upload transaction CSVs to detect fraud, risk scores, and AI notes instantly.
      </p>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #ef444433' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/workflows/fraud-detection')}
        className={compact ? "w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-red-600 hover:to-orange-600 transition-colors" : "w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-red-600 hover:to-orange-600 transition-colors"}
      >
        View Details
      </motion.button>
    </div>
  );
};

export default FraudDetection; 