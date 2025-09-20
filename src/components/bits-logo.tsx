import * as React from 'react';

export function BITSLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 330 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
      aria-labelledby="bits-logo-title"
    >
      <title id="bits-logo-title">BITS Pilani Logo</title>
      <image
        href="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png"
        height="80"
        width="330"
        
      />
    </svg>
  );
}
