import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { removeToken, useUser } from "../app/api";

function Header() {
  const navigate = useNavigate();
  const { user } = useUser();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Super App
          </Typography>
          {user?.role === "ADMIN" && (
            <Button component={Link} color="inherit" to="/admin">
              Admin
            </Button>
          )}
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
