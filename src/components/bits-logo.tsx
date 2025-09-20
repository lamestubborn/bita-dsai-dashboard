import * as React from 'react';
import { cn } from '@/lib/utils';

export function BITSLogo({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-sm p-1 dark:bg-white', className)}>
      <svg
        viewBox="0 0 250 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="bits-logo-title"
        className="h-full w-full"
      >
        <title id="bits-logo-title">BITS Pilani Logo</title>
        <image
          href="https://bitspilani-digital.edu.in/assets/images/logo.svg?v=1758387037"
          height="55"
          width="250"
        />
      </svg>
    </div>
  );
}
