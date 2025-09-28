
'use client';

import Script from 'next/script';

export function BuyMeACoffeeButton() {
  return (
    <div>
      <Script
        type="text/javascript"
        src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
        data-name="bmc-button"
        data-slug="thestubbornsailor"
        data-color="#FFDD00"
        data-emoji=""
        data-font="Cookie"
        data-text="Buy me a coffee"
        data-outline-color="#000000"
        data-font-color="#000000"
        data-coffee-color="#ffffff"
        strategy="afterInteractive"
      />
      {/* The script needs this anchor to render the button. It will be transformed by the script. */}
      <a
        href="https://www.buymeacoffee.com/thestubbornsailor"
        target="_blank"
        rel="noopener noreferrer"
      />
    </div>
  );
}
