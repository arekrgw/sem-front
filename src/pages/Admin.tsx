import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { API } from "../app/api";

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get<User[]>("/users");
        setUsers(res.data);
      } catch (err) {
        console.debug("Failed");
      }
    })();
  }, []);

  const activateUser = async (id: string) => {
    try {
      await API.post(`/users/activate/${id}`);
      const res = await API.get<User[]>("/users");
      setUsers(res.data);
    } catch (err) {
      console.debug("Failed activateUser");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxWidth="600px"
      width="90vh"
      m="30px auto"
      flexDirection="column"
      gap="10px"
    >
      {users.map((us) => (
        <Box
          display="flex"
          key={us.id}
          gap="20px"
          height="50px"
          borderRadius="4px"
          px="20px"
          sx={{ backgroundColor: "#eee" }}
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{us.email}</Typography>
          <Typography>{us.active ? "Active" : "Non-active"}</Typography>
          {!us.active && (
            <Button onClick={() => activateUser(us.id)}>Activate</Button>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Admin;
