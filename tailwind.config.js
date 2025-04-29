/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Habilita o modo escuro baseado em classes
  theme: {
    fontFamily: {
      sans: ['"Open Sans"'],
      handwriting: ["Caveat"],
      headline: ["Poppins"],
    },
    extend: {
      colors: {
        // Cores personalizadas para o tema claro
        primary: {
          light: '#3B82F6',
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
        },
        // Cores personalizadas para o tema escuro (podem ser acessadas em dark:bg-primary-dark)
        dark: {
          bg: '#121212',
          card: '#1E1E1E',
          accent: '#3B82F6',
          text: '#E5E7EB',
        },
      },
    },
  },
  plugins: [],
}
