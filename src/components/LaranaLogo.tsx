import React from 'react';

interface LaranaLogoProps {
  className?: string;
  variant?: 'badge' | 'inline' | 'light';
  height?: number | string;
}

export const LaranaLogo: React.FC<LaranaLogoProps> = ({
  className = 'h-11 sm:h-13 w-auto',
  variant = 'badge',
}) => {
  const gold = '#C6A972';
  const navy = '#0B1B3D';

  if (variant === 'badge') {
    // Official Logo on its deep midnight navy background as uploaded
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 540 260"
          className="w-full h-full object-contain"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="LARANA STORE Official Logo"
        >
          {/* Deep Midnight Navy Background from official logo */}
          <rect width="540" height="260" rx="4" fill={navy} />

          {/* Top Frame Left */}
          <line x1="50" y1="52" x2="195" y2="52" stroke={gold} strokeWidth="3" strokeLinecap="square" />

          {/* Top Wordmark: STORE */}
          <text
            x="270"
            y="57"
            textAnchor="middle"
            fill={gold}
            fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif"
            fontSize="21"
            letterSpacing="8"
            fontWeight="500"
          >
            STORE
          </text>

          {/* Top Frame Right */}
          <line x1="345" y1="52" x2="490" y2="52" stroke={gold} strokeWidth="3" strokeLinecap="square" />

          {/* Left Vertical Frame */}
          <line x1="50" y1="50.5" x2="50" y2="200" stroke={gold} strokeWidth="3" strokeLinecap="square" />

          {/* Right Vertical Frame */}
          <line x1="490" y1="50.5" x2="490" y2="200" stroke={gold} strokeWidth="3" strokeLinecap="square" />

          {/* Main Brand Title: L A R A N A */}
          <text
            x="270"
            y="148"
            textAnchor="middle"
            fill={gold}
            fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif"
            fontSize="52"
            letterSpacing="16"
            fontWeight="400"
          >
            LARANA
          </text>

          {/* Bottom Frame Left Section */}
          <line x1="50" y1="198.5" x2="160" y2="198.5" stroke={gold} strokeWidth="3" strokeLinecap="square" />

          {/* Bottom Left Beaded Dots */}
          <circle cx="166" cy="198.5" r="2.2" fill={gold} />
          <circle cx="173" cy="198.5" r="2.2" fill={gold} />
          <circle cx="180" cy="198.5" r="2.2" fill={gold} />
          <circle cx="187" cy="198.5" r="2.2" fill={gold} />

          {/* Left Floral Filigree Flourish */}
          <path
            d="M 194 200 C 205 212, 218 214, 230 200 C 238 190, 245 194, 252 198.5 C 242 205, 226 218, 206 206 C 198 201, 195 197, 194 198"
            stroke={gold}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 218 208 C 225 204, 235 204, 244 198"
            stroke={gold}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />

          {/* Central Medallion Circle */}
          <circle cx="270" cy="198.5" r="13" fill={gold} />

          {/* Right Floral Filigree Flourish (Symmetrical) */}
          <path
            d="M 346 200 C 335 212, 322 214, 310 200 C 302 190, 295 194, 288 198.5 C 298 205, 314 218, 334 206 C 342 201, 345 197, 346 198"
            stroke={gold}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 322 208 C 315 204, 305 204, 296 198"
            stroke={gold}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />

          {/* Bottom Right Beaded Dots */}
          <circle cx="353" cy="198.5" r="2.2" fill={gold} />
          <circle cx="360" cy="198.5" r="2.2" fill={gold} />
          <circle cx="367" cy="198.5" r="2.2" fill={gold} />
          <circle cx="374" cy="198.5" r="2.2" fill={gold} />

          {/* Bottom Frame Right Section */}
          <line x1="380" y1="198.5" x2="490" y2="198.5" stroke={gold} strokeWidth="3" strokeLinecap="square" />
        </svg>
      </div>
    );
  }

  // Transparent lockup version (gold elements over navy/ivory)
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 260"
        className="w-full h-full object-contain"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="LARANA STORE Official Logo"
      >
        {/* Top Frame Left */}
        <line x1="50" y1="52" x2="195" y2="52" stroke={gold} strokeWidth="3" strokeLinecap="square" />

        {/* Top Wordmark: STORE */}
        <text
          x="270"
          y="57"
          textAnchor="middle"
          fill={gold}
          fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif"
          fontSize="21"
          letterSpacing="8"
          fontWeight="500"
        >
          STORE
        </text>

        {/* Top Frame Right */}
        <line x1="345" y1="52" x2="490" y2="52" stroke={gold} strokeWidth="3" strokeLinecap="square" />

        {/* Left Vertical Frame */}
        <line x1="50" y1="50.5" x2="50" y2="200" stroke={gold} strokeWidth="3" strokeLinecap="square" />

        {/* Right Vertical Frame */}
        <line x1="490" y1="50.5" x2="490" y2="200" stroke={gold} strokeWidth="3" strokeLinecap="square" />

        {/* Main Brand Title: L A R A N A */}
        <text
          x="270"
          y="148"
          textAnchor="middle"
          fill={gold}
          fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif"
          fontSize="52"
          letterSpacing="16"
          fontWeight="400"
        >
          LARANA
        </text>

        {/* Bottom Frame Left Section */}
        <line x1="50" y1="198.5" x2="160" y2="198.5" stroke={gold} strokeWidth="3" strokeLinecap="square" />

        {/* Bottom Left Beaded Dots */}
        <circle cx="166" cy="198.5" r="2.2" fill={gold} />
        <circle cx="173" cy="198.5" r="2.2" fill={gold} />
        <circle cx="180" cy="198.5" r="2.2" fill={gold} />
        <circle cx="187" cy="198.5" r="2.2" fill={gold} />

        {/* Left Floral Filigree Flourish */}
        <path
          d="M 194 200 C 205 212, 218 214, 230 200 C 238 190, 245 194, 252 198.5 C 242 205, 226 218, 206 206 C 198 201, 195 197, 194 198"
          stroke={gold}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 218 208 C 225 204, 235 204, 244 198"
          stroke={gold}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Central Medallion Circle */}
        <circle cx="270" cy="198.5" r="13" fill={gold} />

        {/* Right Floral Filigree Flourish (Symmetrical) */}
        <path
          d="M 346 200 C 335 212, 322 214, 310 200 C 302 190, 295 194, 288 198.5 C 298 205, 314 218, 334 206 C 342 201, 345 197, 346 198"
          stroke={gold}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 322 208 C 315 204, 305 204, 296 198"
          stroke={gold}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Bottom Right Beaded Dots */}
        <circle cx="353" cy="198.5" r="2.2" fill={gold} />
        <circle cx="360" cy="198.5" r="2.2" fill={gold} />
        <circle cx="367" cy="198.5" r="2.2" fill={gold} />
        <circle cx="374" cy="198.5" r="2.2" fill={gold} />

        {/* Bottom Frame Right Section */}
        <line x1="380" y1="198.5" x2="490" y2="198.5" stroke={gold} strokeWidth="3" strokeLinecap="square" />
      </svg>
    </div>
  );
};
