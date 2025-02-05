const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(255, 255, 255)",
        foreground: "rgb(10, 10, 10)",
        neutral: {
          50: "rgb(246, 246, 246)",
          100: "rgb(223, 223, 223)",
          200: "rgb(198, 198, 198)",
          300: "rgb(168, 168, 168)",
          400: "rgb(142, 142, 142)",
          500: "rgb(111, 111, 111)",
          600: "rgb(82, 82, 82)",
          700: "rgb(57, 57, 57)",
          800: "rgb(38, 38, 38)",
          900: "rgb(21, 21, 21)",
        },
        primary: {
          50: "rgb(245, 242, 255)",
          100: "rgb(229, 218, 255)",
          200: "rgb(208, 188, 255)",
          300: "rgb(185, 150, 255)",
          400: "rgb(165, 113, 255)",
          500: "rgb(145, 56, 254)",
          600: "rgb(115, 2, 213)",
          700: "rgb(81, 1, 154)",
          800: "rgb(55, 0, 108)",
          900: "rgb(34, 0, 70)",
          DEFAULT: "rgb(23, 23, 26)",
          foreground: "rgb(250, 250, 250)",
          gradient_from: "rgb(181, 93, 205)",
          gradient_to: "rgb(114, 78, 191)",
        },
        brand: {
          50: "rgb(252, 240, 254)",
          100: "rgb(241, 215, 247)",
          200: "rgb(230, 182, 241)",
          300: "rgb(218, 139, 233)",
          400: "rgb(207, 95, 226)",
          500: "rgb(170, 66, 187)",
          600: "rgb(127, 47, 140)",
          700: "rgb(90, 31, 100)",
          800: "rgb(62, 19, 69)",
          900: "rgb(38, 9, 43)",
        },
        info: {
          50: "rgb(222, 248, 255)",
          100: "rgb(150, 238, 252)",
          200: "rgb(89, 216, 234)",
          300: "rgb(0, 186, 204)",
          400: "rgb(0, 157, 172)",
          500: "rgb(0, 123, 136)",
          600: "rgb(0, 91, 101)",
          700: "rgb(0, 64, 71)",
          800: "rgb(0, 43, 48)",
          900: "rgb(0, 25, 28)",
        },
        success: {
          50: "rgb(225, 252, 202)",
          100: "rgb(189, 239, 132)",
          200: "rgb(162, 214, 102)",
          300: "rgb(135, 183, 74)",
          400: "rgb(111, 155, 49)",
          500: "rgb(89, 121, 49)",
          600: "rgb(65, 90, 35)",
          700: "rgb(44, 63, 22)",
          800: "rgb(28, 42, 12)",
          900: "rgb(15, 24, 5)",
        },
        warning: {
          50: "rgb(255, 246, 174)",
          100: "rgb(250, 223, 107)",
          200: "rgb(242, 191, 70)",
          300: "rgb(215, 158, 58)",
          400: "rgb(197, 127, 0)",
          500: "rgb(170, 91, 0)",
          600: "rgb(124, 69, 0)",
          700: "rgb(78, 52, 0)",
          800: "rgb(57, 33, 0)",
          900: "rgb(30, 20, 0)",
        },
        danger: {
          50: "rgb(254, 240, 240)",
          100: "rgb(253, 214, 213)",
          200: "rgb(252, 181, 177)",
          300: "rgb(240, 141, 136)",
          400: "rgb(255, 78, 61)",
          500: "rgb(200, 63, 50)",
          600: "rgb(150, 45, 35)",
          700: "rgb(107, 29, 22)",
          800: "rgb(74, 18, 12)",
          900: "rgb(47, 8, 5)",
        },
        card: {
          DEFAULT: "rgb(255, 255, 255)",
          foreground: "rgb(10, 10, 10)",
        },
        popover: {
          DEFAULT: "rgb(255, 255, 255)",
          foreground: "rgb(10, 10, 10)",
        },
        link: {
          hover: "rgb(68, 0, 214)",
        },
        secondary: {
          DEFAULT: "rgb(245, 245, 245)",
          foreground: "rgb(23, 23, 26)",
        },
        muted: {
          DEFAULT: "rgb(245, 245, 245)",
          foreground: "rgb(118, 118, 118)",
        },
        accent: {
          DEFAULT: "rgb(245, 245, 245)",
          foreground: "rgb(23, 23, 26)",
        },
        destructive: {
          DEFAULT: "rgb(224, 45, 45)",
          foreground: "rgb(250, 250, 250)",
        },
        border: "rgb(230, 230, 230)",
        input: "rgb(230, 230, 230)",
        ring: "rgb(10, 10, 10)",
        chart: {
          1: "rgb(247, 125, 63)",
          2: "rgb(37, 148, 133)",
          3: "rgb(61, 96, 122)",
          4: "rgb(205, 219, 95)",
          5: "rgb(221, 224, 71)",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(2rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0rem)",
          },
        },
        "fade-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(4rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0rem)",
          },
        },
        "fade-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(-4rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0rem)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      gridTemplateColumns: {
        "auto-fill-100": "repeat(auto-fill, minmax(320px, 1fr))",
        "auto-fit-100": "repeat(auto-fit, minmax(320px, 1fr))",
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        "fade-left": "fade-left .7s ease",
        "fade-right": "fade-right .7s ease",
        "fade-up": "fade-up 0.5s ease-out forwards",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}
