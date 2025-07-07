import React from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PdfSummarizer = ({ compact = false }) => {
  const navigate = useNavigate();

  return (
    <div className={compact ? "space-y-4 w-full overflow-hidden" : "space-y-8 w-full"}>
      <div className={compact ? "flex items-center space-x-2 mb-1" : "flex items-center space-x-4 mb-2"}>
        <div className={compact ? "bg-red-500 p-2 rounded-lg shadow" : "bg-red-500 p-3 rounded-lg shadow-lg"}>
          <FaFilePdf className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
        </div>
        <h3 className={compact ? "text-lg font-display text-anthropic-dark font-bold" : "text-2xl font-display text-anthropic-dark font-bold"}>PDF Summarizer</h3>
      </div>
      <p className={compact ? "text-xs text-gray-600" : "text-sm text-gray-700"}>
        Upload a PDF to extract key points, executive summary, entities, and topics using AI.
      </p>
      <button
        onClick={() => navigate('/pdf-summarizer')}
        className={compact ? "w-full bg-gradient-to-r from-red-500 to-blue-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-red-600 hover:to-blue-600 transition-colors" : "w-full bg-gradient-to-r from-red-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-red-600 hover:to-blue-600 transition-colors"}
      >
        View Details
      </button>
    </div>
  );
};

export default PdfSummarizer;
