import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/fraud-detection-system', label: 'Fraud Detection System' },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="w-full bg-white shadow mb-6">
      <div className="max-w-7xl mx-auto px-4 py-3 flex space-x-6">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`font-semibold text-base px-3 py-2 rounded transition-colors duration-200 ${location.pathname === link.to ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-indigo-100'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar; 