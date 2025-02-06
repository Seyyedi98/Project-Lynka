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
        secondaryBg: "hsl(var(--secondaryBg))",
        iconLight: "hsl(var(--iconLight))",
        textLight: "hsl(var(--textLight))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        button: {
          DEFAULT: "hsl(var(--button))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          light: "hsl(var(--card-light))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },

      boxShadow: {
        button: "0 2px 5px rgba(0, 0, 0, 0.2), 0 1px 10px rgba(0, 0, 0, 0.1)",
        card: "0 4px 15px rgba(0, 0, 0, 0.3)",
        popover: "0 3px 6px rgba(0, 0, 0, 0.1)",
        primary: "0 1px 6px rgba(0, 0, 0, 0.1)",
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
            transform: "translateX(2rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0rem)",
          },
        },
        "fade-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(-2rem)",
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
