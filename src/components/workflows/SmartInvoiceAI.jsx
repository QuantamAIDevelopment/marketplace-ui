import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileInvoice, FaCheckCircle, FaExclamationTriangle, FaEllipsisV } from 'react-icons/fa';
import { uploadInvoiceAndGetSummary } from '../../services/workflows/smartInvoiceAI';

const SmartInvoiceAI = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setResponse('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF invoice to upload.');
      return;
    }
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const result = await uploadInvoiceAndGetSummary(file);
      setResponse(typeof result === 'string' ? result : JSON.stringify(result, null, 2));
    } catch (err) {
      setError(err.message || 'Failed to process invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
    document.addEventListener('click', () => setShowMenu(false), { once: true });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col items-center"
      >
        <div className="text-center mt-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
            SmartInvoice AI: Automated Invoice Validation & Categorization
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
            Upload invoices (PDF) to automatically extract, validate, categorize, and check status. Get instant feedback, error detection, and Google Sheets integration.
          </p>
        </div>
        <div className="bg-white rounded-full shadow-lg px-6 py-2 flex items-center mb-8">
          <FaFileInvoice className="text-purple-600 w-8 h-8 mr-2" />
          <span className="font-semibold text-lg">AI Assistant</span>
        </div>
        <form
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg flex flex-col gap-6"
          onSubmit={handleSubmit}
          onContextMenu={handleContextMenu}
        >
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg">Upload Invoice (PDF)</span>
            <button type="button" className="ml-auto" onClick={handleContextMenu}>
              <FaEllipsisV className="text-gray-400 hover:text-gray-700 w-5 h-5" />
            </button>
            {showMenu && (
              <div className="absolute right-10 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => alert('Help: Upload a PDF invoice to validate.')}>Help</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => alert('Contact support at support@example.com')}>Contact Support</button>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="border rounded p-2"
          />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-60"
          >
            {loading ? 'Processing...' : 'Validate Invoice'}
          </motion.button>
          {error && (
            <div className="flex items-center text-red-600 gap-2"><FaExclamationTriangle /> {error}</div>
          )}
          {response && (
            <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded border mt-2">
              <div className="flex items-center gap-2 text-green-700 font-semibold"><FaCheckCircle /> Response</div>
              <pre className="whitespace-pre-wrap text-sm text-gray-800">{response}</pre>
            </div>
          )}
        </form>
        <div className="mt-12 w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Features</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 text-base">
            <li>AI-powered invoice parsing, validation, and categorization.</li>
            <li>Instant feedback on invoice status and errors.</li>
            <li>Google Sheets integration for record-keeping and analytics.</li>
            <li>Supports PDF uploads for seamless workflow.</li>
            <li>Automated GST, total, and line item checks.</li>
            <li>Email notifications for flagged or validated invoices.</li>
            <li>Secure and private processing—no data stored beyond workflow.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default SmartInvoiceAI;
