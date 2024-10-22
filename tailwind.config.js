/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'body': '#ffffff',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "cupcake"], // or any custom theme you'd like
  },
};
