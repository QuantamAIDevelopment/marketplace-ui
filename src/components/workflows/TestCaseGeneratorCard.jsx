import React from 'react';
import { motion } from 'framer-motion';
import { FaVial } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TestCaseGeneratorCard = ({ compact = false }) => {
  const navigate = useNavigate();

  return (
    <div className={compact ? "space-y-4 w-full overflow-hidden" : "space-y-8 w-full"}>
      <div className={compact ? "flex items-center space-x-2 mb-1" : "flex items-center space-x-4 mb-2"}>
        <div className={compact ? "bg-blue-500 p-2 rounded-lg shadow" : "bg-blue-500 p-3 rounded-lg shadow-lg"}>
          <FaVial className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
        </div>
        <h3 className={compact ? "text-lg font-display text-anthropic-dark font-bold" : "text-2xl font-display text-anthropic-dark font-bold"}>
          Test Case Generator
        </h3>
      </div>
      <p className={compact ? "text-xs text-gray-600" : "text-sm text-gray-700"}>
        Generate QA test cases from your feature docs using Evenmind AI.
      </p>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/test-case-generator')}
        className={compact ? "w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-blue-600 hover:to-green-600 transition-colors" : "w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-green-600 transition-colors"}
      >
        View Details
      </motion.button>
    </div>
  );
};

export default TestCaseGeneratorCard; 