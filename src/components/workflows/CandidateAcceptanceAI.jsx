import React, { useState } from 'react';
import { FaUserCheck, FaPaperPlane, FaExclamationCircle, FaCopy, FaDownload } from 'react-icons/fa';

const API_URL = 'https://bhanubhavani.app.n8n.cloud/webhook/candidate-accepted';

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
        <FaUserCheck className="mr-2" /> Candidate Accepted
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

const CandidateAcceptanceAI = () => {
  const [form, setForm] = useState({
    'Candidate ID': '',
    Name: '',
    Email: '',
    STATUS: 'accepted',
    'UPDATED DATE': ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setResult('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const text = await response.text();
      if (!response.ok) throw new Error(text || 'Failed to process candidate acceptance.');
      setResult(text);
    } catch (err) {
      setError(err.message || 'Failed to process candidate acceptance.');
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
    a.download = 'candidate-acceptance.txt';
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-green-500 p-3 rounded-full shadow">
          <FaUserCheck className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Candidate Acceptance AI</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="font-semibold">Candidate ID:</label>
        <input
          type="text"
          name="Candidate ID"
          value={form['Candidate ID']}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <label className="font-semibold">Name:</label>
        <input
          type="text"
          name="Name"
          value={form.Name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <label className="font-semibold">Email:</label>
        <input
          type="email"
          name="Email"
          value={form.Email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <label className="font-semibold">Status:</label>
        <input
          type="text"
          name="STATUS"
          value={form.STATUS}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <label className="font-semibold">Updated Date:</label>
        <input
          type="date"
          name="UPDATED DATE"
          value={form['UPDATED DATE']}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-300"
        >
          <FaPaperPlane className="mr-2" /> {loading ? 'Submitting...' : 'Submit Acceptance'}
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
  );
};

export default CandidateAcceptanceAI;
