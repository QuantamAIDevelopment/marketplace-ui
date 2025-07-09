import React from 'react';
import { FaHistory } from 'react-icons/fa';

const BookPriceHistory = () => (
  <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-500">
    <FaHistory className="w-10 h-10 mb-2" />
    <div className="text-lg font-semibold">Price History & Analytics coming soon!</div>
    <div className="text-sm">Track price changes, view trends, and compare books in future updates.</div>
  </div>
);

export default BookPriceHistory; 