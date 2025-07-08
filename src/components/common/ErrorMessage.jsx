import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return (
    <div className="text-red-500 mt-4 flex items-center">
      <FaExclamationCircle className="mr-2" />{error}
    </div>
  );
};

export default ErrorMessage;
