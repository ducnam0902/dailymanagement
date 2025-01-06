import type { Config } from "tailwindcss";

export default {
  content: [
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      boxShadow: {
        "2xl": "0 0 0 0.2rem #AAE2BE",
      },
      colors: {
        primary: "#75D3C3",
        secondary: "#AAE2BE",
      },
    },
  },
  plugins: [],
} satisfies Config;
