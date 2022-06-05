export {};

declare global {
  type Role = "admin" | "user";

  type Profile = {
    id: string;
    role: Role;
    username: string;
    exp: number;
    iat: number;
  };

  type Stats = {
    numberOfKills: number;
    numberOfSuicides: number;
    numberOfWins: number;
    numberOfGames: number;
    numberOfPowerups: number;
  };

  type User = {
    id: string;
    role: Role;
    username: string;
    active: boolean;
  } & Stats;

  type Player = {
    username: string;
    color: string;
  };
}
