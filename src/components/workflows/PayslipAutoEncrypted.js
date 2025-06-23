import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileInvoiceDollar, FaLock, FaClock, FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5678/webhook/payslip-upload';

const PayslipAutoEncrypted = ({ compact = false }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ encryptedPayslips: 0, pendingEncryption: 0, totalPayslips: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle file upload and API call
  const handleFileChange = async (e) => {
    setError('');
    setSuccessMsg('');
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('data', file);
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats || {});
        setRecentActivity(data.recentActivity || []);
        setSuccessMsg(data.message || 'Upload successful!');
      } else {
        setError(data.message || 'Upload failed.');
      }
    } catch (err) {
      setError('API error.');
    } finally {
      setLoading(false);
    }
  };

  const statList = [
    { title: 'Encrypted Payslips', value: stats.encryptedPayslips, icon: FaLock, color: 'bg-green-500' },
    { title: 'Pending Encryption', value: stats.pendingEncryption, icon: FaClock, color: 'bg-yellow-500' },
    { title: 'Total Payslips', value: stats.totalPayslips, icon: FaFileInvoiceDollar, color: 'bg-blue-500' },
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
        <div className={compact ? "bg-green-500 p-2 rounded-lg shadow" : "bg-green-500 p-3 rounded-lg shadow-lg"}>
          <FaFileInvoiceDollar className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
        </div>
        <h3 className={compact ? "text-lg font-display text-anthropic-dark font-bold" : "text-2xl font-display text-anthropic-dark font-bold"}>Payslip Auto Encrypted</h3>
      </div>
      {/* File Upload */}
      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:from-green-600 hover:to-blue-600 transition-colors">
          <FaUpload /> Upload Payslip
          <input type="file" className="hidden" onChange={handleFileChange} disabled={loading} />
        </label>
        {loading && <span className="text-blue-600 font-semibold">Uploading...</span>}
        {error && <span className="text-red-500 font-semibold">{error}</span>}
        {successMsg && <span className="text-green-600 font-semibold">{successMsg}</span>}
      </div>
      <div className={compact ? "flex gap-2 w-full overflow-x-auto" : "grid grid-cols-3 gap-4 w-full"}>
        {statList.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>
      {/* Recent Activity */}
      <div>
        <h4 className="text-lg font-bold mb-2">Recent Activity</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Employee Name</th>
                <th className="px-4 py-2 text-left">Payslip Month</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Encryption Date</th>
                <th className="px-4 py-2 text-left">File Size</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-4 text-gray-400">No activity yet.</td></tr>
              ) : (
                recentActivity.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2">{item.employeeName}</td>
                    <td className="px-4 py-2">{item.payslipMonth}</td>
                    <td className="px-4 py-2">{item.status}</td>
                    <td className="px-4 py-2">{item.encryptionDate ? new Date(item.encryptionDate).toLocaleString() : '-'}</td>
                    <td className="px-4 py-2">{item.fileSize}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/workflows/payslip-encryption')}
        className={compact ? "w-full bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-green-600 hover:to-blue-600 transition-colors" : "w-full bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-blue-600 transition-colors"}
      >
        View Details
      </motion.button>
    </div>
  );
};

export default PayslipAutoEncrypted; 