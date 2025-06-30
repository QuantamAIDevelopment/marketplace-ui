import React, { useState } from 'react';
import { FaSmile, FaPaperPlane } from 'react-icons/fa';
import { submitSentimentFeedback } from '../../services/workflows/sentimentAgent';

const SentimentAgentReport = () => {
  const [form, setForm] = useState({ name: '', mail: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult('');
    try {
      // Use the correct endpoint as per your latest cURL
      const res = await submitSentimentFeedback({ ...form, endpoint: '/webhook/siri' });
      setResult(res);
    } catch (err) {
      setError('Failed to analyze feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 flex items-center justify-center gap-2">
        <FaSmile className="text-blue-400" /> Sentiment Agent
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className="w-full p-2 border rounded" required />
        <input name="mail" value={form.mail} onChange={handleChange} placeholder="Your Email" className="w-full p-2 border rounded" required type="email" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Enter customer feedback message..." className="w-full p-2 border rounded min-h-[80px]" required />
        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300">
          <FaPaperPlane /> {loading ? 'Analyzing...' : 'Analyze Feedback'}
        </button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {result && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded whitespace-pre-line text-gray-800">
          {result}
        </div>
      )}
    </div>
  );
};

export default SentimentAgentReport;
