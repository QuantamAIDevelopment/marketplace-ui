import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaSync, FaExclamationTriangle } from 'react-icons/fa';

const API_URL = 'http://localhost:5678/webhook/details-sync';

const CandidateHiringStatus = () => {
  const [stats, setStats] = useState({ successCount: 0, pendingCount: 0, failedCount: 0 });
  const [syncStatus, setSyncStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSyncData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStats(data.stats || {});
      setSyncStatus(data.syncStatus || []);
    } catch (err) {
      setError('Failed to fetch sync data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSyncData();
  }, []);

  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center space-x-4 mb-2">
        <h3 className="text-2xl font-display text-anthropic-dark font-bold">Candidate Hiring Status</h3>
        <button
          onClick={fetchSyncData}
          disabled={loading}
          className="ml-4 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Syncing...' : 'Sync Now'}
        </button>
        {error && <span className="text-red-500 font-semibold ml-4">{error}</span>}
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Successfully Synced" value={stats.successCount} icon={FaCheckCircle} color="bg-green-500" />
        <StatCard title="Pending Sync" value={stats.pendingCount} icon={FaSync} color="bg-yellow-500" />
        <StatCard title="Failed Sync" value={stats.failedCount} icon={FaExclamationTriangle} color="bg-red-500" />
      </div>
      {/* Sync Status Table */}
      <div>
        <h4 className="text-lg font-bold mb-2">Sync Status</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Profile ID</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {syncStatus.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-4 text-gray-400">No sync activity yet.</td></tr>
              ) : (
                syncStatus.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2">{item.profileId}</td>
                    <td className="px-4 py-2">{item.message}</td>
                    <td className="px-4 py-2">{item.status}</td>
                    <td className="px-4 py-2">{item.type}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl flex flex-col gap-2 min-w-[160px] w-full max-w-xs mx-auto`}
    whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="font-bold text-lg text-anthropic-dark truncate">{title}</div>
    </div>
    <div className="text-2xl font-bold text-anthropic-dark">{value}</div>
  </motion.div>
);

export default CandidateHiringStatus; 