import React, { useState } from 'react';
import { FaUserTie, FaPaperPlane, FaExclamationCircle, FaCopy, FaDownload } from 'react-icons/fa';
import PageRevealWrapper from './PageRevealWrapper';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/fetch-data';

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
        <FaUserTie className="mr-2" /> Fetch Leads Result
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

const FetchLeads = () => {
    
  const [input, setInput] = useState({
    triggeredBy: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setResult('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', input); // Debug log
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      const text = await response.text();
      console.log('Status:', response.status, 'Response:', text); // Debug log
      if (!response.ok) throw new Error(text || 'Failed to fetch leads.');
      setResult(text);
    } catch (err) {
      setError(err.message || 'Failed to fetch leads.');
      console.error('Error:', err); // Debug log
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
    a.download = 'fetch-leads-response.txt';
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  return (
    <PageRevealWrapper
      heading="Fetch Leads Workflow"
      description="Trigger the fetch leads workflow and get a personalized response."
    >
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-500 p-3 rounded-full shadow">
            <FaUserTie className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Fetch Leads</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="font-semibold">Triggered By:</label>
          <input
            type="text"
            name="triggeredBy"
            value={input.triggeredBy}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="e.g. postman-test"
            required
          />
          <label className="font-semibold">Message:</label>
          <textarea
            name="message"
            value={input.message}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Enter your message"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            <FaPaperPlane className="mr-2" /> {loading ? 'Submitting...' : 'Submit'}
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

export default FetchLeads;
