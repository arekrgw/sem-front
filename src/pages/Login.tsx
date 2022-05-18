import {
  Box,
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useNavigate } from "react-router-dom";
import { API, setToken, useUser } from "../app/api";

const Login = () => {
  const navigate = useNavigate();
  const { restoreProfile, user } = useUser();
  const [disabled, setDisabled] = useState(false);
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCreds({ ...creds, [name]: value });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      const { data: user } = await API.post<{ jwt: string }>(
        "/auth/login",
        creds
      );
      setError("");
      setToken(user.jwt);
      restoreProfile();
      navigate("/", { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("accessToken" in response) {
      try {
        const { data: user } = await API.post<{ jwt: string }>(
          "/auth/login/google",
          { token: response.accessToken }
        );
        setError("");
        setToken(user.jwt);
        restoreProfile();
        navigate("/", { replace: true });
      } catch (err) {
        setError("Invalid email or password");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <form onSubmit={handleLogin}>
        <Box sx={{ width: "600px", maxWidth: "90vw" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h2" component="h1" textAlign="center">
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                disabled={disabled}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                disabled={disabled}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <FormHelperText error>{error}</FormHelperText>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={disabled}
              >
                Login
              </Button>
              <GoogleLogin
                onRequest={() => setDisabled(true)}
                clientId={process.env.REACT_APP_GOOGLE_ID || ""}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={(renderProps) => (
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{ mt: "10px" }}
                    {...renderProps}
                  >
                    Login with Google
                  </Button>
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
