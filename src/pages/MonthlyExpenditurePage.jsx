import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import MonthlyExpenditure from '../components/workflows/MonthlyExpenditure';

const MonthlyExpenditurePage = () => (
  <PageRevealWrapper
    heading="Monthly Expenditure"
    description="Track your expenses by entering bills manually or uploading receipts. Get instant summaries and breakdowns."
  >
    <div className="w-full max-w-2xl mx-auto">
      <MonthlyExpenditure />
    </div>
  </PageRevealWrapper>
);

export default MonthlyExpenditurePage; 