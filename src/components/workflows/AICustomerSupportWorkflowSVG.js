import React from 'react';

// Node definitions for this workflow (custom icons)
const nodes = [
  {
    id: 'webhook',
    label: 'Webhook',
    icon: (
      <g>
        <circle cx="0" cy="0" r="28" fill="url(#webhookGradient)" />
        <path d="M-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0" fill="none" stroke="#fff" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="4" fill="#fff" />
      </g>
    ),
    x: 80,
    y: 120,
    color: 'url(#webhookGradient)',
  },
  {
    id: 'code',
    label: 'Code',
    icon: (
      <g>
        <circle cx="0" cy="0" r="28" fill="url(#codeGradient)" />
        <text x="0" y="8" textAnchor="middle" fontSize="28" fill="#fff">{`{}`}</text>
      </g>
    ),
    x: 240,
    y: 120,
    color: 'url(#codeGradient)',
  },
  {
    id: 'switch',
    label: 'Switch',
    icon: (
      <g>
        <circle cx="0" cy="0" r="28" fill="url(#switchGradient)" />
        <path d="M-12 0h24M0-12v24" stroke="#fff" strokeWidth="2.5" />
      </g>
    ),
    x: 400,
    y: 120,
    color: 'url(#switchGradient)',
  },
  {
    id: 'ai',
    label: 'AI Agent',
    icon: (
      <g>
        <circle cx="0" cy="0" r="28" fill="url(#aiGradient)" />
        <rect x="-12" y="-12" width="24" height="24" rx="6" fill="#fff" opacity="0.2" />
        <circle cx="0" cy="0" r="10" fill="#fff" opacity="0.7" />
        <text x="0" y="7" textAnchor="middle" fontSize="18" fill="#3a00ff" fontWeight="bold">🤖</text>
      </g>
    ),
    x: 560,
    y: 120,
    color: 'url(#aiGradient)',
  },
  {
    id: 'response',
    label: 'Response',
    icon: (
      <g>
        <circle cx="0" cy="0" r="28" fill="url(#responseGradient)" />
        <polygon points="-10,-8 14,0 -10,8" fill="#fff" />
      </g>
    ),
    x: 720,
    y: 120,
    color: 'url(#responseGradient)',
  },
];

const edges = [
  { from: 'webhook', to: 'code' },
  { from: 'code', to: 'switch' },
  { from: 'switch', to: 'ai' },
  { from: 'ai', to: 'response' },
];

const AnimatedEdge = ({ x1, y1, x2, y2, idx }) => (
  <g>
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="url(#edgeGradient)"
      strokeWidth={7}
      filter="url(#glow)"
      opacity={0.8}
      strokeLinecap="round"
    >
      <animate attributeName="stroke-dasharray" values="0,200;60,200;0,200" dur="2s" repeatCount="indefinite" />
    </line>
    {/* Animated dot */}
    <circle r="8" fill="#fff" opacity="0.7">
      <animateMotion dur="2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1">
        <mpath xlinkHref={`#edgePath${idx}`} />
      </animateMotion>
    </circle>
    <path
      id={`edgePath${idx}`}
      d={`M${x1},${y1} L${x2},${y2}`}
      fill="none"
      stroke="none"
    />
  </g>
);

const AICustomerSupportWorkflowSVG = ({ width = 820, height = 260 }) => (
  <svg
    width="100%"
    height="100%"
    viewBox={`0 0 ${width} ${height}`}
    style={{ maxWidth: width, maxHeight: height, display: 'block', margin: '0 auto', background: 'radial-gradient(circle at 60% 40%, #232946 60%, #181c2f 100%)', borderRadius: 24 }}
  >
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="webhookGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00ffe7" />
        <stop offset="100%" stopColor="#3a00ff" />
      </linearGradient>
      <linearGradient id="codeGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffb347" />
        <stop offset="100%" stopColor="#ffcc33" />
      </linearGradient>
      <linearGradient id="switchGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ff00c8" />
        <stop offset="100%" stopColor="#fff200" />
      </linearGradient>
      <linearGradient id="aiGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00ffb8" />
        <stop offset="100%" stopColor="#3a00ff" />
      </linearGradient>
      <linearGradient id="responseGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffb347" />
        <stop offset="100%" stopColor="#ff00c8" />
      </linearGradient>
      <linearGradient id="edgeGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff200" />
        <stop offset="100%" stopColor="#ff00c8" />
      </linearGradient>
    </defs>
    {/* Edges */}
    {edges.map((edge, idx) => {
      const from = nodes.find(n => n.id === edge.from);
      const to = nodes.find(n => n.id === edge.to);
      return (
        <AnimatedEdge
          key={idx}
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          idx={idx}
        />
      );
    })}
    {/* Nodes */}
    {nodes.map((node, idx) => (
      <g key={node.id} transform={`translate(${node.x},${node.y})`}>
        {node.icon}
        <text
          x={0}
          y={48}
          textAnchor="middle"
          fontSize={16}
          fontWeight="bold"
          fill="#fff"
          style={{ textShadow: '0 2px 8px #000' }}
        >
          {node.label}
        </text>
      </g>
    ))}
  </svg>
);

export default AICustomerSupportWorkflowSVG; 