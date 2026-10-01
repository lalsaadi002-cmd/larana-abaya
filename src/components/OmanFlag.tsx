import React from 'react';

interface OmanFlagProps {
  className?: string;
}

export const OmanFlag: React.FC<OmanFlagProps> = ({ className = 'w-[22px] h-[14px]' }) => {
  return (
    <svg
      viewBox="0 0 36 24"
      className={`inline-block shrink-0 rounded-[1.5px] overflow-hidden align-middle shadow-[0_1px_2px_rgba(0,0,0,0.25)] border border-white/20 ${className}`}
      aria-label="علم سلطنة عُمان"
      role="img"
    >
      {/* Top white stripe */}
      <rect x="12" y="0" width="24" height="8" fill="#FFFFFF" />
      {/* Middle red stripe */}
      <rect x="12" y="8" width="24" height="8" fill="#DB162F" />
      {/* Bottom green stripe */}
      <rect x="12" y="16" width="24" height="8" fill="#00843D" />
      {/* Vertical red bar on hoist */}
      <rect x="0" y="0" width="12" height="24" fill="#DB162F" />

      {/* National Emblem: Crossed Swords and Khanjar in white */}
      <g fill="#FFFFFF" stroke="#FFFFFF" transform="translate(6, 4.5) scale(0.48)">
        {/* Crossed Scimitars */}
        <path d="M-6,-4 L6,6" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M6,-4 L-6,6" strokeWidth="1.2" strokeLinecap="round" />
        {/* Dagger (Khanjar) */}
        <path d="M0,-5 L1,-2 L2,2 L1,5 L0,6 L-1,5 L-2,2 L-1,-2 Z" strokeWidth="0.5" />
        <circle cx="0" cy="-5.5" r="1.1" strokeWidth="0.4" />
        {/* Sheath loop */}
        <ellipse cx="0" cy="1.2" rx="3.2" ry="1.1" fill="none" strokeWidth="0.7" />
      </g>
    </svg>
  );
};
