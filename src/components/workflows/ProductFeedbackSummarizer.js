import React from 'react';
import { motion } from 'framer-motion';
import { FaCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductFeedbackSummarizer = ({ compact = false }) => {
  const navigate = useNavigate();
  return (
    <div className={compact ? "space-y-4 w-full overflow-hidden" : "space-y-8 w-full"}>
      <div className={compact ? "flex items-center space-x-2 mb-1" : "flex items-center space-x-4 mb-2"}>
        <div className={compact ? "bg-pink-500 p-2 rounded-lg shadow" : "bg-pink-500 p-3 rounded-lg shadow-lg"}>
          <FaCommentDots className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
        </div>
        <h3 className={compact ? "text-lg font-display text-anthropic-dark font-bold" : "text-2xl font-display text-anthropic-dark font-bold"}>Product Feedback Summarizer</h3>
      </div>
      <p className={compact ? "text-xs text-gray-600" : "text-sm text-gray-700"}>
        Summarize customer feedback, extract praises, complaints, keywords, and sentiment for each product.
      </p>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #e7548033' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/workflows/product-feedback-summarizer')}
        className={compact ? "w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-pink-600 hover:to-purple-600 transition-colors" : "w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-pink-600 hover:to-purple-600 transition-colors"}
      >
        View Details
      </motion.button>
    </div>
  );
};

export default ProductFeedbackSummarizer; 