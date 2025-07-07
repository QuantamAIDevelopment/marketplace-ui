import React, { useState, useRef } from 'react';
import { FaFileUpload, FaCheckCircle, FaExclamationCircle, FaCopy, FaDownload } from 'react-icons/fa';

const API_URL = 'https://bhanubhavani.app.n8n.cloud/webhook/invoice%20summary';

function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <div className="text-red-500 mt-4 flex items-center">
      <FaExclamationCircle className="mr-2" />{error}
    </div>
  );
}

function InvoiceResult({ result, showMenu, onContextMenu, onCopy, onDownload, menuRef }) {
  if (!result) return null;
  return (
    <div
      className="mt-6 p-4 border rounded-lg bg-gray-50 relative cursor-pointer group"
      onContextMenu={onContextMenu}
      tabIndex={0}
    >
      <div className="flex items-center mb-2 text-green-700 font-semibold">
        <FaCheckCircle className="mr-2" /> Invoice Processed Successfully
      </div>
      <pre className="whitespace-pre-wrap text-gray-800 text-sm">{result}</pre>
      {showMenu && (
        <div ref={menuRef} className="absolute right-2 top-2 bg-white border rounded shadow z-10">
          <button onClick={onCopy} className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"><FaCopy className="mr-2" />Copy</button>
          <button onClick={onDownload} className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"><FaDownload className="mr-2" />Download as TXT</button>
        </div>
      )}
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400">Right-click for options</div>
    </div>
  );
}

function FileUploadForm({ loading, file, onFileChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-4">
      <label className="font-semibold">Upload Invoice (PDF/Image/Doc):</label>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={onFileChange}
        className="border p-2 rounded"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !file}
        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        <FaFileUpload className="mr-2" /> {loading ? 'Processing...' : 'Upload & Analyze'}
      </button>
    </form>
  );
}

const SmartInvoiceAI = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an invoice file to upload.');
      return;
    }
    setLoading(true);
    setError('');
    setResult('');
    try {
      const formData = new FormData();
      formData.append('invoice', file);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      const text = await response.text();
      if (!response.ok) throw new Error(text || 'Failed to process invoice.');
      setResult(text);
    } catch (err) {
      setError(err.message || 'Failed to process invoice.');
    } finally {
      setLoading(false);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
    const clickHandler = () => setShowMenu(false);
    document.addEventListener('click', clickHandler, { once: true });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setShowMenu(false);
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-500 p-3 rounded-full shadow">
          <FaFileUpload className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold">SmartInvoice AI</h2>
      </div>
      <FileUploadForm loading={loading} file={file} onFileChange={handleFileChange} onSubmit={handleSubmit} />
      <ErrorMessage error={error} />
      <InvoiceResult
        result={result}
        showMenu={showMenu}
        onContextMenu={handleContextMenu}
        onCopy={handleCopy}
        onDownload={handleDownload}
        menuRef={menuRef}
      />
    </div>
  );
};

export default SmartInvoiceAI;
