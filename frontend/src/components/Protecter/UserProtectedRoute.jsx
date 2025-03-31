import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const UserProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    toast.error("Please login to apply");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
