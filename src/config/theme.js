import { createMuiTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#FFFFFF",
      dark: "#f7f7f7",
      contrastText: "#000",
    },
    secondary: {
      main: "#4771f4",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

export default theme;
