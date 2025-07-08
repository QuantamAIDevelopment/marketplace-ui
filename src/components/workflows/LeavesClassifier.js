import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUserAlt, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LeavesClassifier = ({ compact = false }) => {
  const navigate = useNavigate();
  const [stats] = React.useState({
    casualLeaves: 12,
    sickLeaves: 5,
    totalEmployees: 50,
    activeRequests: 3,
  });

  const statList = [
    { title: 'Casual Leaves', value: stats.casualLeaves, icon: FaCalendarAlt, color: 'bg-blue-500' },
    { title: 'Sick Leaves', value: stats.sickLeaves, icon: FaUserAlt, color: 'bg-red-500' },
    { title: 'Total Employees', value: stats.totalEmployees, icon: FaUserAlt, color: 'bg-green-500' },
    { title: 'Active Requests', value: stats.activeRequests, icon: FaClock, color: 'bg-yellow-500' },
  ];

  const StatCard = ({ title, value, icon: Icon, color }) => (
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

  return (
    <div className={compact ? "space-y-4 w-full overflow-hidden" : "space-y-8 w-full"}>
      <div className={compact ? "flex items-center space-x-2 mb-1" : "flex items-center space-x-4 mb-2"}>
        <div className={compact ? "bg-blue-500 p-2 rounded-lg shadow" : "bg-blue-500 p-3 rounded-lg shadow-lg"}>
          <FaCalendarAlt className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
        </div>
        <h3 className={compact ? "text-lg font-display text-anthropic-dark font-bold" : "text-2xl font-display text-anthropic-dark font-bold"}>Leaves Classifier</h3>
      </div>
      <div className={compact ? "flex gap-2 w-full overflow-x-auto" : "grid grid-cols-2 gap-4 w-full"}>
        {statList.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/leaves-classifier')}
        className={compact ? "w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-blue-600 hover:to-purple-600 transition-colors" : "w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors"}
      >
        View Details
      </motion.button>
    </div>
  );
};

export default LeavesClassifier; 