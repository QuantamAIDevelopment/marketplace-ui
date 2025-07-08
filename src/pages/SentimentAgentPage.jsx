import React, { useEffect, useState } from 'react';

const SENTIMENT_API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/Sentiment agent';

const SentimentAgentPage = () => {
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(SENTIMENT_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch sentiment report');
        }
        const text = await response.text();
        setReport(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Sentiment Agent Report</h1>
      {loading && <div className="text-blue-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-sm overflow-x-auto">{report}</pre>
      )}
    </div>
  );
};

export default SentimentAgentPage;
