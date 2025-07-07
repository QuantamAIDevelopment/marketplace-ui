import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileUpload, FaEnvelopeOpenText } from 'react-icons/fa';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/d4c5fd15-5d71-4a4c-9b84-14e0949a75c5';

const OnBoardingQ = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an ODS file.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('ods', file);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to generate onboarding email.');
      const text = await response.text();
      setResult(text);
    } catch (err) {
      setError('Failed to generate onboarding email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-500 p-3 rounded-lg shadow">
          <FaEnvelopeOpenText className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-blue-700">Onboarding Email Generator</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium">Upload ODS File</span>
          <div className="flex items-center mt-2">
            <input type="file" accept=".ods" onChange={handleFileChange} className="border p-2 rounded w-full" />
            <FaFileUpload className="ml-2 text-gray-500" />
          </div>
        </label>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Generating...' : 'Generate Onboarding Email'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {result && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-bold mb-2 text-blue-800 flex items-center"><FaEnvelopeOpenText className="mr-2" />Generated Email</h3>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br/>') }} />
        </div>
      )}
    </div>
  );
};

export default OnBoardingQ; 