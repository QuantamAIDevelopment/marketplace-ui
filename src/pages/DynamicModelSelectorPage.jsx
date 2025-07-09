import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import DynamicModelSelector from '../components/workflows/DynamicModelSelector';

const DynamicModelSelectorPage = () => (
  <PageRevealWrapper
    heading="Dynamic Model Selector for Optimal AI Responses"
    description="Ask any question and let the agent route it to the best AI model for the job. This workflow analyzes your query and intelligently selects the optimal large language model for the most accurate and relevant response."
    details={
      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
        <li>Type your question and submit to the agent.</li>
        <li>The system analyzes your query and selects the best model.</li>
        <li>See which model was chosen and the AI's answer.</li>
        <li>Great for research, coding, reasoning, and more.</li>
      </ul>
    }
  >
    <DynamicModelSelector />
  </PageRevealWrapper>
);

export default DynamicModelSelectorPage;
