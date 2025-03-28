import { Navigate, Outlet } from "react-router-dom";
const UserProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserProtectedRoute;
