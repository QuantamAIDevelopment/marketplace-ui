import React, { useState } from 'react';

function Card({ color, shadow, small }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = hovered || focused;
  return (
    <div
      className={`${small ? 'w-40 h-48' : 'w-56 h-72'} bg-white border border-gray-200 rounded-2xl shadow-md cursor-pointer outline-none flex items-center justify-center`}
      style={{
        transform: active
          ? 'scale(1.05) translateY(-4px)'
          : 'scale(1) translateY(0)',
        transition: 'transform 0.3s cubic-bezier(0.4,2,0.3,1)',
        boxShadow: active
          ? `0 4px 24px 0 #61868d33`
          : '0 2px 8px 0 #cde3e7',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={0}
      aria-label="Floating 3D Card"
      role="button"
    >
      <span className="text-anthropic-dark font-bold text-lg">Card</span>
    </div>
  );
}

export default function FloatingCards() {
  return (
    <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8 md:gap-4">
      <Card color="#61868d" shadow="shadow" small={window.innerWidth < 900} />
      <Card color="#cde3e7" shadow="shadow" small={window.innerWidth < 900} />
    </div>
  );
} 