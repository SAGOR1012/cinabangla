/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Taken from the China Bangla Power Tech logo wordmark
        brand: { red: "#E31B1F", reddark: "#B81216", blue: "#0A4AA6", bluedark: "#083A82", bluelight: "#EAF1FB" },
        ink: "#15171B",
        mist: "#F4F5F7",
        line: "#E2E5EA",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: { DEFAULT: "4px", md: "4px", lg: "6px" },
      boxShadow: {
        card: "0 1px 2px rgba(10,20,40,.06)",
        lift: "0 10px 30px -12px rgba(10,20,40,.25)",
      },
    },
  },
  plugins: [],
};
