import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: () => ({
        "hero-gradient": "url('/linear-gradient.png')",
      }),
      colors: {
        "text-primary": "#051731",
        accent: "#FB6257",
        fraction: "#3A63FF",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
