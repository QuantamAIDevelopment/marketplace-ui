import React from 'react';
import { motion } from 'framer-motion';
import { FaAmazon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AmazonWebScrapeCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-hover cursor-pointer space-y-8 w-full bg-white rounded-xl shadow p-6 flex flex-col justify-between"
      onClick={() => navigate('/amazon-web-scrape')}
    >
      <div className="flex items-center space-x-4 mb-2">
        <div className="bg-yellow-500 p-3 rounded-lg shadow-lg">
          <FaAmazon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-display text-anthropic-dark font-bold">Amazon Product Scraper</h3>
      </div>
      <p className="text-sm text-gray-700">
        Instantly extract product details (name, price, rating, reviews) from any Amazon URL.
      </p>
    </motion.div>
  );
};

export default AmazonWebScrapeCard; 