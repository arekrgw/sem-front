import { FC, useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { io as sIo, Socket } from "socket.io-client";
import invariant from "tiny-invariant";
import { getToken } from "./api";

interface IGameContext {
  io: Socket;
  lobbyStatus: boolean;
}

const GameContext = createContext<IGameContext | null>(null);

export const GameProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [io] = useState(
    sIo("http://localhost:3001", {
      transports: ["websocket"],
      auth: { token: getToken() },
    })
  );
  const [lobbyStatus, setLobbyStatus] = useState(false);

  useEffect(() => {
    io.on("lobbyStatusChange", (status) => {
      setLobbyStatus(status);
    });

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <GameContext.Provider value={{ io, lobbyStatus }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  invariant(context, "GameContext is not available");
  return context;
};
