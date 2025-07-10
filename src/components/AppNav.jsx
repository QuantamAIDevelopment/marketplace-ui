import React from 'react';
import { Link } from 'react-router-dom';

const AppNav = () => (
  <nav className="w-full bg-white shadow py-3 px-6 flex space-x-6 items-center justify-center mb-8">
    <Link className="font-semibold text-blue-700 hover:underline" to="/">Dashboard</Link>
    <Link className="text-gray-700 hover:text-blue-700" to="/fetch-leads">Fetch Leads</Link>
    <Link className="text-gray-700 hover:text-blue-700" to="/mcq-generator">MCQ Generator</Link>
    <Link className="text-gray-700 hover:text-blue-700" to="/automate-candidate-acceptance">Candidate Acceptance</Link>
    <Link className="text-gray-700 hover:text-blue-700" to="/attendance-anomalies">Attendance Anomalies</Link>
    {/* Add more links as needed */}
  </nav>
);

export default AppNav;
