import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MCQGenerator = ({ compact = false }) => {
  const navigate = useNavigate();

  return (
    <div className={compact ? "space-y-4 w-full overflow-hidden" : "space-y-8 w-full"}>
      <div className={compact ? "flex items-center space-x-2 mb-1" : "flex items-center space-x-4 mb-2"}>
        <div className={compact ? "bg-green-500 p-2 rounded-lg shadow" : "bg-green-500 p-3 rounded-lg shadow-lg"}>
          <FaBrain className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
        </div>
        <h3 className={compact ? "text-lg font-display text-anthropic-dark font-bold" : "text-2xl font-display text-anthropic-dark font-bold"}>MCQ Generator & Trainer</h3>
      </div>
      <p className={compact ? "text-xs text-gray-600" : "text-sm text-gray-700"}>
        Generate MCQs from topics or files, and test your knowledge with the revision trainer.
      </p>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/mcq-generator')}
        className={compact ? "w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-green-600 hover:to-blue-600 transition-colors" : "w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-blue-600 transition-colors"}
      >
        View Details
      </motion.button>
    </div>
  );
};

export default MCQGenerator; 