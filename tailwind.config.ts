import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          50: "#fdf8ef",
          100: "#faefd5",
          200: "#f4dcaa",
          300: "#edc474",
          400: "#e5a43c",
          500: "#d4891f",
          600: "#b8690f",
          700: "#a05410",
          800: "#824214",
          900: "#6b3713",
        },
        cream: {
          50: "#fefcf8",
          100: "#fdf8ef",
          200: "#faf0dd",
          300: "#f5e3c3",
        },
      },
    },
  },
  plugins: [],
};
export default config;
