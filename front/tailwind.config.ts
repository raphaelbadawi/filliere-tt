import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary-rgb))',
        accent: 'rgb(var(--accent-rgb))',
        foreground: 'rgb(var(--foreground-rgb))',
        background: 'rgb(var(--background-rgb))',
        backlight: 'rgb(var(--background-light-rgb))',
      },
    },
  },
  plugins: [],
}
export default config
