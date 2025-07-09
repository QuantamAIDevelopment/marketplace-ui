import React, { useState } from 'react';
import { FaShieldAlt, FaFileUpload, FaExclamationTriangle } from 'react-icons/fa';
import { uploadFraudDataAndGetResults } from '../../services/workflows/fraudDetectionSystem';

const RISK_COLORS = {
  High: 'bg-red-100 text-red-700 border-red-400',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-400',
  Low: 'bg-green-100 text-green-700 border-green-400',
};

const FraudDetectionSystem = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResults([]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const data = await uploadFraudDataAndGetResults(file);
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to process file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-purple-500 p-3 rounded-full shadow">
          <FaShieldAlt className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Fraud Detection System</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="font-semibold">Upload Transaction Data (CSV/Excel/JSON):</label>
        <input
          type="file"
          accept=".csv,.xlsx,.xls,.json"
          onChange={handleFileChange}
          className="border p-2 rounded"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !file}
          className="flex items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:bg-purple-300"
        >
          <FaFileUpload className="mr-2" /> {loading ? 'Processing...' : 'Upload & Analyze'}
        </button>
      </form>
      {error && (
        <div className="text-red-500 mt-4 flex items-center">
          <FaExclamationTriangle className="mr-2" />{error}
        </div>
      )}
      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-bold mb-2">Fraud Analysis Results</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">Order ID</th>
                  <th className="border px-2 py-1">User ID</th>
                  <th className="border px-2 py-1">Email</th>
                  <th className="border px-2 py-1">IP</th>
                  <th className="border px-2 py-1">Order Value</th>
                  <th className="border px-2 py-1">Risk Level</th>
                  <th className="border px-2 py-1">AI Risk Score</th>
                  <th className="border px-2 py-1">Triggered Rules</th>
                  <th className="border px-2 py-1">AI Notes</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{row['ORDER ID']}</td>
                    <td className="border px-2 py-1">{row['USER ID']}</td>
                    <td className="border px-2 py-1">{row.email || row['EMAIL']}</td>
                    <td className="border px-2 py-1">{row.ip || row['IP']}</td>
                    <td className="border px-2 py-1">₹{row['ORDER value']}</td>
                    <td className={`border px-2 py-1 font-bold ${RISK_COLORS[row.finalRiskLevel] || ''}`}>{row.finalRiskLevel}</td>
                    <td className="border px-2 py-1">{row.aiRiskScore}</td>
                    <td className="border px-2 py-1">
                      {Array.isArray(row.triggeredRules) && row.triggeredRules.length > 0
                        ? row.triggeredRules.map((rule, i) => <div key={i} className="text-xs">{rule}</div>)
                        : 'None'}
                    </td>
                    <td className="border px-2 py-1 text-xs">{row.aiNotes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FraudDetectionSystem; 