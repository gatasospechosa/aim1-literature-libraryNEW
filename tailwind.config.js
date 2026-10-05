/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F3ECE0',
          300: '#E7DCB6',
          400: '#D5C4A1',
        },
        ivory: {
          50: '#FCFBF9',
          100: '#FAF8F5',
          200: '#F4EFEB',
          300: '#EAE2DA',
          400: '#DCD1C5',
          500: '#BDB0A2',
        },
        charcoal: {
          900: '#141413',
          800: '#1F1E1D',
          700: '#2D2C2A',
          600: '#454340',
          500: '#63605B',
          400: '#8A8680',
          300: '#B8B3AB',
          200: '#DDD8D0',
          100: '#EFECE6',
        },
        academic: {
          navy: '#1A2938',
          slate: '#36495A',
          terracotta: '#A85338',
          terracottaLight: '#F7EDE8',
          sage: '#3B604A',
          sageLight: '#ECF4EE',
          ochre: '#8C5E1E',
          ochreLight: '#FBF4E8',
          wine: '#803248',
          wineLight: '#F8ECF0',
          stone: '#595652',
        },
      },
      fontFamily: {
        serif: ['Charter', 'Newsreader', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(28, 25, 23, 0.05), 0 1px 2px rgba(28, 25, 23, 0.03)',
        'card-hover': '0 4px 12px rgba(28, 25, 23, 0.08), 0 2px 4px rgba(28, 25, 23, 0.04)',
        'drawer': '-4px 0 24px rgba(28, 25, 23, 0.12)',
      },
    },
  },
  plugins: [],
};
