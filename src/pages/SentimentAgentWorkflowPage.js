import React, { useEffect, useState } from 'react';

const SentimentAgentWorkflowPage = () => {
  const [workflow, setWorkflow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/src/workflows/Sentiment_agent.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load workflow definition');
        return res.json();
      })
      .then(setWorkflow)
      .catch(setError);
  }, []);

  if (error) return <div className="p-8 text-red-600">Error: {error.message}</div>;
  if (!workflow) return <div className="p-8">Loading workflow...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{workflow.name || 'Sentiment Agent Workflow'}</h1>
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
        {JSON.stringify(workflow, null, 2)}
      </pre>
      <p className="mt-4 text-gray-600">This is a placeholder. You can build a custom UI to interact with this workflow.</p>
    </div>
  );
};

export default SentimentAgentWorkflowPage;
