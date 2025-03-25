import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import UserLogin from "../pages/user/UserLogin";
import UserSignup from "../pages/user/UserSignup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
