import React from 'react';
import PdfSummarizer from '../components/workflows/PdfSummarizer';
import PageRevealWrapper from '../components/PageRevealWrapper';

const PdfSummarizerPage = () => (
  <PageRevealWrapper
    heading="AI PDF Summarizer"
    description="Upload a PDF and instantly extract key points, executive summary, entities, and topics using advanced AI. Perfect for students, educators, and professionals who need quick insights from documents."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>AI-powered summarization of uploaded PDFs.</li>
            <li>Extracts key points, executive summary, entities, and topics.</li>
            <li>Fast, accurate, and easy to use—no manual reading required.</li>
            <li>Supports education, research, and business use cases.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Students: Summarize textbooks, research papers, and notes for revision.</li>
            <li>Teachers: Quickly review and extract main points from study material.</li>
            <li>Professionals: Get executive summaries from reports and whitepapers.</li>
            <li>Researchers: Extract entities and topics from academic PDFs.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">⚡ Why This Stands Out</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Instant, accurate AI-powered summaries from any PDF.</li>
            <li>Extracts actionable insights, not just plain text.</li>
            <li>Simple upload interface—no technical skills required.</li>
            <li>Secure and private: your files are never stored.</li>
          </ul>
        </div>
      </div>
    }
  >
    <PdfSummarizer />
  </PageRevealWrapper>
);

export default PdfSummarizerPage;
