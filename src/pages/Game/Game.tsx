import { Box } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../app/GameContext";
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
    <Box height="100vh" width="100vw" display="flex" flexDirection="column">
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
    </Box>
  );
};

export default Game;
