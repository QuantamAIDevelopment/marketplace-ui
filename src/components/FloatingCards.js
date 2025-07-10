import React, { useState } from 'react';

function Card({ color, shadow, small, label = "Card" }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = hovered || focused;
  return (
    <div
      className={`relative ${small ? 'w-40 h-48' : 'w-56 h-72'} rounded-3xl cursor-pointer outline-none flex items-center justify-center group transition-all duration-300`}
      style={{
        transform: active
          ? 'scale(1.07) translateY(-8px)'
          : 'scale(1) translateY(0)',
        transition: 'transform 0.3s cubic-bezier(0.4,2,0.3,1)',
        boxShadow: active
          ? `0 8px 32px 0 #61868d33`
          : '0 2px 12px 0 #cde3e7',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={0}
      aria-label="Floating 3D Card"
      role="button"
    >
      {/* Glassmorphism background */}
      <div className={`absolute inset-0 z-0 bg-gradient-to-br ${color} opacity-70 rounded-3xl blur-sm`} />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <span className="font-bold text-lg text-white drop-shadow-lg tracking-wide select-none">{label}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-40" />
    </div>
  );
}

export default function FloatingCards() {
  // Responsive: fallback to small if window is less than 900px
  const isSmall = typeof window !== 'undefined' ? window.innerWidth < 900 : false;
  return (
    <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8 md:gap-4">
      <Card color="from-blue-400 via-purple-400 to-pink-400" small={isSmall} label="AI" />
      <Card color="from-green-300 via-blue-300 to-purple-300" small={isSmall} label="Workflow" />
    </div>
  );
}