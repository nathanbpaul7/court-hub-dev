import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    mode: 'jit',
    extend: {
      backgroundImage: (theme) => ({
        'gradient-opacity':
          'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
      }),
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      height: {
        '14.5': '60px',
      },
      minHeight: {
        cardhsm: '388px',
        cardhmd: '700px',
        cardhlg: '800px',
        cardhmbsm: '440px',
        cardhmbmd: '500px',
      },
      maxHeight: {
        filterfill: 'calc(100vh - 120px)',
        cardhsm: '388px',
        cardhmd: '700px',
        cardhlg: '800px',
        cardhmbsm: '440px',
        cardhmbmd: '500px',
      },
      minWidth: {
        cardwsm: '500px',
        cardwmb: '345px',
      },
      maxWidth: {
        cardwsm: '500px',
        cardwmb: '345px',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      colors: {
        highlight: {
          green: '#DBF2EE', // pill green and background hihglihgt green
          red: '#FFE4E4', // badge red
        },
        green: {
          100: '#DBF2EE',
          logo: '#37756C', // this is mina's lighter version of logo color from ryan
          badge: '#ECFFFC', // lighter green for home court badge
          border: '#CCDBD8', // border color
        },
        gray: {
          50: '#F8F8F8',
          100: '#F8F8F8', // warmer gray for background of containers
          200: '#F3F3F3',
        },
        yellow: {
          logo: '#DDE56A',
          100: '#639A90',
          50: '#A4CBC2',
        },
        red: {
          500: '#963636',
        },
        blue: {
          400: '#4CAF50',
          500: '#28534C',
          600: '#28534C', // this is original ryan logo dark green
          // '#2E7D32',
        },
      },
      screens: {
        sortbreak: '1080px',
        sortbreakmd: '950px',
        sortbreaksm: '806px',
        newcard: '523px',
        sortbreakxsm: '420px',
        tiny: '407px',
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
