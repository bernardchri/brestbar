import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient': 'linear-gradient(132deg, rgba(4,194,235,1) 0%, rgba(92,98,254,1) 71%)',
       
      },
      colors: {
        "bg": "#1f2937",
        "gray-secondary": "#111827", 
        "bleu" : "rgba(4,194,235,1)",
      }
    },
  },
  plugins: [],
}
export default config
