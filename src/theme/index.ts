import { createTheme } from "@mui/material";
import { deepOrange, green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: { main: green[800] },
    secondary: { main: deepOrange[600] },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
  },
});

export default theme;
