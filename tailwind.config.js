/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07111f',
        midnight: '#0b1730',
        solar: '#ffc83d',
        amberglow: '#ff8a1d',
        mint: '#2dd4bf',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 70px rgba(255, 165, 0, 0.2)',
        glass: '0 24px 80px rgba(8, 17, 35, 0.16)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 200, 61, 0.36)' },
          '50%': { boxShadow: '0 0 0 18px rgba(255, 200, 61, 0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        orbit: 'orbit 24s linear infinite',
        shimmer: 'shimmer 5s linear infinite',
        pulseGlow: 'pulseGlow 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
