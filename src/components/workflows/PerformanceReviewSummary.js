import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PerformanceReviewSummary = () => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-start w-full max-w-xs mx-auto min-h-[200px] cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate('/workflows/performance-review-summary')}
    >
      <div className="flex items-center mb-4">
        <div className="bg-blue-600 rounded-xl p-4 flex items-center justify-center mr-3">
          <FaChartLine className="text-white w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Performance Review Summary</h3>
      </div>
      <p className="text-gray-700 text-base mt-2">
        Summarize employee performance, strengths, and improvement areas with AI-powered insights.
      </p>
    </div>
  );
};

export default PerformanceReviewSummary; 