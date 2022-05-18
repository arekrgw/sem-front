import { Navigate, Outlet } from "react-router-dom";
import { removeToken, useUser } from "../app/api";
import Loading from "../pages/Loading";
import Layout from "./Layout";

const ProtectedRoute = () => {
  const { user, isLoading } = useUser();

  if (!user && isLoading) {
    return <Loading />;
  }

  if (!user) {
    removeToken();
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
