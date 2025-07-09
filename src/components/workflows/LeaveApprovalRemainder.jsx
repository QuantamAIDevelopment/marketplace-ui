import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileUpload, FaBell } from 'react-icons/fa';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/c21ff5b7-64e9-465c-aa20-77a5501a67f3';

const LeaveApprovalRemainder = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an XLSX file.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('xlsx', file);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to process leave approval reminder.');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to process leave approval reminder. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-yellow-500 p-3 rounded-lg shadow">
          <FaBell className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-yellow-700">Leave Approval Reminder</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium">Upload XLSX File</span>
          <div className="flex items-center mt-2">
            <input type="file" accept=".xlsx" onChange={handleFileChange} className="border p-2 rounded w-full" />
            <FaFileUpload className="ml-2 text-gray-500" />
          </div>
        </label>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-yellow-700 disabled:bg-yellow-300"
        >
          {loading ? 'Processing...' : 'Process Leave Reminder'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {result && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-yellow-100">
          <h3 className="text-lg font-bold mb-2 text-yellow-800 flex items-center"><FaBell className="mr-2" />Reminder Details</h3>
          <div className="prose max-w-none">
            <p><b>Candidate Name:</b> {result["Candidate Name"]}</p>
            <p><b>Leave ID:</b> {result["Leave ID"]}</p>
            <p><b>Leave Start Date:</b> {result["Leave Start Date"]}</p>
            <p><b>Reminder Sent Date:</b> {result["Reminder Sent Date"]}</p>
            <p><b>Leave Reason:</b> {result["Leave Reason"]}</p>
            <p><b>Status:</b> {result["STAUS"]}</p>
            <p><b>Timestamp:</b> {result["Timstamp"]}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveApprovalRemainder; 