import { Box, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../app/GameContext";
import Image from "../../components/Image";
import MapRenderer from "./MapRenderer";

interface GameProps {}

const Game: FC<GameProps> = () => {
  const game = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (!game.connected) {
      navigate("/");
    }
  }, [game.connected]);

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap="30px"
    >
      {!game.map && <Box>Loading...</Box>}
      {game.map && (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ...(game.killed && { filter: "grayscale(1)" }),
          }}
        >
          <MapRenderer map={game.map} />
        </Box>
      )}
      <Box>
        <Typography variant="h5" fontWeight="fontWeightBold" mb="20px">
          Gracze w grze:
        </Typography>
        {game.playersList.map((player, i) => (
          <Typography
            key={`${player.username}-${player.color}`}
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Image src={`front${player.color}.png`} height="20px" />
            {player.username}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Game;
