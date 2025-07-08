import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaAmazon } from 'react-icons/fa';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/amazon';

const AmazonWebScrape = ({ compact = false }) => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('url', url);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('API error');
      const text = await response.text();
      // Parse the response
      const data = {};
      text.split(/\r?\n/).forEach(line => {
        const [key, ...rest] = line.split(':');
        if (key && rest.length > 0) {
          data[key.trim()] = rest.join(':').trim();
        }
      });
      setResult(data);
    } catch (err) {
      setError('Failed to fetch product details. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={compact ? 'space-y-4 w-full overflow-hidden' : 'space-y-8 w-full'}>
      <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
        <div className={compact ? 'bg-yellow-500 p-2 rounded-lg shadow' : 'bg-yellow-500 p-3 rounded-lg shadow-lg'}>
          <FaAmazon className={compact ? 'w-5 h-5 text-white' : 'w-6 h-6 text-white'} />
        </div>
        <h3 className={compact ? 'text-lg font-display text-anthropic-dark font-bold' : 'text-2xl font-display text-anthropic-dark font-bold'}>
          Amazon Product Scraper
        </h3>
      </div>
      <p className={compact ? 'text-xs text-gray-600' : 'text-sm text-gray-700'}>
        Enter an Amazon product or search URL to extract product details (name, description, rating, reviews, price).
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Paste Amazon product/search URL here"
          className="w-full p-2 border rounded"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #eab30833' }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-yellow-600 hover:to-orange-600 transition-colors"
        >
          {loading ? 'Scraping...' : 'Scrape Product'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {result && (
        <motion.div
          className="bg-white p-4 rounded-lg shadow border mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="text-lg font-bold mb-2">{result.name || 'No Name Found'}</h4>
          <p className="mb-1"><span className="font-semibold">Description:</span> {result.descrption || 'N/A'}</p>
          <p className="mb-1"><span className="font-semibold">Rating:</span> {result.rating || 'N/A'}</p>
          <p className="mb-1"><span className="font-semibold">Reviews:</span> {result.review || 'N/A'}</p>
          <p className="mb-1"><span className="font-semibold">Price:</span> {result.price || 'N/A'}</p>
        </motion.div>
      )}
    </div>
  );
};

export default AmazonWebScrape; 