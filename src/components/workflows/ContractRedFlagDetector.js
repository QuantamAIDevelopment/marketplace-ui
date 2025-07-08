import React from 'react';
import { motion } from 'framer-motion';
import { FaFileContract, FaSearch, FaExclamationTriangle, FaShieldAlt, FaUserTie, FaClipboardList } from 'react-icons/fa';

const ContractRedFlagDetector = () => {
  const features = [
    {
      icon: FaFileContract,
      title: 'Contract Analysis',
      description: 'Automated analysis of contract documents for potential risks and compliance issues.'
    },
    {
      icon: FaSearch,
      title: 'Risk Detection',
      description: 'AI-powered detection of red flags, unusual terms, and potential legal issues.'
    },
    {
      icon: FaExclamationTriangle,
      title: 'Alert System',
      description: 'Immediate notifications for critical issues requiring legal review.'
    },
    {
      icon: FaShieldAlt,
      title: 'Compliance Check',
      description: 'Verify contracts against regulatory requirements and company policies.'
    },
    {
      icon: FaUserTie,
      title: 'Legal Review',
      description: 'Streamlined workflow for legal team review and approval processes.'
    },
    {
      icon: FaClipboardList,
      title: 'Risk Reports',
      description: 'Comprehensive reports with detailed analysis and recommendations.'
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-h2 text-gradient mb-4">
          Contract Red Flag Detector
        </h2>
        <p className="text-text-secondary text-lg max-w-3xl mx-auto">
          Automatically analyze contracts for potential risks, compliance issues, and red flags using advanced AI technology.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-hover p-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-button rounded-xl flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-h3 text-text-primary">{feature.title}</h3>
            </div>
            <p className="text-text-secondary">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContractRedFlagDetector; 