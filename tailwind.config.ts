import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "kuvitus-light-text": "#fff",
        "kuvitus-light-dark": "#000",
        "kuvitus-primary-blue": "#2B94E0",
        "kuvitus-secondary-blue": "#B4D6EE",
        "kuvitus-background": "#F2F2FF",
        "kuvitus-completed": "#12B419",
        "kuvitus-uncomplete": "#CE3737",
        "kuvitus-pending": "#ABB1AB",
        "kuvitus-sub-background": "#D9D9D9",
      }
    },
  },
  plugins: [],
};
export default config;
