/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        text_primary: 'var(--text-primary)',
        text_secondary: 'var(--text-secondary)',
        border_color: 'var(--border-color)',
        shadow_color: 'var(--shadow-color)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
      },

      fontFamily: {
        primary: ['Nunito Sans', 'sans-serif'],
        logo: ['Protest Revolution', 'sans-serif'],
      },
      container: {
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1450px',
        },
      },
    },
  },
  plugins: [],
};
