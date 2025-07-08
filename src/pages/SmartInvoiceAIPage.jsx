import React from 'react';
import { motion } from 'framer-motion';
import PageRevealWrapper from '../components/PageRevealWrapper';
import SmartInvoiceAI from '../components/workflows/SmartInvoiceAI';

const SmartInvoiceAIPage = () => {
  return (
    <PageRevealWrapper
      heading="SmartInvoice AI: Automated Invoice Validation & Categorization"
      description="Upload invoices (PDF) to automatically extract, validate, categorize, and check status. Get instant feedback, error detection, and Google Sheets integration."
    >
      <SmartInvoiceAI />
    </PageRevealWrapper>
  );
};

export default SmartInvoiceAIPage;
