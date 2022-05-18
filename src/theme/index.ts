import { createTheme } from "@mui/material";
import { deepOrange, cyan } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: { main: cyan[700] },
    secondary: { main: deepOrange[500] },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
  },
});

export default theme;
