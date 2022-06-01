import { Box } from "@mui/material";
import { GameProvider } from "../app/GameContext";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header />
      <GameProvider>{children}</GameProvider>
    </Box>
  );
};

export default Layout;
