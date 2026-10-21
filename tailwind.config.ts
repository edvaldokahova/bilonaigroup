import type { Config } from "tailwindcss";

// Identidade A Bilonai Group: noite, creme e ouro.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: { DEFAULT: "#0A0B0D", 2: "#111317", 3: "#181B21", 4: "#20242C" },
        cream: { DEFAULT: "#F4EFE6", dim: "#A9A396" },
        gold: { light: "#F3D77A", DEFAULT: "#D4A936", dark: "#A67C1A" },
        line: "rgba(244,239,230,0.10)",
        wa: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      opacity: { 15: ".15", 35: ".35", 45: ".45", 55: ".55", 65: ".65", 85: ".85" },
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(14px)" }, "100%": { opacity: "1", transform: "none" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        shine: { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
        spin3: { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        drip: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(200%)" } },
        screen: { "0%,18%": { transform: "translateY(0)" }, "50%,68%": { transform: "translateY(-50%)" }, "100%": { transform: "translateY(0)" } },
      },
      animation: {
        rise: "rise .6s cubic-bezier(.2,.7,.2,1) both",
        float: "float 7s ease-in-out infinite",
        shine: "shine 6s linear infinite",
        spin3: "spin3 14s linear infinite",
        "spin3-rev": "spin3 22s linear infinite reverse",
        marquee: "marquee 40s linear infinite",
        drip: "drip 2.2s cubic-bezier(.6,0,.4,1) infinite",
        screen: "screen 16s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
