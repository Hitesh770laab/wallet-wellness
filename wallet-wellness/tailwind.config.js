/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        void: '#03020a',
        obsidian: '#0a0814',
        surface: '#110f1e',
        elevated: '#1a1730',
        border: '#2a2540',
        neon: {
          violet: '#7c3aed',
          purple: '#9333ea',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          pink: '#ec4899',
        },
      },
      backgroundImage: {
        'radial-void': 'radial-gradient(ellipse at center, #1a1730 0%, #03020a 70%)',
        'gradient-neon': 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        'gradient-aurora': 'linear-gradient(135deg, #7c3aed 0%, #9333ea 33%, #3b82f6 66%, #06b6d4 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-shift': 'gradient-shift 4s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      boxShadow: {
        'neon-violet': '0 0 30px rgba(124, 58, 237, 0.5)',
        'neon-blue': '0 0 30px rgba(59, 130, 246, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backdropBlur: {
        'glass': '20px',
      }
    },
  },
  plugins: [],
}
