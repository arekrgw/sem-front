import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../app/api";

function Header() {
  const navigate = useNavigate();
  const { user, removeUser } = useUser();

  const logout = () => {
    removeUser();
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Bomberman
          </Typography>
          {user?.role === "admin" && (
            <Button component={Link} color="inherit" to="/admin">
              <Typography sx={{ color: "orange" }}>Użytkownicy</Typography>
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
