
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
					foreground: 'hsl(var(--primary-foreground))'
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
					foreground: 'hsl(var(--accent-foreground))'
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
				// Sanatan Dharma inspired colors - updated with more serene tones
				saffron: {
					50: '#fff8eb',
					100: '#ffefd0',
					200: '#ffdda1',
					300: '#ffc666',
					400: '#ffb033',
					500: '#f99417',
					600: '#e6790d',
					700: '#bf5c0c',
					800: '#9a4912',
					900: '#7d3d14',
				},
				maroon: {
					50: '#fdf2f7',
					100: '#fce7f1',
					200: '#fad0e3',
					300: '#f7aac9',
					400: '#f074a6',
					500: '#e74a81',
					600: '#d22a60',
					700: '#b01f4b',
					800: '#931d41',
					900: '#7d1c3b',
				},
				kumkum: {
					50: '#fff1f1',
					100: '#ffe1e1',
					200: '#ffc7c7',
					300: '#ffa0a0',
					400: '#ff7070',
					500: '#ff4d4d',
					600: '#e12c2c',
					700: '#bd2020',
					800: '#9c1e1e',
					900: '#821f1f',
				},
				gold: {
					50: '#fdfaeb',
					100: '#fbf5d5',
					200: '#f7ecaa',
					300: '#f2dc74',
					400: '#ecc946',
					500: '#e2b52a',
					600: '#c99120',
					700: '#a6701e',
					800: '#885920',
					900: '#724a1f',
				},
				earth: {
					50: '#f9f6f3',
					100: '#f3ede7',
					200: '#e8ddcc',
					300: '#d8c9ae',
					400: '#c2ac88',
					500: '#ab916c',
					600: '#9c7d59',
					700: '#81654a',
					800: '#6a533f',
					900: '#594736',
				},
				// New calming colors
				sage: {
					50: '#f1f4f0',
					100: '#e2e9df',
					200: '#c5d4c0',
					300: '#a3b99c',
					400: '#829c79',
					500: '#69815f',
					600: '#54674c',
					700: '#445040',
					800: '#394237',
					900: '#2f372e',
				},
				sky: {
					50: '#f0f7fc',
					100: '#ddecf8',
					200: '#c0ddf3',
					300: '#92c5ea',
					400: '#62a8dd',
					500: '#4188c7',
					600: '#366daa',
					700: '#2e5989',
					800: '#2b4b70',
					900: '#28405d',
				},
				lavender: {
					50: '#f4f1fa',
					100: '#ebe5f5',
					200: '#d8ccea',
					300: '#beacdc',
					400: '#a285ca',
					500: '#8c68b8',
					600: '#7852a3',
					700: '#644386',
					800: '#53396e',
					900: '#47325a',
				}
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
