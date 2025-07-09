import React from 'react';
import Workflow3DGraph from './Workflow3DGraph';

const WorkflowPageWrapper = ({
  title,
  description,
  workflow,
  children,
  graphHeight = 340,
  graphWidth = 700,
}) => (
  <div
    style={{
      background: 'linear-gradient(135deg, #f8e8ff 0%, #e0e7ff 100%)',
      borderRadius: 16,
      padding: 32,
      maxWidth: 900,
      margin: '40px auto',
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    }}
  >
    <h2
      style={{
        textAlign: 'center',
        color: '#b100b1',
        fontWeight: 700,
        fontSize: 32,
        marginBottom: 16,
      }}
    >
      {title}
    </h2>
    <p
      style={{
        textAlign: 'center',
        color: '#333',
        fontSize: 18,
        marginBottom: 32,
      }}
    >
      {description}
    </p>
    <div
      style={{
        width: '100%',
        height: graphHeight,
        background: 'rgba(255,255,255,0.7)',
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 24,
        overflow: 'auto',
      }}
    >
      <Workflow3DGraph workflow={workflow} width={graphWidth} height={graphHeight - 20} />
    </div>
    {children}
  </div>
);

export default WorkflowPageWrapper; 