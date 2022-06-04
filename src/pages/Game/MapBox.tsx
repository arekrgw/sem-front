import { Box } from "@mui/material";
import { FC, memo } from "react";
import { MapBlockType, MapElement } from "../../app/GameContext";
import Image from "../../components/Image";
import compare from "react-fast-compare";

interface MapBoxProps extends MapElement {}

const resolveImage = (type: MapBlockType) => {
  switch (type) {
    case MapBlockType.BOX_PLACE:
      return "/softWall.png";
    case MapBlockType.HARD_WALL:
      return "/hardWall.png";
    case MapBlockType.EMPTY_PLACE:
      return "/floor.png";
  }
};

const MapBox: FC<MapBoxProps> = ({
  type,
  bomb,
  player,
  powerup,
  explosion,
}) => {
  return (
    <Box
      sx={{
        aspectRatio: "1",
        height: "100%",
        backgroundImage: `url("${resolveImage(type)}")`,
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      {player && (
        <Image
          src={`/front${player}.png`}
          sx={{
            height: "75%",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        />
      )}
      {bomb && (
        <Image
          src="/bomb.png"
          sx={{
            height: "75%",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        />
      )}
      {!!explosion.length && (
        <Image
          src="/explosion.png"
          sx={{
            height: "75%",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
          }}
        />
      )}
      {!!powerup && (
        <Image
          src="/powerup.png"
          sx={{
            height: "75%",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 4,
          }}
        />
      )}
    </Box>
  );
};

export default memo(MapBox, compare);
