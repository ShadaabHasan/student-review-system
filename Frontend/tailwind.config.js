// /** @type {import('tailwindcss').Config} */
// const defaultConfig = require("shadcn/ui/tailwind.config")

// module.exports = {
//   ...defaultConfig,
//   content: [
//     ...defaultConfig.content,
//     "./pages/**/*.{js,jsx}",
//     "./components/**/*.{js,jsx}",
//     "./app/**/*.{js,jsx}",
//     "./src/**/*.{js,jsx}",
//     "*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     ...defaultConfig.theme,
//     extend: {
//       ...defaultConfig.theme.extend,
//       colors: {
//         ...defaultConfig.theme.extend.colors,
//         border: "hsl(214.3 31.8% 91.4%)",
//         input: "hsl(214.3 31.8% 91.4%)",
//         ring: "hsl(222.2 84% 4.9%)",
//         background: "hsl(0 0% 100%)",
//         foreground: "hsl(222.2 84% 4.9%)",
//         primary: {
//           ...defaultConfig.theme.extend.colors.primary,
//           DEFAULT: "hsl(222.2 47.4% 11.2%)",
//           foreground: "hsl(210 40% 98%)",
//         },
//         secondary: {
//           ...defaultConfig.theme.extend.colors.secondary,
//           DEFAULT: "hsl(210 40% 96%)",
//           foreground: "hsl(222.2 84% 4.9%)",
//         },
//         destructive: {
//           ...defaultConfig.theme.extend.colors.destructive,
//           DEFAULT: "hsl(0 84.2% 60.2%)",
//           foreground: "hsl(210 40% 98%)",
//         },
//         muted: {
//           ...defaultConfig.theme.extend.colors.muted,
//           DEFAULT: "hsl(210 40% 96%)",
//           foreground: "hsl(215.4 16.3% 46.9%)",
//         },
//         accent: {
//           ...defaultConfig.theme.extend.colors.accent,
//           DEFAULT: "hsl(210 40% 96%)",
//           foreground: "hsl(222.2 84% 4.9%)",
//         },
//         popover: {
//           ...defaultConfig.theme.extend.colors.popover,
//           DEFAULT: "hsl(0 0% 100%)",
//           foreground: "hsl(222.2 84% 4.9%)",
//         },
//         card: {
//           ...defaultConfig.theme.extend.colors.card,
//           DEFAULT: "hsl(0 0% 100%)",
//           foreground: "hsl(222.2 84% 4.9%)",
//         },
//       },
//       borderRadius: {
//         ...defaultConfig.theme.extend.borderRadius,
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       keyframes: {
//         ...defaultConfig.theme.extend.keyframes,
//         "accordion-down": {
//           from: { height: "0" },
//           to: { height: "var(--radix-accordion-content-height)" },
//         },
//         "accordion-up": {
//           from: { height: "var(--radix-accordion-content-height)" },
//           to: { height: "0" },
//         },
//       },
//       animation: {
//         ...defaultConfig.theme.extend.animation,
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//     },
//   },
//   plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./utils/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
