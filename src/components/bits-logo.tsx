import * as React from 'react';

export function BITSLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="bits-logo-title"
    >
      <title id="bits-logo-title">BITS Pilani Logo</title>
      <text
        x="0"
        y="30"
        fontFamily="Lexend, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="hsl(var(--foreground))"
      >
        BITS Pilani
      </text>
      <text
        x="130"
        y="30"
        fontFamily="Inter, sans-serif"
        fontSize="16"
        fill="hsl(var(--foreground))"
      >
        MSc DSAI
      </text>
    </svg>
  );
}
