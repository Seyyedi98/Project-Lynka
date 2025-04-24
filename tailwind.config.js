const { default: Tab } = require("rsuite/esm/Tabs/Tab");
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
      backdropBlur: {
        xs: "4px",
        sm: "8px",
        md: "12px",
      },
      colors: {
        text: {
          DEFAULT: "hsl(var(--text))",
          light: "hsl(var(--textLight))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          gradient_from: "hsl(var(--background-gradient-from))",
          gradient_to: "hsl(var(--background-gradient-to))",
        },
        secondaryBg: "hsl(var(--secondaryBg))",
        foreground: "hsl(var(--foreground))",
        icon: {
          DEFAULT: "hsl(var(--icon))",
          light: "hsl(var(--icon-light))",
        },
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
          hover: "hsl(var(--primary-hover))",
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
        input: {
          DEFAULT: "hsl(var(--input))",
          blue: "hsl(var(--input-blue))",
        },
        tab: {
          DEFAULT: "hsl(var(--tab))",
          blue: "hsl(var(--tab-active))",
        },
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
      backgroundImage: {
        "main-gradient":
          "linear-gradient(-45deg,hsl(var(--background-gradient-from)) 0%,hsl(var(--background-gradient-from)) 33%, hsl(var(--background-gradient-to)) 100%)",
        "main-gradient-2":
          // "linear-gradient(-70deg,hsl(var(--background-gradient-from)) 0%,hsl(var(--background-gradient-from)) 10%, hsl(var(--background-gradient-to)) 100%)",
          "linear-gradient(-70deg,hsl(var(--background-gradient-to)) 0%,hsl(var(--background-gradient-to)) 10%, hsl(var(--background-gradient-from)) 100%)",
        "main-gradient-light":
          "linear-gradient(-45deg,hsl(var(--primary)) 0%,hsl(var(--primary)) 33%, hsl(var(--secondary)) 100%)",
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
        "fade-out": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "",
          },
        },
        "fade-in": {
          "100%": {
            opacity: "0",
          },
          "90%": {
            opacity: "1",
          },
          "0%": {
            opacity: "1",
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
          "100%": {
            opacity: "0",
            transform: "translateX(2rem)",
          },
          "0%": {
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
        bgMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      gridTemplateColumns: {
        "auto-fill-100": "repeat(auto-fill, minmax(320px, 1fr))",
        "auto-fit-100": "repeat(auto-fit, minmax(320px, 1fr))",
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        "fade-left": "fade-left .7s ease",
        "fade-in": "fade-in 1s forwards",
        "fade-out": "fade-oue .7s ease",
        "fade-right": "fade-right .7s ease",
        "fade-up": "fade-up 0.5s ease-out forwards",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bg-move": "bgMove 7s ease-in-out infinite",
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
