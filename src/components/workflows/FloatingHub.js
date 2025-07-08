import React, { useState } from 'react';

export default function FloatingHub() {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="relative z-20 mx-auto mt-40 md:mt-24 w-[480px] h-[320px] md:w-[340px] md:h-[220px] flex items-center justify-center" role="region" aria-label="Grok 3D Hub Panel">
      {/* Subtle border ring for light theme */}
      <div className="absolute -inset-2 rounded-[32px] pointer-events-none border border-gray-200 shadow-lg" style={{ filter: 'blur(1px)' }} />
      <div className="relative w-full h-full bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center border border-gray-200">
        <h1 className="text-3xl font-display text-anthropic-dark mb-4">Grok 3D Hub</h1>
        <p className="text-lg text-anthropic-dark mb-8">Futuristic 3D Dashboard</p>
        <button
          className="px-8 py-3 rounded-full bg-accent-blue text-white font-bold text-lg shadow focus:outline-none focus:ring-2 focus:ring-accent-blue transition-transform duration-300"
          style={{
            transform: pressed ? 'scale(0.95)' : 'scale(1)',
            boxShadow: pressed
              ? '0 0 0 2px #61868d66 inset'
              : '0 2px 8px 0 #cde3e7',
            transition: 'transform 0.18s cubic-bezier(0.7,0,0.3,1), box-shadow 0.18s cubic-bezier(0.7,0,0.3,1)',
          }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          aria-pressed={pressed}
          aria-label="Cosmic Action Button"
        >
          Cosmic Action
        </button>
      </div>
    </div>
  );
} 