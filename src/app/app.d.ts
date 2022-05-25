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

  type User = {
    id: string;
    role: Role;
    username: string;
    active: boolean;
  };
}
