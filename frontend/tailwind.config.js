/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tech-focused color palette
        'tech-blue': '#1560BD',
        'tech-blue-light': '#D2E4FA',
        'tech-blue-dark': '#11509D',
        'slate-blue': '#536878',
        'slate-blue-light': '#A5C9F5',
        'slate-blue-dark': '#465764',
        'dark-cyan': '#008B8B',
        'dark-cyan-light': '#83FFFF',
        'dark-cyan-dark': '#005C5C',
        // Neutrals
        'slate-50': '#F8FAFC',
        'slate-100': '#F1F5F9',
        'slate-200': '#E2E8F0',
        'slate-700': '#374151',
        'slate-800': '#1F2937',
        'slate-900': '#111827',
      },
      fontFamily: {
        'heading': ['Space Grotesk', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', '1rem'],
        'sm': ['0.875rem', '1.25rem'],
        'base': ['1rem', '1.5rem'],
        'lg': ['1.125rem', '1.75rem'],
        'xl': ['1.25rem', '1.75rem'],
        '2xl': ['1.5rem', '2rem'],
        '3xl': ['1.875rem', '2.25rem'],
        '4xl': ['2.25rem', '2.5rem'],
        '5xl': ['3rem', '1'],
        '6xl': ['3.75rem', '1'],
        '7xl': ['4.5rem', '1'],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.12)',
        'glass-xl': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'hover': '0 12px 36px rgba(21, 96, 189, 0.15)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.08)',
        'auth': '0 10px 40px rgba(21, 96, 189, 0.12)',
      },
      backdropBlur: {
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },
      borderRadius: {
        'xs': '0.375rem',
        'sm': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
