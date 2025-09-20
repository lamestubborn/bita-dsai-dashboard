import * as React from 'react';

export function BITSLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 250 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="bits-logo-title"
    >
      <title id="bits-logo-title">BITS Pilani Logo</title>
      <image
        href="https://bitspilani-digital.edu.in/assets/images/logo.svg?v=1758387037"
        height="55"
        width="250"
      />
    </svg>
  );
}
