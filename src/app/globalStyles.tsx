import React from "react";
import { GlobalStyles } from "@mui/material";

const GlobalStyle = () => {
  return (
    <GlobalStyles
      styles={`

        body {
          background-image: url("/backgroundGrass.png");
          background-repeat: repeat;
        }

      `}
    />
  );
};

export default GlobalStyle;
