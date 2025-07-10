import React, { useState } from 'react';
import { FaFileCsv, FaPaperPlane, FaExclamationCircle, FaCopy, FaDownload } from 'react-icons/fa';
import PageRevealWrapper from './PageRevealWrapper';

function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <div className="text-red-500 mt-4 flex items-center">
      <FaExclamationCircle className="mr-2" />{error}
    </div>
  );
}

function ResponseResult({ result, showMenu, onContextMenu, onCopy, onDownload }) {
  if (!result) return null;
  return (
    <div
      className="mt-6 p-4 border rounded-lg bg-gray-50 relative cursor-pointer group"
      onContextMenu={onContextMenu}
      tabIndex={0}
    >
      <div className="flex items-center mb-2 text-green-700 font-semibold">
        <FaFileCsv className="mr-2" /> Attendance Anomalies Result
      </div>
      <pre className="whitespace-pre-wrap text-gray-800 text-sm">{result}</pre>
      {showMenu && (
        <div className="absolute right-2 top-2 bg-white border rounded shadow z-10">
          <button onClick={onCopy} className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"><FaCopy className="mr-2" />Copy</button>
          <button onClick={onDownload} className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"><FaDownload className="mr-2" />Download as TXT</button>
        </div>
      )}
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400">Right-click for options</div>
    </div>
  );
}

// Updated endpoint to match your cURL command, URL-encoded
const API_URL ='https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/attandance%20anomiles%20-%20Sheet1%20(1).csv';
const AttendanceAnomalies = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    if (!file) {
      setError('Please upload a CSV file.');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/csv',
          'attendace-path': 'application/json',
        },
        body: file,
      });
      const text = await response.text();
      if (!response.ok) throw new Error(text || 'Failed to process attendance anomalies.');
      setResult(text);
    } catch (err) {
      setError(err.message || 'Failed to process attendance anomalies.');
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
    a.download = 'attendance-anomalies-response.txt';
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  return (
    <PageRevealWrapper
      heading="Attendance Anomalies Detection"
      description="Upload your attendance CSV to detect anomalies and escalate feedback to HR."
    >
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-500 p-3 rounded-full shadow">
            <FaFileCsv className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Attendance Anomalies</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="font-semibold">Upload Attendance CSV:</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            <FaPaperPlane className="mr-2" /> {loading ? 'Submitting...' : 'Submit CSV'}
          </button>
        </form>
        <ErrorMessage error={error} />
        <ResponseResult
          result={result}
          showMenu={showMenu}
          onContextMenu={handleContextMenu}
          onCopy={handleCopy}
          onDownload={handleDownload}
        />
      </div>
    </PageRevealWrapper>
  );
};

export default AttendanceAnomalies;
