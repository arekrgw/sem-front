import { FC, useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { io as sIo, Socket } from "socket.io-client";
import invariant from "tiny-invariant";
import { getToken } from "./api";

enum MapBlockType {
  EMPTY_PLACE = 0,
  BOX_PLACE = 1,
  HARD_WALL = 2,
}

type Map = Array<Array<{ type: MapBlockType }>>;

interface IGameContext {
  io: Socket;
  lobbyStatus: boolean;
  connected: boolean;
  map: Map | null;
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
  const [map, setMap] = useState<Map | null>(null);
  const [lobbyStatus, setLobbyStatus] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    io.on("connect", () => {
      setConnected(true);
    });
    io.on("lobbyStatusChange", (status) => {
      setLobbyStatus(status);
    });

    io.on("disconnect", () => {
      setConnected(false);
      setLobbyStatus(false);
    });

    io.on("gameDetails", ({ map }: { map: Map }) => {
      setMap(map);
    });

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <GameContext.Provider value={{ io, lobbyStatus, connected, map }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  invariant(context, "GameContext is not available");
  return context;
};
