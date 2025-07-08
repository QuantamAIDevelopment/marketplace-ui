import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileContract } from 'react-icons/fa';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/contract';

const ContractRedFlagDectector = ({ compact = false }) => {
  const [docId, setDocId] = useState('');
  const [mail, setMail] = useState('');
  const [documentEnds, setDocumentEnds] = useState('doc');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('doc id', docId);
      formData.append('mail', mail);
      formData.append('document ends', documentEnds);
      if (file) {
        formData.append('document', file);
      }
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to execute workflow.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={compact ? 'space-y-4 w-full overflow-hidden' : 'space-y-8 w-full'}>
      <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
        <div className={compact ? 'bg-purple-500 p-2 rounded-lg shadow' : 'bg-purple-500 p-3 rounded-lg shadow-lg'}>
          <FaFileContract className={compact ? 'w-5 h-5 text-white' : 'w-6 h-6 text-white'} />
        </div>
        <h3 className={compact ? 'text-lg font-display text-anthropic-dark font-bold' : 'text-2xl font-display text-anthropic-dark font-bold'}>
          Contract Red Flag Detector
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={mail}
            onChange={e => setMail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={docId}
            onChange={e => setDocId(e.target.value)}
            placeholder="Document Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={documentEnds}
            onChange={e => setDocumentEnds(e.target.value)}
            placeholder="Document Ends (e.g. doc)"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #a78bfa33' }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-purple-600 hover:to-indigo-600 transition-colors"
        >
          {loading ? 'Running...' : 'Run Detector'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {result && Array.isArray(result) && result.length > 0 && (
        <motion.div
          className="bg-white p-4 rounded-lg shadow border mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="text-lg font-bold mb-2">Contract Analysis Result</h4>
          <ul className="mb-2">
            <li><b>Document ID:</b> {result[0]['Document id']}</li>
            <li><b>Upload Time:</b> {result[0]['Upload time']}</li>
            <li><b>User:</b> {result[0]['User']}</li>
            <li><b>Number of Red Flags:</b> {result[0]['Number of red flags']}</li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default ContractRedFlagDectector; 