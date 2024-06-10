/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Barlow: ["Barlow", "sans-serif"],
        RiftSoft: ["Rift Soft", "sans-serif"],
      },
    },
  },
  plugins: [],
}

