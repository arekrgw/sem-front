import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { API } from "../app/api";
import User from "../components/User";

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
      await API.post(`/activate/${id}`);
      const res = await API.get<User[]>("/users");
      setUsers(res.data);
    } catch (err) {
      console.debug("Failed activateUser");
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await API.delete(`/users/${id}`);
      const res = await API.get<User[]>("/users");
      setUsers(res.data);
    } catch (err) {
      console.debug("Failed deleteUser");
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
        <User
          us={us}
          activateUser={activateUser}
          key={us.id}
          deleteUser={deleteUser}
        />
      ))}
    </Box>
  );
};

export default Admin;
