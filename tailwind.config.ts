import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4f46e5",
          50: "#eae9fc",
          100: "#cac8f7",
          200: "#a7a3f2",
          300: "#847eed",
          400: "#6962e9",
          500: "#4f46e5",
          600: "#483fe2",
          700: "#3f37de",
          800: "#362fda",
          900: "#2620d3",
        },
      },
    },
  },
};
