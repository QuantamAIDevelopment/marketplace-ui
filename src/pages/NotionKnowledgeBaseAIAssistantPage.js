import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import NotionKnowledgeBaseAIAssistant from '../components/workflows/NotionKnowledgeBaseAIAssistant';

const NotionKnowledgeBaseAIAssistantPage = () => (
  <PageRevealWrapper
    heading="Notion Knowledge Base AI Assistant"
    description="Ask questions and get instant answers from your Notion workspace knowledge base. This AI-powered assistant parses your queries, searches your Notion documentation, and returns relevant answers with direct links to your Notion pages."
    details={
      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
        <li>Ask any question about your Notion workspace or documentation.</li>
        <li>AI parses your query and finds the most relevant answer.</li>
        <li>Answers include direct links to Notion pages when available.</li>
        <li>Great for onboarding, IT, HR, and company knowledge management.</li>
      </ul>
    }
  >
    <NotionKnowledgeBaseAIAssistant />
  </PageRevealWrapper>
);

export default NotionKnowledgeBaseAIAssistantPage;
