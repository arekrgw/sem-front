export {};

declare global {
  type User = {
    id: string;
    role: "ADMIN" | "USER";
    username: string;
    email: string;
    active: boolean;
  };
}
