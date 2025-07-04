import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import PdfSummarizerAgent from '../components/workflows/PdfSummarizerAgent';

const PdfSummarizerAgentPage = () => {
  return (
    <PageRevealWrapper>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 mb-4">Evenmind AI: PDF Summarizer Agent</h1>
        <p className="text-lg text-center text-gray-700 mb-8">
          Instantly extract executive summaries, key points, entities, and topics from any PDF. Receive results directly in your email.
        </p>
        <div className="bg-white border rounded-lg p-4 mb-8 shadow text-gray-800 whitespace-pre-line prose max-w-none">
          <h2 className="text-xl font-bold mb-2 text-blue-700">Example Use Cases</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>EdTech Platforms: Instantly summarize course PDFs for quick content review and knowledge extraction.</li>
            <li>Teachers & Trainers: Generate executive summaries and key points from study materials for lesson planning.</li>
            <li>Students: Upload notes or textbooks to get concise summaries and topic lists for revision.</li>
            <li>Academic Publishers: Enhance eBooks with AI-generated summaries and entity extraction.</li>
            <li>Business & HR: Summarize policy documents, contracts, or reports for fast decision making.</li>
            <li>Legal & Compliance: Extract entities and topics from legal PDFs for compliance checks.</li>
          </ul>
          <h2 className="text-xl font-bold mb-2 text-purple-700">Why This Stands Out</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Multi-source Input: Accepts any PDF document for summarization.</li>
            <li>LLM-Powered: Uses advanced AI to extract key points, summaries, entities, and topics.</li>
            <li>Email Delivery: Sends the summary directly to your email for easy sharing and archiving.</li>
            <li>Time Saver: Reduces manual reading and note-taking for large documents.</li>
            <li>Universal: Useful for education, business, legal, and personal productivity.</li>
          </ul>
        </div>
        <PdfSummarizerAgent />
      </div>
    </PageRevealWrapper>
  );
};

export default PdfSummarizerAgentPage;
