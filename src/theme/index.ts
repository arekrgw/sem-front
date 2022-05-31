import { createTheme } from "@mui/material";
import { deepOrange, green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: { main: green[800] },
    secondary: { main: deepOrange[600] },
    clickedWaiting: {
      main: green[800],
      light: green[700],
      dark: green[900],
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
  },
});

export default theme;
