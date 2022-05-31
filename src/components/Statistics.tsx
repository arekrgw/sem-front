import { Box, Typography } from "@mui/material";
import SingleStat from "./SingleStat";

interface StatisticsProps {}

const Statistics = (props: StatisticsProps) => {
  return (
    <Box>
      <Typography fontSize="28px" component="h2" fontWeight="fontWeightBold">
        Twoje statystyki
      </Typography>
      <Box display="flex" flexDirection="column" gap="20px" mt="30px">
        <SingleStat
          allNumber={30}
          currentPlayerNumber={5}
          title="Ilość wygranych"
        />
        <SingleStat
          allNumber={30}
          currentPlayerNumber={5}
          title="Ilość samobójstw"
        />
        <SingleStat
          allNumber={30}
          currentPlayerNumber={5}
          title="Ilość zabójstw"
        />
        <SingleStat
          allNumber={30}
          currentPlayerNumber={5}
          title="Ilość zebranych ulepszeń"
        />
      </Box>
    </Box>
  );
};

export default Statistics;
