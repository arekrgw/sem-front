export {};

declare global {
  type Role = "ADMIN" | "USER";

  type Profile = {
    id: string;
    role: Role;
    username: string;
  };

  type User = {
    id: string;
    role: Role;
    username: string;
    active: boolean;
  };
}
