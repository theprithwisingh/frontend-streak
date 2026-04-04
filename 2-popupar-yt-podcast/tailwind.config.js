/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        electricBlue: "#0055FF",
        vibrantYellow: "#FFB800",
        hotMagenta: "#FF00A0",
        neonGreen: "#00FF00",
        pureBlack: "#000000",
        pureWhite: "#FFFFFF"
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      }
    },
  },
  plugins: [],
}
