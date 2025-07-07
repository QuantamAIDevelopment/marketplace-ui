import React, { useState } from 'react';
import { FaFilePdf, FaSpinner } from 'react-icons/fa';
import { uploadPdfAndGetSummary } from '../../services/workflows/pdfSummarizer';

const PdfSummarizer = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError(null);
    setSummary(null);
    try {
      const result = await uploadPdfAndGetSummary(file, email);
      setSummary(result[0]?.text || 'No summary found.');
    } catch (err) {
      setError('Failed to summarize PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <div className="flex items-center space-x-3 mb-4">
        <FaFilePdf className="w-8 h-8 text-red-500" />
        <h2 className="text-2xl font-bold">PDF Summarizer</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email to receive the summary"
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
          Summarize PDF
        </button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {summary && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border text-gray-800 whitespace-pre-line">
          {summary}
        </div>
      )}
    </div>
  );
};

export default PdfSummarizer;
