import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ComplaintHandlerAgent from '../components/workflows/ComplaintHandlerAgent';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/issue';

const ComplaintHandlerAgentPage = () => {
  const [form, setForm] = useState({ Name: '', Email: '', Complaint: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('Name', form.Name);
      formData.append('Email & Phone', form.Email);
      formData.append('Complaint', form.Complaint);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to submit complaint');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageRevealWrapper
      heading="Complaint Handler Agent"
      description="Submit and track customer complaints. Automatically classify, route, and receive status updates via email."
      details={
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-red-700 mb-2">Features</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Submit complaints with name, email, and details</li>
              <li>Automatic classification and routing to the right team</li>
              <li>Status updates and confirmation via email</li>
              <li>Track complaint resolution progress</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Customers: Submit product or service complaints</li>
              <li>Support teams: Manage and resolve issues efficiently</li>
              <li>Managers: Monitor complaint trends and resolution times</li>
            </ul>
          </div>
        </div>
      }
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto mt-8">
        <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-center mb-6 text-gray-800">
          Complaint Handler Agent
        </motion.h1>
        <ComplaintHandlerAgent compact />
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input name="Name" value={form.Name} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email & Phone</label>
            <input name="Email" value={form.Email} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Complaint</label>
            <textarea name="Complaint" value={form.Complaint} onChange={handleChange} required className="w-full p-2 border rounded" rows={4} />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 disabled:bg-red-300 font-bold"
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </motion.button>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {result && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="text-lg font-bold text-green-700 mb-2">Complaint Submitted Successfully!</h2>
            <div className="text-gray-700 mb-1"><b>To:</b> {result.To}</div>
            <div className="text-gray-700 mb-1"><b>Subject:</b> {result.Subject}</div>
            <div className="text-gray-700 mb-1"><b>From:</b> {result.From}</div>
            <div className="text-gray-700 mb-2"><b>Message Preview:</b> {result.snippet}</div>
            <div className="text-xs text-gray-500">A confirmation email has been sent to your address.</div>
          </div>
        )}
      </div>
    </PageRevealWrapper>
  );
};

export default ComplaintHandlerAgentPage; 