import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileUpload, FaCommentDots } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/testmonial';

function parseTestmonialResponse(text) {
  // Example response:
  // 🎉 *New Positive Testimonial Received!* 🗣️ "*I absolutely love the way this app works...*" ✅ *Sentiment: Positive 🏷️ *Tags: app functionality,user experience,ease of use 📦 *Product: App X 📝 *
  const testimonialMatch = text.match(/🗣️\s*"\*(.*?)\*"/);
  const sentimentMatch = text.match(/Sentiment:\s*([A-Za-z]+)/);
  const tagsMatch = text.match(/Tags:\s*([\w ,]+)/);
  const productMatch = text.match(/Product:\s*([\w\s]+)/);
  return {
    testimonial: testimonialMatch ? testimonialMatch[1].trim() : '',
    sentiment: sentimentMatch ? sentimentMatch[1].trim() : '',
    tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()) : [],
    product: productMatch ? productMatch[1].trim() : '',
  };
}

const TestmonialExtractor = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a file.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('testmonial', file);
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const parsed = parseTestmonialResponse(response.data);
      setResult(parsed);
    } catch (err) {
      setError('Failed to extract testimonial. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 mt-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-500 p-2 rounded-lg shadow">
          <FaCommentDots className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-display text-anthropic-dark font-bold">AI Testmonial Extractor</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex items-center cursor-pointer">
          <FaFileUpload className="mr-2 text-blue-600" />
          <input type="file" onChange={handleFileChange} className="hidden" />
          <span className="font-medium">Upload Feedback File</span>
        </label>
        {file && <span className="text-sm text-gray-600">{file.name}</span>}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Extracting...' : 'Extract Testimonial'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 shadow border"
        >
          <h3 className="text-lg font-bold mb-2 text-blue-700">Extracted Testimonial</h3>
          <blockquote className="italic text-xl text-gray-800 border-l-4 border-blue-400 pl-4 mb-4">“{result.testimonial}”</blockquote>
          <div className="flex flex-wrap gap-4 mb-2">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Sentiment: {result.sentiment}</span>
            {result.product && <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">Product: {result.product}</span>}
          </div>
          {result.tags.length > 0 && (
            <div className="mt-2">
              <span className="font-semibold text-gray-700">Tags:</span>
              {result.tags.map((tag, i) => (
                <span key={i} className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">{tag}</span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default TestmonialExtractor;
