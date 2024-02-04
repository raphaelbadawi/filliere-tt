import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary-rgb))",
        accent: "rgb(var(--accent-rgb))",
        foreground: "rgb(var(--foreground-rgb))",
        background: "rgb(var(--background-rgb))",
        backlight: "rgb(var(--background-light-rgb))",
      },
      maxWidth: {
        "1/2": "50%",
      },
      animation: {
        typewriter: "typewriter 2s steps(var(--text-length)) forwards",
        caret:
          "typewriter 2s steps(var(--text-length)) forwards, blink 1s steps(var(--text-length)) infinite 2s",
      },
      keyframes: {
        typewriter: {
          to: {
            left: "calc(100% + 0.05em)",
          },
        },
        blink: {
          "0%": {
            opacity: "0",
          },
          "0.1%": {
            opacity: "1",
          },
          "50%": {
            opacity: "1",
          },
          "50.1%": {
            opacity: "0",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
