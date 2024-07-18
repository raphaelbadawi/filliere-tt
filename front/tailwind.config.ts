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
        darkPrimary: "rgb(var(--dark-primary-rgb))",
        darkAccent: "rgb(var(--dark-accent-rgb))",
        foreground: "rgb(var(--foreground-rgb))",
        background: "rgb(var(--background-rgb))",
        backlight: "rgb(var(--background-light-rgb))",
      },
      boxShadow: {
        'reverse': '0 -10px 15px 3px rgba(var(--accent-rgb), 0.3)',
      },
      width: {
        "200": "37.5rem",
      },
      maxWidth: {
        "1/2": "50%",
      },
      minWidth: {
        "screen": "100vw",
      },
      animation: {
        "gradient-text": "gradient-text 6s ease infinite",
      },
      keyframes: {
        "gradient-text": {
          "0%": {
            "background-size": "1000% 1000%",
            "background-position": "left",
          },
          "20%": {
            "background-size": "1000% 1000%",
            "background-position": "center",
          },
          "80%": {
            "background-size": "1000% 1000%",
            "background-position": "center",
          },
          "100%": {
            "background-size": "1000% 1000%",
            "background-position": "left",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
