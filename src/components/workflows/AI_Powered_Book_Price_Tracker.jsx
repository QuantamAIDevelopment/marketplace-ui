import React, { useState } from 'react';
import { FaSearch, FaBook, FaHistory } from 'react-icons/fa';
import axios from 'axios';

// Updated API URL to match working endpoint
const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/book_price';

const TrackPriceTab = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await axios.post(
        API_URL,
        {
          triggeredBy: 'user',
          message: message || 'Hello from UI!'
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setResult(response.data);
    } catch (err) {
      setError('Failed to fetch book price.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="font-semibold">Message (optional):</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Enter a message to trigger the workflow"
            className="border p-2 rounded flex-1"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            <FaSearch className="mr-2" /> {loading ? 'Fetching...' : 'Track Price'}
          </button>
        </div>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={result.imageurl}
            alt={result.Title}
            className="w-24 h-32 object-cover rounded shadow border"
          />
          <div className="flex-1 space-y-2">
            <div className="font-bold text-lg">{result.Title}</div>
            <div className="text-blue-700 font-semibold">{result.Price}</div>
            <div className="text-green-700">{result.avaliabilty}</div>
            <a
              href={result.producturl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              View Product
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const PriceHistoryTab = () => {
  // Placeholder for future price history/analytics features
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-500">
      <FaHistory className="w-10 h-10 mb-2" />
      <div className="text-lg font-semibold">Price History & Analytics coming soon!</div>
      <div className="text-sm">Track price changes, view trends, and compare books in future updates.</div>
    </div>
  );
};

const AIPoweredBookPriceTracker = () => {
  const [activeTab, setActiveTab] = useState('track');

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-500 p-3 rounded-full shadow">
          <FaBook className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold">AI-Powered Book Price Tracker</h2>
      </div>
      <div className="flex justify-center border-b mb-6">
        <button
          onClick={() => setActiveTab('track')}
          className={`flex items-center space-x-2 px-6 py-3 font-semibold ${activeTab === 'track' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          <FaSearch /> <span>Track Price</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center space-x-2 px-6 py-3 font-semibold ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          <FaHistory /> <span>Price History</span>
        </button>
      </div>
      {activeTab === 'track' && <TrackPriceTab />}
      {activeTab === 'history' && <PriceHistoryTab />}
    </div>
  );
};

export default AIPoweredBookPriceTracker;