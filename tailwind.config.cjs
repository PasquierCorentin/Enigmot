/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        flip: 'flip 1s ease',
        shake: 'shake 1s ease',
      },
      animationDelay: {
        0: '0ms',
        1: '500ms',
        2: '1000ms',
        3: '1500ms',
        4: '2000ms',
      },
      transitionDelay: {
        0: '50ms',
        1: '550ms',
        2: '1050ms',
        3: '1550ms',
        4: '2050ms',
      },
      keyframes: {
        flip: {
          '0%': {
            transform: 'perspective(400px) rotateX(0)',
            animationTimingFunction: 'ease-out',
          },
          '40%': {
            transform: 'perspective(400px) translateZ(150px) rotateX(170deg)',
            animationTimingFunction: 'ease-out',
          },
          '50%': {
            transform:
              'perspective(400px) translateZ(150px) rotateX(190deg) scale(1)',
            animationTimingFunction: 'ease-in',
          },
          '80%': {
            transform: 'perspective(400px) rotateX(360deg) scale(.95)',
            animationTimingFunction: 'ease-in',
          },
          '100%': {
            transform: 'perspective(400px) scale(1)',
            animationTimingFunction: 'ease-in',
          },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
      },
    },
  },
  variants: {
    animationDelay: ['responsive', 'hover'],
  },
  plugins: [require('tailwindcss-animation-delay')],
}
