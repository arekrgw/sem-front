import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { API } from "../app/api";
import SingleStat from "./SingleStat";

interface StatisticsProps {}

const Statistics = (props: StatisticsProps) => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let mounted = true;
    setTimeout(async () => {
      if (!mounted) return;
      try {
        const res = await API.get<Stats>("/stats");
        setStats(res.data);
      } catch (err) {
        console.debug("Failed");
      }
    }, 1000);
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Box>
      <Typography fontSize="28px" component="h2" fontWeight="fontWeightBold">
        Twoje statystyki
      </Typography>
      {!stats && (
        <Box display="flex" justifyContent="center" mt="30px">
          <CircularProgress />
        </Box>
      )}
      {stats && (
        <Box display="flex" flexDirection="column" gap="20px" mt="30px">
          <SingleStat
            allNumber={stats.numberOfGames}
            currentPlayerNumber={stats.numberOfWins}
            title="Ilość wygranych"
          />
          <SingleStat
            allNumber={stats.numberOfGames}
            currentPlayerNumber={stats.numberOfSuicides}
            title="Ilość samobójstw"
          />
          <SingleStat
            allNumber={stats.numberOfGames}
            currentPlayerNumber={stats.numberOfKills}
            title="Ilość zabójstw"
          />
          <SingleStat
            allNumber={stats.numberOfGames}
            currentPlayerNumber={stats.numberOfPowerups}
            title="Ilość zebranych ulepszeń"
          />
        </Box>
      )}
    </Box>
  );
};

export default Statistics;
