import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../app/api";
import Layout from "./Layout";

const ProtectedRoute = () => {
  const { user, removeUser } = useUser();

  if (!user) {
    removeUser();
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
