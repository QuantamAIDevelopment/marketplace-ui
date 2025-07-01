import React from 'react';
import { motion } from 'framer-motion';
import PageRevealWrapper from '../components/PageRevealWrapper';
import SmartInvoiceAI from '../components/workflows/SmartInvoiceAI';

const SmartInvoiceAIPage = () => {
  return (
    <PageRevealWrapper
      heading="SmartInvoice AI: Automated Invoice Validation & Categorization"
      description="Transform your invoice management with AI-powered extraction, validation, and categorization. Upload PDF invoices to get instant feedback, error detection, and seamless Google Sheets integration for your business workflows."
    >
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="max-w-3xl text-center mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">
            Why SmartInvoice AI?
          </h2>
          <p className="text-base text-gray-700 mb-4">
            SmartInvoice AI automates the tedious process of invoice validation and
            record-keeping. Instantly detect errors, categorize expenses, and keep your
            accounts up-to-date with zero manual effort. Perfect for finance teams,
            accountants, and business owners who want to save time and reduce mistakes.
          </p>
        </div>
        <SmartInvoiceAI />
      </div>
    </PageRevealWrapper>
  );
};

export default SmartInvoiceAIPage;
