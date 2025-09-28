
'use client';

import Image from 'next/image';

export function BuyMeACoffeeButton() {
  return (
    <a
      href="https://www.buymeacoffee.com/thestubbornsailor"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        height={60}
        width={217}
        style={{ height: '44px', width: 'auto' }}
      />
    </a>
  );
}
