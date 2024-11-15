/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "#121212",
        bgSecondary: "#379777",
        // bgSecondary: "#83b28d",
        fontColor: "#FCFCFC",
      },
      fontFamily: {
        pRegular: ['Poppins-Regular'],
        p500: ['Poppins-Medium500'],
        p600: ['Poppins-SemiBold600'],
        p700: ['Poppins-Bold700']
      },
      fontSize: {
        '2xs': '0.875rem',
        'xs': '0.9375rem',
        'sm': '1rem',      // Default
        'md': '1.125rem',
        'lg': '1.25rem',
        'xl': '1.5625rem',
        '2xl': '2.1875rem',
        '3xl': '2.5rem',
        '4xl': '3.125rem',
        '5xl': '3.75rem',
      },
      
    },
  },
  plugins: [],
}