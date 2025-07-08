import React from 'react';
import { motion } from 'framer-motion';
import { FaCommentDots, FaChartBar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const dummyStats = {
  totalProducts: 4,
  averageSentiment: 58.5,
  recent: [
    {
      productid: 'ZX100',
      praises: ['Easy to use', 'Sleek design'],
      complaints: ['Short lifespan', 'Breaks easily'],
      sentimentBreakdown: { positive: 50, neutral: 0, negative: 50 }
    },
    {
      productid: 'ZX200',
      praises: ['Good connectivity'],
      complaints: ['Weak battery life'],
      sentimentBreakdown: { positive: 50, neutral: 0, negative: 50 }
    },
    {
      productid: 'ZX300',
      praises: ['Easy to use', 'Great price'],
      complaints: ['Not intuitive'],
      sentimentBreakdown: { positive: 66.67, neutral: 0, negative: 33.33 }
    }
  ],
};

const statList = [
  { title: 'Products Analyzed', value: dummyStats.totalProducts, icon: FaCommentDots, color: 'bg-green-500' },
  { title: 'Avg Sentiment', value: `${dummyStats.averageSentiment}%`, icon: FaChartBar, color: 'bg-blue-500' },
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

const ProductFeedbackSummarizer = ({ compact = false }) => {
  const navigate = useNavigate();
  return (
    <div className={compact ? "space-y-4 w-full overflow-hidden" : "space-y-8 w-full"}>
      <div className={compact ? "flex items-center space-x-2 mb-1" : "flex items-center space-x-4 mb-2"}>
        <div className={compact ? "bg-green-500 p-2 rounded-lg shadow" : "bg-green-500 p-3 rounded-lg shadow-lg"}>
          <FaCommentDots className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
        </div>
        <h3 className={compact ? "text-lg font-display text-anthropic-dark font-bold" : "text-2xl font-display text-anthropic-dark font-bold"}>Product Feedback Summarizer</h3>
      </div>
      <div className={compact ? "flex gap-2 w-full overflow-x-auto" : "grid grid-cols-2 gap-4 w-full"}>
        {statList.map((stat, idx) => (
          <StatCard key={idx} {...stat} compact={compact} />
        ))}
      </div>
      <div className={compact ? "flex gap-2 w-full overflow-x-auto" : "grid grid-cols-3 gap-4 w-full"}>
        {dummyStats.recent.map((product, idx) => (
          <motion.div
            key={idx}
            className={compact ? "bg-white border border-gray-200 rounded-xl p-3 shadow flex flex-col gap-2 min-w-[120px]" : "bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl flex flex-col gap-2 min-w-[160px] w-full max-w-xs mx-auto"}
            whileHover={compact ? { scale: 1.03, boxShadow: '0 2px 8px 0 #61868d22' } : { scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <FaCommentDots className={compact ? "w-5 h-5 text-green-500" : "w-6 h-6 text-green-500"} />
              <div className={compact ? "font-bold text-base text-anthropic-dark truncate" : "font-bold text-lg text-anthropic-dark truncate"}>{product.productid}</div>
            </div>
            <div className={compact ? "text-xs text-gray-700" : "text-sm text-gray-700"}>
              <div className="flex items-center gap-1 mb-1">
                <FaThumbsUp className="w-3 h-3 text-green-500" />
                <span className="truncate">{product.praises.length} praises</span>
              </div>
              <div className="flex items-center gap-1">
                <FaThumbsDown className="w-3 h-3 text-red-500" />
                <span className="truncate">{product.complaints.length} complaints</span>
              </div>
            </div>
            <div className={compact ? "text-xs text-gray-600" : "text-sm text-gray-600"}>
              Sentiment: <b>{product.sentimentBreakdown.positive}% positive</b>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/workflows/product-feedback-summarizer')}
        className={compact ? "w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-green-600 hover:to-blue-600 transition-colors" : "w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-blue-600 transition-colors"}
      >
        View Details
      </motion.button>
    </div>
  );
};

export default ProductFeedbackSummarizer; 