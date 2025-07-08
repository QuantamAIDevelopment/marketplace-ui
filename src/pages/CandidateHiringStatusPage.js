import React, { useEffect, useState } from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaSync, FaExclamationTriangle } from 'react-icons/fa';

const API_URL = 'http://localhost:5678/webhook/details-sync';

const CandidateStatusSyncDashboard = () => {
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
        <h3 className="text-2xl font-display text-anthropic-dark font-bold">Candidate Status Sync Dashboard</h3>
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

const CandidateHiringStatusPage = () => {
  return (
    <PageRevealWrapper
      heading="ATS-to-HRMS Candidate Status Sync"
      description="Seamlessly sync candidate statuses between your Applicant Tracking System (ATS) and HR Management System (HRMS)—automatically and reliably. This AI-powered Candidate Status Sync Agent listens for updates from your ATS (via webhook), interprets the candidate's latest status, intelligently maps it to the corresponding HRMS terminology, and updates both your internal Postgres database and HR spreadsheets. Whether it's a 'Rejected,' 'Offer Accepted,' or 'Interview Scheduled,' this agent ensures your HRMS reflects the real-time hiring pipeline—no manual updates required. Perfect for growing teams and HR departments juggling multiple tools, this workflow reduces errors, closes data gaps, and ensures both systems are always aligned. With auto-mapping logic, status validation, and smart data routing, this plug-and-play agent removes manual bottlenecks from your hiring sync processes."
      details={
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>ATS-HRMS Integration: Sync updates from ATS to HR tools like spreadsheets and internal HR databases.</li>
              <li>Centralized Hiring Dashboards: Keep your HR dashboards and reports always up-to-date with real-time candidate status.</li>
              <li>Candidate Lifecycle Visibility: Ensure recruiters, HR, and hiring managers are always aligned on candidate progress.</li>
              <li>Error-Free Updates: Avoid mismatched status labels with automatic mapping logic between systems.</li>
              <li>Audit-Friendly Recordkeeping: Maintain clean logs of all status updates in Sheets and Postgres for compliance or internal review.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-purple-700 mb-2">Why This Stands Out</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Webhook-Triggered Sync: Captures real-time candidate data the moment ATS updates occur.</li>
              <li>Smart Status Mapping: Automatically translates ATS statuses into HRMS-friendly terms.</li>
              <li>🗃 Dual-System Updates: Writes to both Postgres (internal DB) and Google Sheets (HR view).</li>
              <li>Deduplication Logic: Prevents redundant or conflicting entries.</li>
              <li>Conditional Filtering: Only syncs valid and updated records to save compute.</li>
              <li>Spreadsheet-Ready: Structures data for easy human review or HR reporting tools.</li>
            </ul>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Automate your candidate tracking today—start syncing ATS updates to HR in real time, with zero manual overhead.</span>
          </div>
        </div>
      }
    >
      <CandidateStatusSyncDashboard />
    </PageRevealWrapper>
  );
};

export default CandidateHiringStatusPage; 