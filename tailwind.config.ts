
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					50: '#FEF3EF',
					100: '#FDE6DE',
					200: '#FBCBBA',
					300: '#F9AF96',
					400: '#F68D65',
					500: '#F26B34',
					600: '#E0502A',
					700: '#B93D1E',
					800: '#932F18',
					900: '#6D2312',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					success: '#4CAF50',
					info: '#2196F3',
					warning: '#FF9800',
					error: '#F44336',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Background Colors
				backgroundCustom: {
					DEFAULT: '#FCFAF7',
					card: '#FFFFFF',
				},
				// Text Colors
				text: {
					primary: '#333333',
					secondary: '#777777',
					muted: '#999999',
				},
				// Border and Divider Colors
				borderCustom: {
					DEFAULT: '#E0E0E0',
					light: '#F0F0F0',
				},
				// Dark theme backgrounds
				dark: {
					DEFAULT: '#2B2226',
					card: '#3D3235',
					hover: '#4A3E42',
					active: '#574951',
					border: '#413842',
					muted: '#2F262A',
					elevation: {
						1: 'rgba(0, 0, 0, 0.05)',
						2: 'rgba(0, 0, 0, 0.07)',
						3: 'rgba(0, 0, 0, 0.09)',
					},
				},
				// Dark theme text colors
				darkText: {
					primary: '#FFFFFF',
					secondary: 'rgba(255, 255, 255, 0.7)',
					muted: 'rgba(255, 255, 255, 0.5)',
					disabled: 'rgba(255, 255, 255, 0.38)',
				},
			},
			fontFamily: {
				sans: ['Noto Serif Devanagari', 'serif'],
				serif: ['Noto Serif Devanagari', 'serif'],
				sanskrit: ['Noto Serif Devanagari', 'serif'],
				devanagari: ['Noto Serif Devanagari', 'serif'],
				hindi: ['Noto Serif Devanagari', 'serif'],
				heading: ['Noto Serif Devanagari', 'serif'],
				display: ['Noto Serif Devanagari', 'serif'],
				body: ['Noto Serif Devanagari', 'serif']
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
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'page-transition': {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-up': 'fade-up 0.6s ease-out',
				'page-transition': 'page-transition 0.5s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
