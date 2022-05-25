import { Box, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useUser } from "../app/api";
import invariant from "tiny-invariant";
import Statistics from "../components/Statistics";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { user } = useUser();
  invariant(user, "User is not logged");

  return (
    <Box
      width="100%"
      minHeight="calc(100vh - 65px)"
      p="30px"
      sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <Typography component="h1" fontSize="38px">
        Witaj{" "}
        <Box display="inline" fontWeight="fontWeightBold">
          {user.username}
        </Box>
        !
      </Typography>
      <Grid container spacing={3} sx={{ flex: 1 }}>
        <Grid item xs={6}>
          <Box sx={{ minHeight: "30%" }}></Box>
        </Grid>
        <Grid item xs={6}>
          <Statistics />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
