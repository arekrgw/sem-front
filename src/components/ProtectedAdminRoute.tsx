import { Navigate, Outlet } from "react-router-dom";
import { removeToken, useUser } from "../app/api";

const ProtectedAdminRoute = () => {
  const { user } = useUser();

  if (!user) {
    removeToken();
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
