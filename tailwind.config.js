/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'surface-container-high': '#272b2b',
        'secondary-fixed': '#ffdad8',
        'surface-container': '#1c2020',
        'tertiary-fixed-dim': '#ffb955',
        'on-tertiary-fixed': '#291800',
        'secondary-fixed-dim': '#ffb3b0',
        'inverse-surface': '#e0e3e2',
        'surface-dim': '#101414',
        'on-surface-variant': '#bacac5',
        'primary-container': '#2dd4bf',
        'tertiary': '#ffd39a',
        'tertiary-fixed': '#ffddb4',
        'surface-bright': '#363a3a',
        'on-background': '#e0e3e2',
        'surface-container-highest': '#313535',
        'tertiary-container': '#feae2c',
        'inverse-primary': '#006b5f',
        'error-container': '#93000a',
        'on-primary-container': '#00574d',
        'secondary': '#ffb3b0',
        'outline-variant': '#3c4a46',
        'outline': '#859490',
        'background': '#101414',
        'on-surface': '#e0e3e2',
        'surface-container-lowest': '#0b0f0f',
        'error': '#ffb4ab',
        'surface-container-low': '#181c1c',
        'primary': '#57f1db',
        'surface': '#101414'
      },
      fontFamily: {
        sans: ['Public Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
};
