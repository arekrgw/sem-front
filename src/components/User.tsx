import {
  Box,
  Typography,
  Button,
  Modal,
  Paper,
  IconButton,
} from "@mui/material";
import { FC, useState } from "react";
import SingleStat from "./SingleStat";
import DeleteIcon from "@mui/icons-material/Delete";

interface UserProps {
  us: User;
  activateUser: (id: string) => void;
  deleteUser: (id: string) => void;
}

const User: FC<UserProps> = ({ us, activateUser, deleteUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Paper
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "70vw",
            maxWidth: "600px",
            p: "30px",
          }}
        >
          <Box display="flex" flexDirection="column" gap="20px">
            <Typography
              component="h2"
              fontSize="32px"
              fontWeight="fontWeightMedium"
            >
              Statystyki gracza:{" "}
              <Box display="inline" fontWeight="fontWeightBold">
                {us.username}
              </Box>
            </Typography>
            <SingleStat
              allNumber={us.numberOfGames}
              currentPlayerNumber={us.numberOfWins}
              title="Ilość wygranych"
            />
            <SingleStat
              allNumber={us.numberOfGames}
              currentPlayerNumber={us.numberOfSuicides}
              title="Ilość samobójstw"
            />
            <SingleStat
              allNumber={us.numberOfGames}
              currentPlayerNumber={us.numberOfKills}
              title="Ilość zabójstw"
            />
            <SingleStat
              allNumber={us.numberOfGames}
              currentPlayerNumber={us.numberOfPowerups}
              title="Ilość zebranych ulepszeń"
            />
          </Box>
        </Paper>
      </Modal>
      <Box
        display="flex"
        gap="20px"
        height="50px"
        borderRadius="4px"
        px="20px"
        sx={{ backgroundColor: "#eee", boxShadow: 1 }}
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => setModalOpen(true)}
      >
        <Typography flex="1">{us.username}</Typography>
        <Typography>{us.active ? "Active" : "Non-active"}</Typography>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            activateUser(us.id);
          }}
          disabled={us.active}
        >
          Activate
        </Button>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            deleteUser(us.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default User;
