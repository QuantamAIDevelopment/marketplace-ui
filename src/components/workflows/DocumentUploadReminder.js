import React from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DocumentUploadReminder = ({ compact = false }) => {
  const navigate = useNavigate();
  const [stats] = React.useState({
    pendingUploads: 5,
    completedUploads: 15,
  });

  const statList = [
    { title: 'Pending Uploads', value: stats.pendingUploads, icon: FaClock, color: 'bg-yellow-500' },
    { title: 'Completed Uploads', value: stats.completedUploads, icon: FaCheckCircle, color: 'bg-green-500' },
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
        <div className={compact ? "bg-yellow-500 p-2 rounded-lg shadow" : "bg-yellow-500 p-3 rounded-lg shadow-lg"}>
          <FaFileAlt className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
        </div>
        <h3 className={compact ? "text-lg font-display text-anthropic-dark font-bold" : "text-2xl font-display text-anthropic-dark font-bold"}>Document Upload Reminder</h3>
      </div>
      <div className={compact ? "flex gap-2 w-full overflow-x-auto" : "grid grid-cols-2 gap-4 w-full"}>
        {statList.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/workflows/document-upload')}
        className={compact ? "w-full bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-yellow-600 hover:to-blue-600 transition-colors" : "w-full bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-blue-600 transition-colors"}
      >
        View Details
      </motion.button>
    </div>
  );
};

export default DocumentUploadReminder; 