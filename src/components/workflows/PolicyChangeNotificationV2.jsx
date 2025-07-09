import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaFileAlt } from 'react-icons/fa';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/policy-update';

const PolicyChangeNotificationV2 = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      e.target.blur();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const formData = new FormData();
      if (file) formData.append('policy', file);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to fetch policy stats');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-8">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-blue-500 p-3 rounded-lg shadow">
          <FaBell className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Policy Change Notifications</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative">
          <label htmlFor="policy-upload-input-v2">
            <span
              className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-lg shadow hover:bg-purple-200 transition-colors text-base font-semibold text-purple-700 focus:outline-none cursor-pointer"
              tabIndex={0}
            >
              <FaFileAlt className="text-purple-500" />
              {file ? file.name : 'Upload Policy'}
            </span>
          </label>
          <input
            id="policy-upload-input-v2"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
        >
          {loading ? 'Processing...' : 'Get Policy Stats'}
        </motion.button>
      </form>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {data && (
        <div>
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Policy Stats</h3>
            <ul className="space-y-1">
              <li>Total Policies: <b>{data.stats.totalPolicies}</b></li>
              <li>Acknowledged: <b>{data.stats.acknowledgedPolicies}</b></li>
              <li>Pending Acknowledgments: <b>{data.stats.pendingAcknowledgments}</b></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Recent Notifications</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 border">Email</th>
                    <th className="py-2 px-3 border">User Name</th>
                    <th className="py-2 px-3 border">Policy ID</th>
                    <th className="py-2 px-3 border">Pending Ack</th>
                    <th className="py-2 px-3 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentNotifications.map((n, idx) => (
                    <tr key={idx} className="hover:bg-blue-50">
                      <td className="py-2 px-3 border">{n.email}</td>
                      <td className="py-2 px-3 border">{n.userName}</td>
                      <td className="py-2 px-3 border">{n.policyId}</td>
                      <td className="py-2 px-3 border">{n.pendingAck}</td>
                      <td className="py-2 px-3 border">{n.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyChangeNotificationV2;
