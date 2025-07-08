import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import DatabaseMigrationAI from '../components/workflows/DatabaseMigrationAI';

const DatabaseMigrationAIPage = () => {
  return (
    <PageRevealWrapper
      heading="Database Migration AI Agent"
      description="Migrate tables between databases with AI-powered automation. Enter your source and destination database names to transfer data quickly and securely."
      details={
        <div>
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Features</h2>
            <ul className="list-disc ml-6 text-base text-gray-700 space-y-1">
              <li>Easy database-to-database migration via simple form input.</li>
              <li>LLM-powered SQL generation and execution for safe, accurate data transfer.</li>
              <li>Supports MySQL and other major RDBMS (via n8n workflow).</li>
              <li>Shows migration summary: source, destination, total rows transferred, and timestamp.</li>
              <li>Secure, no-code workflow—no manual SQL writing required.</li>
              <li>Instant feedback on migration status and errors.</li>
            </ul>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Example Use Cases</h2>
            <ul className="list-disc ml-6 text-base text-gray-700 space-y-1">
              <li>IT Teams: Migrate tables between dev, staging, and production environments.</li>
              <li>Data Engineers: Move analytics data from operational to reporting databases.</li>
              <li>Startups: Quickly clone or reset test data for demos and QA.</li>
              <li>Consultants: Help clients move data between cloud and on-premise systems.</li>
            </ul>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">⚡ Why This Stands Out</h2>
            <ul className="list-disc ml-6 text-base text-gray-700 space-y-1">
              <li>No SQL expertise needed—just enter database names and click migrate.</li>
              <li>Automated, reliable, and auditable migration process.</li>
              <li>Works with your existing database credentials and n8n setup.</li>
            </ul>
          </section>
        </div>
      }
    >
      <div className="py-8 px-2 min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <DatabaseMigrationAI />
      </div>
    </PageRevealWrapper>
  );
};

export default DatabaseMigrationAIPage;
