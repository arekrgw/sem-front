import { Box } from "@mui/material";
import { useMatch } from "react-router-dom";
import { GameProvider } from "../app/GameContext";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactElement }) => {
  const match = useMatch("/game");
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {!match && <Header />}
      <GameProvider>{children}</GameProvider>
    </Box>
  );
};

export default Layout;
