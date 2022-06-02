import { Box } from "@mui/material";
import { FC } from "react";
import { useGame } from "../../app/GameContext";
import MapRenderer from "./MapRenderer";

interface GameProps {}

const Game: FC<GameProps> = () => {
  const game = useGame();

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
          }}
        >
          <MapRenderer map={game.map} />
        </Box>
      )}
    </Box>
  );
};

export default Game;
