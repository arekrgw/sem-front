import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { getToken, useUser } from "../app/api";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { user } = useUser();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxWidth="600px"
      width="90vh"
      m="30px auto"
      flexDirection="column"
    >
      {user && (
        <>
          <Typography variant="h1">{user.email}</Typography>
          <Typography variant="h4">{user.username}</Typography>
        </>
      )}

      <Typography sx={{ wordBreak: "break-word" }}>{getToken()}</Typography>
    </Box>
  );
};

export default Home;
