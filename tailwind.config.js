/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html',
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4436F8',
          50: '#F0F2FF',
          100: '#E1E5FF',
          200: '#C3CBFF',
          300: '#A5B1FF',
          400: '#8797FF',
          500: '#4436F8',
          600: '#3A2ED9',
          700: '#2F25BA',
          800: '#241C9B',
          900: '#1A137C',
          light: '#7C3AED',
        },
        background: {
          DEFAULT: '#FFD6E8',
          secondary: '#BFD4FF',
          tertiary: '#D8E3FF',
          gradient: 'linear-gradient(135deg, #FFD6E8 0%, #BFD4FF 50%, #D8E3FF 100%)',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#555555',
          tertiary: '#666666',
          muted: '#888888',
        },
        accent: {
          pink: '#FFD6E8',
          violet: '#BFD4FF',
          violetLight: '#D8E3FF',
          blue: '#4436F8',
        },
        gradient: {
          primary: 'linear-gradient(135deg, #4436F8 0%, #7C3AED 100%)',
          secondary: 'linear-gradient(135deg, #FFD6E8 0%, #BFD4FF 100%)',
          button: 'linear-gradient(135deg, #4436F8 0%, #7C3AED 100%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'DM Sans', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        dmSans: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display': ['2.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h1': ['2.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h2': ['1.875rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.5', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'medium': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'large': '0 16px 48px rgba(0, 0, 0, 0.16)',
        'glow': '0 0 32px rgba(68, 54, 248, 0.2)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4436F8 0%, #7C3AED 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #FFD6E8 0%, #BFD4FF 100%)',
        'gradient-background': 'linear-gradient(135deg, #FFD6E8 0%, #BFD4FF 50%, #D8E3FF 100%)',
        'gradient-button': 'linear-gradient(135deg, #4436F8 0%, #7C3AED 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'spin-slow': 'spin 10s linear infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': '0% 50%'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': '100% 50%'
          },
        },
      },
    },
  },
  plugins: [],
} 