import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/contract';

const ContractRedFlagDetector = ({ compact = false }) => {
  const [docId, setDocId] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [docEnds, setDocEnds] = useState('doc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!docId || !email || !file || !docEnds) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('doc id', docId);
      formData.append('mail', email);
      formData.append('document', file);
      formData.append('document ends', docEnds);
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // The response is plain text, parse it into fields
      const lines = response.data.split('\n');
      const parsed = {};
      lines.forEach(line => {
        const [key, ...rest] = line.split(':');
        if (key && rest.length) {
          parsed[key.trim()] = rest.join(':').trim();
        }
      });
      setResult(parsed);
    } catch (err) {
      setError('Failed to execute workflow. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={compact ? 'space-y-4 w-full overflow-hidden' : 'space-y-8 w-full'}>
      <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
        <div className={compact ? 'bg-red-500 p-2 rounded-lg shadow' : 'bg-red-500 p-3 rounded-lg shadow-lg'}>
          <FaExclamationTriangle className={compact ? 'w-5 h-5 text-white' : 'w-6 h-6 text-white'} />
        </div>
        <h3 className={compact ? 'text-lg font-display text-anthropic-dark font-bold' : 'text-2xl font-display text-anthropic-dark font-bold'}>
          Contract Red Flag Detector
        </h3>
      </div>
      <p className={compact ? 'text-xs text-gray-600' : 'text-sm text-gray-700'}>
        Upload a contract to detect red flags, assess risk, and get suggestions to fix issues.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={docId}
          onChange={e => setDocId(e.target.value)}
          placeholder="Document Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept=".doc,.docx,.pdf"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={docEnds}
          onChange={e => setDocEnds(e.target.value)}
          placeholder="Document Ends With (e.g., doc, pdf)"
          className="w-full p-2 border rounded"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white p-2 rounded hover:from-red-600 hover:to-yellow-600 disabled:bg-red-300"
        >
          {loading ? 'Analyzing...' : 'Analyze Contract'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {result && (
        (() => {
          // Calculate number of red flags if not present
          let numRedFlags = result['Number of redflags'];
          if (!numRedFlags && result['Suggestion to fix']) {
            numRedFlags = result['Suggestion to fix'].split(',').filter(s => s.trim()).length;
          }
          // Calculate overall risk score (simple logic: >3 = High, 2-3 = Medium, 1 = Low, 0 = None)
          let riskScore = result['Overall risk'];
          if (!riskScore && numRedFlags) {
            const n = parseInt(numRedFlags, 10);
            if (!isNaN(n)) {
              if (n > 3) riskScore = 'High';
              else if (n >= 2) riskScore = 'Medium';
              else if (n === 1) riskScore = 'Low';
              else riskScore = 'None';
            } else {
              riskScore = 'N/A';
            }
          }
          return (
            <div className="mt-6 bg-white rounded-lg shadow p-4 border space-y-2">
              <div><b>Upload time:</b> {result['Upload time'] ? new Date(result['Upload time']).toLocaleString() : 'N/A'}</div>
              <div><b>User:</b> {result['User'] || 'N/A'}</div>
              <div><b>Document Name:</b> {result['Document Name'] || 'N/A'}</div>
              <div><b>Number of redflags:</b> {numRedFlags || 'N/A'}</div>
              <div><b>Overall risk:</b> {riskScore || 'N/A'}</div>
              <div><b>Suggestion to fix:</b> {result['Suggestion to fix'] ? (
                <ul className="list-disc ml-6">
                  {result['Suggestion to fix'].split(',').map((s, i) => <li key={i}>{s.trim()}</li>)}
                </ul>
              ) : 'N/A'}</div>
            </div>
          );
        })()
      )}
    </div>
  );
};

export default ContractRedFlagDetector; 