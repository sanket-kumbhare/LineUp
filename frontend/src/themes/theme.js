import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          50: "#FDF7FF",
          100: "#F4EAFF",
          200: "#E1CBFF",
          300: "#C69EFF",
          400: "#A374F9",
          500: "#814DDE",
          600: "#5F35AE",
          700: "#452382",
          800: "#301761",
          900: "#1D0A42",
        },
      },
    },
    light: {
      palette: {
        primary: {
          50: "#FDF7FF",
          100: "#F4EAFF",
          200: "#E1CBFF",
          300: "#C69EFF",
          400: "#A374F9",
          500: "#814DDE",
          600: "#5F35AE",
          700: "#452382",
          800: "#301761",
          900: "#1D0A42",
        },
      },
    },
  },
});

export default theme;
