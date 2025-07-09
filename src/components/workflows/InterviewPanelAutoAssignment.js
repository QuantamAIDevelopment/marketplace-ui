import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InterviewPanelAutoAssignment = ({ compact = false }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-start w-full max-w-xs mx-auto min-h-[200px] cursor-pointer hover:shadow-lg transition" onClick={() => navigate('/interview-panel-assignment')}>
      <div className="flex items-center mb-4">
        <div className="bg-purple-600 rounded-xl p-4 flex items-center justify-center mr-3">
          <FaUsers className="text-white w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Interview Panel Auto Assignment</h3>
      </div>
      <p className="text-gray-700 text-base mt-2">
        Automatically assign interviewers based on candidate role, department, and availability using AI.
      </p>
    </div>
  );
};

export default InterviewPanelAutoAssignment; 