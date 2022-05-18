import { Box } from "@mui/material";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
