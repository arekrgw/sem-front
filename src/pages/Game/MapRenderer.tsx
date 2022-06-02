import { Box } from "@mui/material";
import React, { FC } from "react";
import { Map } from "../../app/GameContext";
import HorizontalWall from "./HorizontalWall";
import MapBox from "./MapBox";
import Wall from "./Wall";

interface MapRendererProps {
  map: Map;
}

const MapRenderer: FC<MapRendererProps> = ({ map }) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <HorizontalWall length={map.length + 2} />
      {map.map((row, y) => (
        <Box key={y} sx={{ display: "flex", height: "4%" }}>
          <Wall />
          {row.map((box, x) => (
            <MapBox key={x} {...box} />
          ))}
          <Wall />
        </Box>
      ))}
      <HorizontalWall length={map.length + 2} />
    </Box>
  );
};

export default MapRenderer;
