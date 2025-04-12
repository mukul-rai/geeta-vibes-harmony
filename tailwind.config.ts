
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
					50: 'hsl(28, 100%, 97%)',
					100: 'hsl(28, 95%, 94%)',
					200: 'hsl(28, 90%, 87%)',
					300: 'hsl(28, 85%, 80%)',
					400: 'hsl(28, 80%, 70%)',
					500: 'hsl(28, 75%, 60%)',
					600: 'hsl(28, 70%, 50%)',
					700: 'hsl(28, 65%, 40%)',
					800: 'hsl(28, 60%, 30%)',
					900: 'hsl(28, 55%, 20%)',
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
				backgroundCustom: {
					DEFAULT: 'hsl(36, 50%, 98%)',
					card: 'hsl(0, 0%, 100%)',
				},
				text: {
					primary: 'hsl(27, 30%, 16%)',
					secondary: 'hsl(27, 25%, 32%)',
					muted: 'hsl(27, 20%, 48%)',
				},
				borderCustom: {
					DEFAULT: 'hsl(27, 30%, 87%)',
					light: 'hsl(27, 35%, 94%)',
				},
				dark: {
					DEFAULT: 'hsl(27, 20%, 9%)',
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
				darkText: {
					primary: 'hsl(27, 30%, 96%)',
					secondary: 'hsla(27, 25%, 96%, 0.85)',
					muted: 'hsla(27, 20%, 96%, 0.7)',
					disabled: 'hsla(27, 15%, 96%, 0.5)',
				},
				saffron: {
					50: 'hsl(36, 100%, 97%)',
					100: 'hsl(36, 100%, 94%)',
					200: 'hsl(36, 100%, 88%)',
					300: 'hsl(36, 100%, 82%)',
					400: 'hsl(36, 100%, 72%)',
					500: 'hsl(36, 100%, 62%)',
					600: 'hsl(36, 90%, 52%)',
					700: 'hsl(36, 85%, 42%)',
					800: 'hsl(36, 80%, 32%)',
					900: 'hsl(36, 75%, 22%)',
				},
				maroon: {
					50: 'hsl(345, 80%, 95%)',
					100: 'hsl(345, 75%, 90%)',
					200: 'hsl(345, 70%, 80%)',
					300: 'hsl(345, 65%, 70%)',
					400: 'hsl(345, 60%, 60%)',
					500: 'hsl(345, 70%, 45%)',
					600: 'hsl(345, 75%, 35%)',
					700: 'hsl(345, 80%, 25%)',
					800: 'hsl(345, 85%, 15%)',
					900: 'hsl(345, 90%, 10%)',
				},
				earth: {
					50: 'hsl(27, 40%, 97%)',
					100: 'hsl(27, 35%, 92%)',
					200: 'hsl(27, 30%, 82%)',
					300: 'hsl(27, 25%, 72%)',
					400: 'hsl(27, 25%, 62%)',
					500: 'hsl(27, 35%, 48%)',
					600: 'hsl(27, 40%, 38%)',
					700: 'hsl(27, 45%, 28%)',
					800: 'hsl(27, 50%, 18%)',
					900: 'hsl(27, 55%, 12%)',
					950: 'hsl(27, 60%, 6%)',
				},
				ganges: {
					50: 'hsl(210, 100%, 97%)',
					100: 'hsl(210, 100%, 94%)',
					200: 'hsl(210, 100%, 87%)',
					300: 'hsl(210, 95%, 77%)',
					400: 'hsl(210, 90%, 67%)',
					500: 'hsl(210, 85%, 57%)',
					600: 'hsl(210, 90%, 47%)',
					700: 'hsl(210, 95%, 37%)',
					800: 'hsl(210, 100%, 27%)',
					900: 'hsl(210, 100%, 20%)',
				},
				jasmine: {
					50: 'hsl(60, 100%, 97%)',
					100: 'hsl(60, 100%, 94%)',
					200: 'hsl(60, 95%, 87%)',
					300: 'hsl(60, 90%, 80%)',
					400: 'hsl(60, 85%, 70%)',
					500: 'hsl(60, 80%, 60%)',
					600: 'hsl(60, 75%, 50%)',
					700: 'hsl(60, 80%, 40%)',
					800: 'hsl(60, 85%, 30%)',
					900: 'hsl(60, 90%, 20%)',
				}
			},
			fontFamily: {
				sans: ['Noto Sans', 'Noto Sans Devanagari', 'Mukta', 'sans-serif'],
				serif: ['Noto Serif Devanagari', 'serif'],
				sanskrit: ['Noto Serif Devanagari', 'serif'],
				devanagari: ['Noto Sans Devanagari', 'Noto Serif Devanagari', 'serif'],
				hindi: ['Noto Sans Devanagari', 'Mukta', 'sans-serif'],
				heading: ['Noto Serif Devanagari', 'serif'],
				display: ['Noto Serif Devanagari', 'serif'],
				body: ['Noto Sans', 'Noto Sans Devanagari', 'Mukta', 'sans-serif']
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
				},
				'gentle-pulse': {
					'0%, 100%': { 
						opacity: '0.85',
						transform: 'scale(1)'
					},
					'50%': { 
						opacity: '1',
						transform: 'scale(1.02)'
					}
				},
				'gentle-float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-4px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-up': 'fade-up 0.6s ease-out',
				'page-transition': 'page-transition 0.5s ease-out',
				'gentle-pulse': 'gentle-pulse 3s infinite ease-in-out',
				'gentle-float': 'gentle-float 4s infinite ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
