import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaPaperPlane } from 'react-icons/fa';

const PDF_SUMMARIZER_API = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/document_upload';

const PdfSummarizerAgent = ({ compact = false }) => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSummary(null);
    setError(null);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setLoading(true);
    setError(null);
    setSummary(null);
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('email', email);
      const response = await fetch(PDF_SUMMARIZER_API, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to summarize PDF.');
      const data = await response.json();
      setSummary(data[0]?.text || 'No summary found.');
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={compact ? 'space-y-4 w-full overflow-hidden' : 'space-y-8 w-full'}>
      <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
        <div className={compact ? 'bg-blue-500 p-2 rounded-lg shadow' : 'bg-blue-500 p-3 rounded-lg shadow-lg'}>
          <FaFilePdf className={compact ? 'w-5 h-5 text-white' : 'w-6 h-6 text-white'} />
        </div>
        <h3 className={compact ? 'text-lg font-display text-anthropic-dark font-bold' : 'text-2xl font-display text-anthropic-dark font-bold'}>
          PDF Summarizer Agent
        </h3>
      </div>
      <p className={compact ? 'text-xs text-gray-600' : 'text-sm text-gray-700'}>
        Upload a PDF to get an executive summary, key points, entities, and topics extracted by Evenmind AI.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-60"
        >
          {loading ? 'Summarizing...' : <><FaPaperPlane className="inline mr-2" />Summarize PDF</>}
        </motion.button>
      </form>
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      {summary && (
        <div className="bg-white border rounded-lg p-4 mt-4 shadow text-gray-800 whitespace-pre-line prose max-w-none">
          {summary}
        </div>
      )}
    </div>
  );
};

export default PdfSummarizerAgent;
