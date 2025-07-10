import React, { useState } from 'react';
import { uploadOnBoardingODS } from '../../services/workflows/onBoardingQ';
import { motion } from 'framer-motion';
import { FaFileUpload, FaPaperPlane } from 'react-icons/fa';

const OnBoardingQ = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an ODS file to upload.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await uploadOnBoardingODS(file);
      setResult(response);
    } catch (err) {
      setError('Failed to process onboarding file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
      <motion.h3 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-lg font-semibold text-gray-800 mb-2">
        OnBoarding Q Email Generator
      </motion.h3>
      <p className="mb-4 text-gray-600">Upload a client onboarding ODS file to generate a personalized onboarding email and checklist for your client.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="file"
          accept=".ods"
          onChange={handleFileChange}
          className="p-2 border rounded"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:from-green-700 hover:to-blue-600 disabled:bg-green-300"
        >
          <FaFileUpload /> {loading ? 'Generating...' : 'Generate Onboarding Email'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mb-4 font-semibold">{error}</div>}
      {result && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Generated Onboarding Email</h3>
          <div className="bg-gray-50 border rounded-lg p-4 whitespace-pre-line text-gray-900 mb-4">
            {result.emailBody || result}
          </div>
          {result.checklist && (
            <div className="bg-blue-50 border rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-blue-700">Checklist</h4>
              <ul className="list-disc list-inside text-gray-700">
                {Array.isArray(result.checklist)
                  ? result.checklist.map((item, idx) => <li key={idx}>{item}</li>)
                  : <li>{result.checklist}</li>}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OnBoardingQ; 