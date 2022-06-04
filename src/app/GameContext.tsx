import { FC, useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io as sIo, Socket } from "socket.io-client";
import invariant from "tiny-invariant";
import { getToken } from "./api";

export enum MapBlockType {
  EMPTY_PLACE = 0,
  BOX_PLACE = 1,
  HARD_WALL = 2,
}

export type MapElement = {
  type: MapBlockType;
  player: string | null;
  bomb: boolean;
  powerup: number;
  explosion: string[];
};

export type Map = Array<Array<MapElement>>;

interface IGameContext {
  io: Socket;
  lobbyStatus: boolean;
  connected: boolean;
  map: Map | null;
  killed: boolean;
}

const GameContext = createContext<IGameContext | null>(null);

export const GameProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [io] = useState(() => {
    return sIo(process.env.REACT_APP_API_URL!, {
      transports: ["websocket"],
      auth: { token: getToken() },
      path:
        process.env.NODE_ENV !== "production" ? "/socket.io" : "/api/socket.io",
    });
  });
  const [map, setMap] = useState<Map | null>(null);
  const [lobbyStatus, setLobbyStatus] = useState(false);
  const [connected, setConnected] = useState(false);
  const [killed, setKilled] = useState(false);

  const gameDetailsReceived = (newMap: Map) => {
    if (map === null) {
      navigate("/game");
    }
    setMap(newMap);
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      io.emit("changePos", { direction: "up" });
    } else if (e.key === "ArrowDown") {
      io.emit("changePos", { direction: "down" });
    } else if (e.key === "ArrowLeft") {
      io.emit("changePos", { direction: "left" });
    } else if (e.key === "ArrowRight") {
      io.emit("changePos", { direction: "right" });
    } else if (e.key === " ") {
      io.emit("placeBomb");
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKey);

    return () => {
      document.removeEventListener("keyup", handleKey);
    };
  }, []);

  useEffect(() => {
    io.on("connect", () => {
      setConnected(true);
    });
    io.on("lobbyStatusChange", (status) => {
      setLobbyStatus(status);
    });

    io.on("disconnect", () => {
      navigate("/");
      setConnected(false);
      setLobbyStatus(false);
      setMap(null);
      setKilled(false);
    });

    io.on("gameDetails", ({ map: newMap }: { map: Map }) => {
      gameDetailsReceived(newMap);
    });

    io.on("killed", () => {
      setKilled(true);
    });

    io.on("gameEnded", () => {
      navigate("/");
      setKilled(false);
      setMap(null);
    });

    return () => {
      io.close();
    };
  }, []);

  return (
    <GameContext.Provider value={{ io, lobbyStatus, connected, map, killed }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  invariant(context, "GameContext is not available");
  return context;
};
