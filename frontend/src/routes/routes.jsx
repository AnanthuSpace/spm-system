import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import UserLogin from "../pages/user/UserLogin";
import UserSignup from "../pages/user/UserSignup";
import CompanyList from "../components/CompanyList";
import JobList from "../components/JobList";
import JobView from "../components/JobView";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/job-details" element={<JobView />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
