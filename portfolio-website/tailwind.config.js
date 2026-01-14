/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        gold: "#D4AF37",
        "deep-blue": "#1f3b73",
        "night": "#0A0A0A",
        "night-100": "#0F0F0F",
        "night-200": "#1A1A1A",
        "slate-950": "#0B1221",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35)",
        glow: "0 0 20px rgba(59,130,246,0.25)",
      },
    },
  },
  plugins: [],
}
