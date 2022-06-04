import {
  Box,
  Button,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useNavigate } from "react-router-dom";
import { API, setToken, useUser } from "../app/api";

const Register = () => {
  const navigate = useNavigate();
  const { user, restoreProfile } = useUser();
  const [disabled, setDisabled] = useState(false);
  const [creds, setCreds] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState<string[]>([]);

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
      await API.post<{ jwt: string }>("/register", creds);
      setError([]);
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? []);
      }
    }
  };

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("accessToken" in response) {
      try {
        const { data: user } = await API.post<{ jwt: string }>("/oauth", {
          token: response.accessToken,
        });
        setError([]);
        setToken(user.jwt);
        restoreProfile();
        navigate("/", { replace: true });
      } catch (err) {
        setError(["Invalid email or password"]);
      }
    }

    if ("error" in response) {
      setDisabled(false);
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
        <Box
          component={Paper}
          sx={{ width: "720px", maxWidth: "90vw", p: "50px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                component="h1"
                sx={{ fontSize: "48px" }}
                textAlign="center"
              >
                Bomberman Register💥
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="username"
                label="Username"
                fullWidth
                onChange={handleChange}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                disabled={disabled}
                onChange={handleChange}
              />
            </Grid>
            {!!error.length && (
              <Grid item xs={12}>
                {error.map((er) => (
                  <FormHelperText error>{er}</FormHelperText>
                ))}
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={disabled}
              >
                Register
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

      <Box></Box>
    </Box>
  );
};

export default Register;
