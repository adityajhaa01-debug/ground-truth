/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#FFFFFF",
        paper: "#F7F4FD",
        hairline: "#E3DCF5",
        ink: "#17112B",
        muted: "#5E5675",
        primaryPurple: "#5A2FC2",
        deepPurple: "#36178A",
        lilacTint: "#E9E2FA",
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "serif"],
        body: ["var(--font-newsreader)", "serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0px",
        sm: "0px",
        md: "2px",
        lg: "2px",
        xl: "2px",
        "2xl": "2px",
      },
    },
  },
  plugins: [],
};
