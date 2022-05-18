export {};

declare global {
  type Profile = {
    id: string;
    role: "ADMIN" | "USER";
    username: string;
  };

  type User = {
    id: string;
    role: "ADMIN" | "USER";
    username: string;
    active: boolean;
  };
}
