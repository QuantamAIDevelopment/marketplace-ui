import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoverScreen from './CoverScreen';

const PageRevealWrapper = ({ children, heading, description, details }) => {
  const [isCoverVisible, setCoverVisible] = useState(true);

  const handleStart = () => {
    setCoverVisible(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isCoverVisible ? (
        <motion.div
          key="cover"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <CoverScreen
            onStart={handleStart}
            heading={heading}
            description={description}
            details={details}
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageRevealWrapper; 