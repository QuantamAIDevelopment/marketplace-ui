import React, { useState } from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import SentimentAgentReport from '../components/workflows/SentimentAgentReport';
import { submitSentimentFeedback } from '../services/workflows/sentimentAgent';
import { FaSmile, FaPaperPlane } from 'react-icons/fa';

const SentimentAgentPageContent = () => {
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
      const res = await submitSentimentFeedback(form);
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

const SentimentAgentPage = () => (
  <PageRevealWrapper
    heading="AI Sentiment Agent: Customer Feedback Analyzer"
    description="Instantly analyze customer feedback, extract sentiment, urgency, tags, and get actionable business insights."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>LLM-powered feedback analysis for sentiment, urgency, and topic extraction.</li>
            <li>Structured JSON output for automation and reporting.</li>
            <li>Google Sheets and email integration for workflow automation.</li>
            <li>Handles praise, complaints, suggestions, and critical issues.</li>
            <li>Works with any customer-facing channel (web, app, email, etc.).</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Support teams: Triage and escalate urgent customer issues automatically.</li>
            <li>Product teams: Summarize feature requests and bug reports from feedback.</li>
            <li>Business leaders: Weekly sentiment and topic trend reports.</li>
            <li>CRM: Log praise and complaints for loyalty tracking.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">⚡ Why This Stands Out</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Real-time, multi-channel feedback analysis.</li>
            <li>Actionable insights for every department (Support, Product, Logistics, Billing, etc.).</li>
            <li>Automated urgency detection for critical issues.</li>
            <li>Easy integration with Google Sheets, Slack, and email.</li>
            <li>Beautiful, human-readable summary reports.</li>
          </ul>
        </div>
      </div>
    }
  >
    <SentimentAgentReport />
  </PageRevealWrapper>
);

export default SentimentAgentPage;
