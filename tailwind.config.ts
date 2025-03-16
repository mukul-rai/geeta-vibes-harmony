
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
					50: '#FFF8F0',
					100: '#FFECD8',
					200: '#FFD8B0',
					300: '#FFC389',
					400: '#FFAD61',
					500: '#FF963A',
					600: '#F57C00',
					700: '#CC6600',
					800: '#A35000',
					900: '#7A3D00',
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
					success: '#1DB954',
					info: '#2E7CF6',
					warning: '#FFC107',
					error: '#E53935',
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
					DEFAULT: '#FFF8F2',
					card: '#FFFFFF',
				},
				// Text Colors
				text: {
					primary: '#32281E',
					secondary: '#5D4D40',
					muted: '#8C7A6B',
				},
				// Border and Divider Colors
				borderCustom: {
					DEFAULT: '#E9DED5',
					light: '#F5F0EB',
				},
				// Dark theme backgrounds
				dark: {
					DEFAULT: '#1E1916',
					card: '#2D2520',
					hover: '#3D332C',
					active: '#4B3F36',
					border: '#352D26',
					muted: '#2A231D',
					elevation: {
						1: 'rgba(0, 0, 0, 0.05)',
						2: 'rgba(0, 0, 0, 0.07)',
						3: 'rgba(0, 0, 0, 0.09)',
					},
				},
				// Dark theme text colors
				darkText: {
					primary: '#FFF8F0',
					secondary: 'rgba(255, 248, 240, 0.8)',
					muted: 'rgba(255, 248, 240, 0.6)',
					disabled: 'rgba(255, 248, 240, 0.4)',
				},
				// Sanatan Dharma inspired colors
				saffron: {
					50: '#FFF8F0',
					100: '#FFECD8',
					200: '#FFD8B0',
					300: '#FFC389',
					400: '#FFAD61',
					500: '#FF963A',
					600: '#F57C00',
					700: '#CC6600',
					800: '#A35000',
					900: '#7A3D00',
				},
				maroon: {
					50: '#FBEAEF',
					100: '#F7D4DF',
					200: '#EEA9BE',
					300: '#E57F9E',
					400: '#DC547D',
					500: '#D32A5D',
					600: '#A9224A',
					700: '#7F1938',
					800: '#551125',
					900: '#2A0813',
				},
				earth: {
					50: '#F7F2ED',
					100: '#EFE5DB',
					200: '#DFCBB7',
					300: '#CFB193',
					400: '#BF976F',
					500: '#AF7D4B',
					600: '#8C643C',
					700: '#694B2D',
					800: '#46311E',
					900: '#23190F',
				},
				ganges: {
					50: '#F0F9FF',
					100: '#E0F2FE',
					200: '#B9E5FE',
					300: '#7CD4FD',
					400: '#36BFFA',
					500: '#0BA5EC',
					600: '#0284C7',
					700: '#036AA1',
					800: '#075985',
					900: '#0C4A6E',
				},
				jasmine: {
					50: '#FEFFF0',
					100: '#FEFFD8',
					200: '#FFFCB5',
					300: '#FFF88E',
					400: '#FFF56B',
					500: '#FFF03D',
					600: '#FFE000',
					700: '#CCAF00',
					800: '#997F00',
					900: '#664C00',
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
