
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
					50: 'hsl(21, 100%, 96%)',
					100: 'hsl(21, 100%, 91%)',
					200: 'hsl(21, 100%, 82%)',
					300: 'hsl(21, 100%, 73%)',
					400: 'hsl(21, 100%, 64%)',
					500: 'hsl(21, 100%, 55%)',
					600: 'hsl(21, 100%, 45%)',
					700: 'hsl(21, 100%, 37%)',
					800: 'hsl(21, 100%, 30%)',
					900: 'hsl(21, 100%, 25%)',
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
					success: 'hsl(142, 76%, 36%)',
					info: 'hsl(210, 100%, 50%)',
					warning: 'hsl(36, 100%, 50%)',
					error: 'hsl(0, 84%, 60%)',
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
					DEFAULT: 'hsl(40, 55%, 98%)',
					card: 'hsl(0, 0%, 100%)',
				},
				// Text Colors
				text: {
					primary: 'hsl(24, 25%, 16%)',
					secondary: 'hsl(24, 20%, 32%)',
					muted: 'hsl(24, 15%, 48%)',
				},
				// Border and Divider Colors
				borderCustom: {
					DEFAULT: 'hsl(30, 20%, 87%)',
					light: 'hsl(30, 25%, 94%)',
				},
				// Dark theme backgrounds
				dark: {
					DEFAULT: 'hsl(27, 18%, 9%)',
					card: 'hsl(27, 15%, 15%)',
					hover: 'hsl(27, 12%, 20%)',
					active: 'hsl(27, 10%, 25%)',
					border: 'hsl(27, 8%, 18%)',
					muted: 'hsl(27, 10%, 12%)',
					elevation: {
						1: 'hsla(0, 0%, 0%, 0.05)',
						2: 'hsla(0, 0%, 0%, 0.07)',
						3: 'hsla(0, 0%, 0%, 0.09)',
					},
				},
				// Dark theme text colors
				darkText: {
					primary: 'hsl(30, 30%, 96%)',
					secondary: 'hsla(30, 25%, 96%, 0.85)',
					muted: 'hsla(30, 20%, 96%, 0.7)',
					disabled: 'hsla(30, 15%, 96%, 0.5)',
				},
				// Sanatan Dharma inspired colors
				saffron: {
					50: 'hsl(35, 100%, 97%)',
					100: 'hsl(35, 100%, 92%)',
					200: 'hsl(35, 100%, 85%)',
					300: 'hsl(35, 100%, 75%)',
					400: 'hsl(35, 100%, 65%)',
					500: 'hsl(35, 100%, 55%)',
					600: 'hsl(35, 100%, 45%)',
					700: 'hsl(35, 100%, 36%)',
					800: 'hsl(35, 100%, 28%)',
					900: 'hsl(35, 100%, 20%)',
				},
				maroon: {
					50: 'hsl(340, 80%, 95%)',
					100: 'hsl(340, 75%, 90%)',
					200: 'hsl(340, 70%, 80%)',
					300: 'hsl(340, 65%, 70%)',
					400: 'hsl(340, 60%, 60%)',
					500: 'hsl(340, 70%, 45%)',
					600: 'hsl(340, 75%, 35%)',
					700: 'hsl(340, 80%, 25%)',
					800: 'hsl(340, 85%, 15%)',
					900: 'hsl(340, 90%, 10%)',
				},
				earth: {
					50: 'hsl(30, 40%, 95%)',
					100: 'hsl(30, 35%, 90%)',
					200: 'hsl(30, 30%, 80%)',
					300: 'hsl(30, 25%, 70%)',
					400: 'hsl(30, 25%, 60%)',
					500: 'hsl(30, 35%, 45%)',
					600: 'hsl(30, 40%, 35%)',
					700: 'hsl(30, 45%, 25%)',
					800: 'hsl(30, 50%, 15%)',
					900: 'hsl(30, 55%, 10%)',
				},
				ganges: {
					50: 'hsl(210, 100%, 97%)',
					100: 'hsl(210, 100%, 92%)',
					200: 'hsl(210, 100%, 85%)',
					300: 'hsl(210, 98%, 75%)',
					400: 'hsl(210, 95%, 60%)',
					500: 'hsl(210, 100%, 50%)',
					600: 'hsl(210, 100%, 40%)',
					700: 'hsl(210, 100%, 32%)',
					800: 'hsl(210, 100%, 25%)',
					900: 'hsl(210, 100%, 20%)',
				},
				jasmine: {
					50: 'hsl(60, 100%, 97%)',
					100: 'hsl(60, 100%, 92%)',
					200: 'hsl(60, 90%, 85%)',
					300: 'hsl(60, 90%, 75%)',
					400: 'hsl(60, 90%, 65%)',
					500: 'hsl(60, 90%, 55%)',
					600: 'hsl(60, 90%, 45%)',
					700: 'hsl(60, 90%, 35%)',
					800: 'hsl(60, 90%, 25%)',
					900: 'hsl(60, 90%, 15%)',
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
