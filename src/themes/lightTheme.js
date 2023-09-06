import { createTheme } from "@material-ui/core/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#2196F3", // Primary color for your app
    },
    secondary: {
      main: "#FFC107", // Secondary color for your app
    },
    background: {
      default: "#F2F2F2", // Background color for your app
      light: "#fffafa", // Background color for your dark theme
      dark: "#ebebeb", // Background color for your dark theme
    },
    text: {
      primary: "#333", // Primary text color
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

export default lightTheme;
