import { FC, memo } from "react";
import Image from "../../components/Image";

interface WallProps {}

const Wall: FC<WallProps> = () => {
  return (
    <Image
      src="/hardWall.png"
      sx={{ aspectRatio: 1, height: "100%", objectFit: "cover" }}
    />
  );
};

export default memo(Wall);
