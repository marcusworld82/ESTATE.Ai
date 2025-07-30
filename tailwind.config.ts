import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: '222.2 84% 4.9%',
  			foreground: '210 40% 98%',
  			card: {
  				DEFAULT: '222.2 84% 4.9%',
  				foreground: '210 40% 98%'
  			},
  			popover: {
  				DEFAULT: '222.2 84% 4.9%',
  				foreground: '210 40% 98%'
  			},
  			primary: {
  				DEFAULT: '217.2 91.2% 59.8%',
  				foreground: '222.2 84% 4.9%'
  			},
  			secondary: {
  				DEFAULT: '217.2 32.6% 17.5%',
  				foreground: '210 40% 98%'
  			},
  			muted: {
  				DEFAULT: '217.2 32.6% 17.5%',
  				foreground: '215 20.2% 65.1%'
  			},
  			accent: {
  				DEFAULT: '217.2 32.6% 17.5%',
  				foreground: '210 40% 98%'
  			},
  			destructive: {
  				DEFAULT: '0 62.8% 30.6%',
  				foreground: '210 40% 98%'
  			},
  			border: '217.2 32.6% 17.5%',
  			input: '217.2 32.6% 17.5%',
  			ring: '224.3 76.3% 48%',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: '222.2 84% 4.9%',
  				foreground: '210 40% 98%',
  				primary: '217.2 91.2% 59.8%',
  				'primary-foreground': '222.2 84% 4.9%',
  				accent: '217.2 32.6% 17.5%',
  				'accent-foreground': '210 40% 98%',
  				border: '217.2 32.6% 17.5%',
  				ring: '224.3 76.3% 48%'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
