export {};

declare module "@mui/material/styles" {
  interface Palette {
    clickedWaiting: Palette["primary"];
  }
  interface PaletteOptions {
    clickedWaiting: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    clickedWaiting: true;
  }
}
