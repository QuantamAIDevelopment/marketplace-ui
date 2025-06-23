import React from 'react';
import { motion } from 'framer-motion';
import { FaBoxOpen, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const dummyStats = {
  totalRecommendations: 128,
  recent: [
    {
      product_name: 'Honorable',
      price: '8.78',
      product_url: 'https://businessinsider.com/sociis/natoque/penatibus/et.png',
    },
    {
      product_name: 'TechGadget',
      price: '26.76',
      product_url: 'https://example.com/product/techgadget',
    },
    {
      product_name: 'SmartWidget',
      price: '19.99',
      product_url: 'https://example.com/product/smartwidget',
    },
  ],
};

const statList = [
  { title: 'Total Recommendations', value: dummyStats.totalRecommendations, icon: FaBoxOpen, color: 'bg-blue-500' },
];

const StatCard = ({ title, value, icon: Icon, color, compact }) => (
  <motion.div
    className={compact ? "bg-white border border-gray-200 rounded-xl p-3 shadow flex flex-col gap-2 min-w-[120px]" : "bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl flex flex-col gap-2 min-w-[160px] w-full max-w-xs mx-auto"}
    whileHover={compact ? { scale: 1.03, boxShadow: '0 2px 8px 0 #61868d22' } : { scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className={compact ? `p-2 rounded-lg ${color}` : `p-3 rounded-lg ${color}`}>
        <Icon className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
      </div>
      <div className={compact ? "font-bold text-base text-anthropic-dark truncate" : "font-bold text-lg text-anthropic-dark truncate"}>{title}</div>
    </div>
    <div className={compact ? "text-lg font-bold text-anthropic-dark" : "text-2xl font-bold text-anthropic-dark"}>{value}</div>
  </motion.div>
);

const ProductRecommendation = ({ compact = false }) => {
  const navigate = useNavigate();
  return (
    <div className={compact ? "space-y-4 w-full overflow-hidden" : "space-y-8 w-full"}>
      <div className={compact ? "flex items-center space-x-2 mb-1" : "flex items-center space-x-4 mb-2"}>
        <div className={compact ? "bg-blue-500 p-2 rounded-lg shadow" : "bg-blue-500 p-3 rounded-lg shadow-lg"}>
          <FaShoppingCart className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
        </div>
        <h3 className={compact ? "text-lg font-display text-anthropic-dark font-bold" : "text-2xl font-display text-anthropic-dark font-bold"}>Product Recommendation Agent</h3>
      </div>
      <div className={compact ? "flex gap-2 w-full overflow-x-auto" : "grid grid-cols-2 gap-4 w-full"}>
        {statList.map((stat, idx) => (
          <StatCard key={idx} {...stat} compact={compact} />
        ))}
      </div>
      <div className={compact ? "flex gap-2 w-full overflow-x-auto" : "grid grid-cols-3 gap-4 w-full"}>
        {dummyStats.recent.map((rec, idx) => (
          <motion.div
            key={idx}
            className={compact ? "bg-white border border-gray-200 rounded-xl p-3 shadow flex flex-col gap-2 min-w-[120px]" : "bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl flex flex-col gap-2 min-w-[160px] w-full max-w-xs mx-auto"}
            whileHover={compact ? { scale: 1.03, boxShadow: '0 2px 8px 0 #61868d22' } : { scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <FaBoxOpen className={compact ? "w-5 h-5 text-blue-500" : "w-6 h-6 text-blue-500"} />
              <div className={compact ? "font-bold text-base text-anthropic-dark truncate" : "font-bold text-lg text-anthropic-dark truncate"}>{rec.product_name}</div>
            </div>
            <div className={compact ? "text-xs text-gray-700 truncate" : "text-sm text-gray-700 truncate"}>Price: <b>₹{rec.price}</b></div>
            <a href={rec.product_url} target="_blank" rel="noopener noreferrer" className={compact ? "bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs hover:underline mt-2" : "bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs hover:underline mt-2"}>View Product</a>
          </motion.div>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/workflows/product-recommendation')}
        className={compact ? "w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-blue-600 hover:to-purple-600 transition-colors" : "w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors"}
      >
        View Details
      </motion.button>
    </div>
  );
};

export default ProductRecommendation; 