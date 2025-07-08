import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileUpload, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { uploadOnBoardingODS } from '../../services/workflows/onBoardingQ';

const OnBoardingQ = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.ods')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid ODS file.');
      setFile(null);
    }
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
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">OnBoarding Q Email Generator</h3>
        <p className="text-sm text-gray-600">
          Upload a client onboarding ODS file to generate a personalized onboarding email and checklist for your client.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <FaFileUpload className="mx-auto text-4xl text-gray-400 mb-4" />
          <input
            type="file"
            accept=".ods"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-lg font-medium text-gray-700 mb-2">
              {file ? file.name : 'Click to upload ODS file'}
            </div>
            <div className="text-sm text-gray-500">
              {file ? 'File selected' : 'Only .ods files are supported'}
            </div>
          </label>
        </div>
        {file && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-green-50 p-4 rounded-lg border border-green-200"
          >
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-500" />
              <span className="text-green-700 font-medium">File ready for processing</span>
            </div>
          </motion.div>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading || !file}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Generate Onboarding Email'
          )}
        </motion.button>
      </form>
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <FaExclamationTriangle />
            <span>{error}</span>
          </div>
        </motion.div>
      )}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg border"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Generated Onboarding Email</h3>
            <div className="prose prose-sm md:prose-base max-w-none text-anthropic-dark whitespace-pre-line bg-gray-50 rounded-xl p-6 border border-blue-200 shadow">
              {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnBoardingQ; 