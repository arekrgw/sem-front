import { alpha, Box, Button } from "@mui/material";
import Image from "./Image";

interface LobbyButtonProps {}

const LobbyButton = (props: LobbyButtonProps) => {
  return (
    <Box
      sx={{
        height: "100%",
        background: (theme) => alpha(theme.palette.grey[300], 0.7),
        borderRadius: "20px",
        border: (theme) => `3px dashed ${theme.palette.grey[800]}`,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        display="flex"
        gap="10px"
        sx={{
          opacity: "0.3",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image src="/frontGreen.png" alt="green-player" />
        <Image src="/frontYellow.png" alt="yellow-player" />
        <Image src="/frontRed.png" alt="red-player" />
        <Image src="/frontPink.png" alt="pink-player" />
      </Box>

      <Button variant="contained" color="secondary" size="large">
        Jestem gotowy!
      </Button>
    </Box>
  );
};

export default LobbyButton;