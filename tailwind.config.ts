import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow : {
        'all-locked': '0 0 7px 2px rgb(253, 230, 138)',
        'all-unlocked': '0 0 7px 2px rgb(167, 243, 208)',
        'allx-locked': '0 0 10px 5px rgb(253, 230, 138)',
        'allx-unlocked': '0 0 10px 5px rgb(167, 243, 208)',
      },
    },
  },
  plugins: [],
}
export default config
