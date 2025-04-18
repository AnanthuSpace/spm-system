import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import UserLogin from "../pages/user/UserLogin";
import UserSignup from "../pages/user/UserSignup";
import CompanyList from "../components/CompanyList";
import JobList from "../components/JobList";
import JobView from "../components/JobView";
import UserProfilePage from "../pages/user/UserProfilePage";
import CompanySignup from "../pages/company/CompanySignup";
import CompanyRegistration from "../pages/company/CompanyRegistration";
import CompanyLogin from "../pages/company/CompanyLogin";
import CompanyLayout from "../layouts/CompanyLayout";
import CompanyProfile from "../components/company/CompanyProfile";
import Jobs from "../components/company/Jobs";
import Students from "../components/company/Students";
import UserOtp from "../pages/user/userOtp";
import UserProtectedRoute from "../components/Protecter/UserProtectedRoute";
import AdminLoginPage from "../pages/admin/adminLoginPage";
import AdminLayout from "../layouts/AdminLayout";
import UserList from "../components/admin/UserList";
import VerifyCompanies from "../components/admin/VerifyCompanies";
import AppliedJobs from "../components/user/AppliedJobs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/otp-verify" element={<UserOtp />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobList />} />
        <Route path="companies" element={<CompanyList />} />
        <Route element={<UserProtectedRoute />}>
          <Route path="user-profile" element={<UserProfilePage />} />
          <Route path="job-details" element={<JobView />} />
          <Route path="applied-jobs" element={<AppliedJobs />} />
        </Route>
      </Route>
      <Route path="/company-signup" element={<CompanySignup />} />
      <Route path="/company-registration" element={<CompanyRegistration />} />
      <Route path="/company-login" element={<CompanyLogin />} />
      <Route path="/company" element={<CompanyLayout />}>
        <Route index element={<CompanyProfile />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="students" element={<Students />} />
      </Route>
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminLayout />}>
        <Route index element={<UserList />} />
        <Route path="verification" element={<VerifyCompanies />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
