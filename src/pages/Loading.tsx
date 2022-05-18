import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={100} />
    </Box>
  );
};

export default Loading;
