import { createTheme } from "@material-ui/core/styles";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#64B5F6", // Primary color for your dark theme
    },
    secondary: {
      main: "#FFD600", // Secondary color for your dark theme
    },
    background: {
      default: "#030303", // Background color for your dark theme
      light: "#061215", // Background color for your dark theme
      dark: "#050505", // Background color for your dark theme
    },
    text: {
      primary: "#FFFFFF", // Primary text color for your dark theme
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif", // Default font family
    fontSize: 16, // Default font size
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    // Add more typography settings as needed
  },
});

export default darkTheme;
