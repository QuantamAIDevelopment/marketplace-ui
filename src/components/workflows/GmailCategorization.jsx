import React, { useState } from 'react';
import { FaEnvelopeOpenText, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/incoming-email';

const GmailCategorization = () => {
  const [form, setForm] = useState({ category: '', description: '' });
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
      const formData = new FormData();
      formData.append('category', form.category);
      formData.append('description', form.description);
      const response = await axios.post(API_URL, formData);
      setResult(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (err) {
      setError('Failed to categorize email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 flex items-center justify-center gap-2">
        <FaEnvelopeOpenText className="text-blue-400" /> Gmail Categorization
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300">
          <FaPaperPlane /> {loading ? 'Categorizing...' : 'Categorize Email'}
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

export default GmailCategorization;
