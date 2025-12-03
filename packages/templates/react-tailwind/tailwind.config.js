/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        'primary-foreground': '#FFFFFF',
        secondary: '#10B981',
        'secondary-foreground': '#FFFFFF',
        danger: '#EF4444',
        'danger-foreground': '#FFFFFF',
        background: '#F3b4A6',
        foreground: '#1F2937',
        card: '#F9FAFB',
        'card-foreground': '#1F2937',
        border: '#E5E7EB',
        input: '#E5E7EB',
        ring: '#3B82F6',
        accent: '#F3F4F6',
        'accent-foreground': '#1F2937',
        destructive: '#EF4444',
        'destructive-foreground': '#FFFFFF',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}