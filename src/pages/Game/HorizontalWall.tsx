import { Box } from "@mui/material";
import { FC, memo } from "react";
import Wall from "./Wall";

interface HorizontalWallProps {
  length: number;
}

const HorizontalWall: FC<HorizontalWallProps> = ({ length }) => {
  return (
    <Box sx={{ display: "flex", height: "4%" }}>
      {Array(length)
        .fill(0)
        .map((_, i) => (
          <Wall key={i} />
        ))}
    </Box>
  );
};

export default memo(HorizontalWall);
