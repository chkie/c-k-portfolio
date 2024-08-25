/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      screens: {
        hd: { min: '1280px', max: '1919px' }, // Breakpoint für 1920x1080 bis knapp unter 2560x1440
        'wq-hd': { min: '2559px', max: '3839px' },
        'full-hd': { min: '1919px', max: '2558px' }, // Breakpoint ab 2560x1440
        '4k': { min: '3839px' }, // Breakpoint ab 2559x1440
        'landscape-max': { raw: '(orientation: landscape) and (max-width: 1279px)' } // Breakpoint für Landscape-Modus
      }
    }
  },
  plugins: [typography]
};
