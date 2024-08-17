/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      screens: {
        hd: { min: '1280px', max: '1919px' }, // Breakpoint für 1920x1080 bis knapp unter 2560x1440
        'wq-hd': { min: '2560px' } // Breakpoint ab 2560x1440
      }
    }
  },
  plugins: [typography]
};
