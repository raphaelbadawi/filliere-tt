import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary-rgb))',
        accent: 'rgb(var(--accent-rgb))',
        secondary: 'rgb(var(--secondary-rgb))',
      },
    },
  },
  plugins: [],
}
export default config
