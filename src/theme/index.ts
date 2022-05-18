import { createTheme } from "@mui/material";
import { deepOrange, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: { main: red[500] },
    secondary: { main: deepOrange[500] },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
  },
});

export default theme;
