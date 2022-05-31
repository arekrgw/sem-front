import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface SingleStatProps {
  title: string;
  allNumber: number;
  currentPlayerNumber: number;
}

const SingleStat: FC<SingleStatProps> = ({
  title,
  allNumber,
  currentPlayerNumber,
}) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography fontSize="24px" fontWeight="fontWeightMedium">
        {title}
      </Typography>
      <Typography fontSize="18px">
        {currentPlayerNumber}/{allNumber} (
        {((currentPlayerNumber / allNumber) * 100).toFixed(1)}%)
      </Typography>
      <Typography fontSize="12px">(wartość/liczba rozgrywek)</Typography>
    </Box>
  );
};

export default SingleStat;
