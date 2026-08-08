/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F7F8',
        surface: '#FFFFFF',
        border: '#E2E3E7',
        'text-primary': '#1C1D21',
        'text-secondary': '#6B6D76',
        primary: '#6C3FC5',
        'primary-hover': '#5A34A6',
        success: '#2E7D5B',
        'success-light': '#E8F5F0',
        warning: '#B8792E',
        'warning-light': '#FFF4E6',
        danger: '#C13F3F',
        'danger-light': '#FDEAEA',
        info: '#2E6BB8',
        'info-light': '#E8F1FA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'table': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      spacing: {
        '4.5': '1.125rem',
      },
      borderRadius: {
        DEFAULT: '6px',
      },
    },
  },
  plugins: [],
}
