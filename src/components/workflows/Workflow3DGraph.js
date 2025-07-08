import React from 'react';

// Utility to extract nodes and connections from workflow JSON
function parseWorkflow(workflow) {
  const nodes = (workflow.nodes || []).map(node => ({
    id: node.id,
    name: node.name,
    position: node.position,
  }));
  // Build a map from node name to id for connection lookup
  const nameToId = Object.fromEntries(nodes.map(n => [n.name, n.id]));
  const connections = [];
  if (workflow.connections) {
    Object.entries(workflow.connections).forEach(([fromName, conns]) => {
      Object.values(conns).forEach(connArr => {
        connArr.forEach(connList => {
          connList.forEach(conn => {
            if (conn.node && nameToId[fromName] && nameToId[conn.node]) {
              connections.push({
                from: nameToId[fromName],
                to: nameToId[conn.node],
              });
            }
          });
        });
      });
    });
  }
  return { nodes, connections };
}

// SVG Glow filter definition
const GlowDefs = () => (
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <linearGradient id="nodeGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#00ffe7" />
      <stop offset="100%" stopColor="#3a00ff" />
    </linearGradient>
    <linearGradient id="edgeGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#fff200" />
      <stop offset="100%" stopColor="#ff00c8" />
    </linearGradient>
  </defs>
);

// Main component
const Workflow3DGraph = ({ workflow, width = 1200, height = 800 }) => {
  if (!workflow) return null;
  const { nodes, connections } = parseWorkflow(workflow);

  // Helper to get node by id
  const getNode = id => nodes.find(n => n.id === id);

  return (
    <svg width={width} height={height} style={{ background: 'radial-gradient(circle at 60% 40%, #232946 60%, #181c2f 100%)', borderRadius: 24 }}>
      <GlowDefs />
      {/* Edges */}
      {connections.map((conn, i) => {
        const from = getNode(conn.from);
        const to = getNode(conn.to);
        if (!from || !to) return null;
        return (
          <AnimatedEdge key={i} from={from.position} to={to.position} />
        );
      })}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={node.id}>
          <circle
            cx={node.position[0]}
            cy={node.position[1]}
            r={38}
            fill="url(#nodeGradient)"
            filter="url(#glow)"
            style={{ stroke: '#fff', strokeWidth: 2, opacity: 0.95 }}
          />
          <text
            x={node.position[0]}
            y={node.position[1] + 6}
            textAnchor="middle"
            fontSize={16}
            fontWeight="bold"
            fill="#fff"
            style={{ textShadow: '0 2px 8px #000' }}
          >
            {node.name.length > 18 ? node.name.slice(0, 15) + '…' : node.name}
          </text>
        </g>
      ))}
    </svg>
  );
};

// Animated edge as a glowing SVG path
const AnimatedEdge = ({ from, to }) => {
  // Simple straight line, could be replaced with a curve for more style
  const [x1, y1] = from;
  const [x2, y2] = to;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="url(#edgeGradient)"
        strokeWidth={6}
        filter="url(#glow)"
        opacity={0.7}
      >
        <animate attributeName="stroke-dasharray" values="0,200;60,200;0,200" dur="2s" repeatCount="indefinite" />
      </line>
    </g>
  );
};

export default Workflow3DGraph; 