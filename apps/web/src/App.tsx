import "@/i18n";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { TermsOfServicePage } from "@/app/modules/User/TermsOfService/TermsOfService.page.tsx";
import { PrivacyPolicyPage } from "@/app/modules/User/PrivacyPolicy/PrivacyPolicy.page.tsx";

import { HomePage } from "@/app/modules/User/Home/Home.page.tsx";
import { AboutMePage } from "@/app/modules/User/AboutMe/AboutMe.page.tsx";
import { MyProjectsListPage } from "@/app/modules/User/Projects/ProjectsList.tsx";
import { MyProjectsDetailsPage } from "@/app/modules/User/Projects/ProjectsDetails.tsx";
import { GlucosePage } from "@/app/modules/User/Glucose/Glucose.page.tsx";
import { SelectLanguagePage } from "@/app/modules/User/SelectLanguage/SelectLanguage.page.tsx";

import { LoadingPage } from "@/app/modules/Common/Loading/Loading.page.tsx";
import { NotFoundPage } from "@/app/modules/Common/NotFound/NotFound.page.tsx";
import { UnderConstructionPage } from "@/app/modules/Common/UnderConstruction/UnderConstruction.page.tsx";
import { LoginPage } from "@/app/modules/Auth/Login.page.tsx";
import { RegisterPage } from "@/app/modules/Auth/Register.page.tsx";
import { ResetPasswordPage } from "@/app/modules/Auth/ResetPassword.page.tsx";
import { GamePage } from "@/app/modules/User/Game/Game.page.tsx";
import { AdminLayout } from "@/app/layouts/Admin/Admin.layout.tsx";
import { AdminRouteGuard } from "@/app/auth/AdminRouteGuard.tsx";
import { MaintenanceRouteGuard } from "@/app/auth/MaintenanceRouteGuard.tsx";
import { AdminDashboardPage } from "@/app/modules/Admin/Dashboard/AdminDashboard.page.tsx";
import { AdminGamePage } from "@/app/modules/Admin/Game/AdminGame.page.tsx";
import { AdminProjectsPage } from "@/app/modules/Admin/Projects/AdminProjects.page.tsx";
import { AdminAnnouncementsPage } from "@/app/modules/Admin/Announcements/AdminAnnouncements.page.tsx";
import { AdminSettingsPage } from "@/app/modules/Admin/Settings/AdminSettings.page.tsx";
import { AdminUsersPage } from "@/app/modules/Admin/Users/AdminUsers.page.tsx";
import { AdminRolesPage } from "@/app/modules/Admin/Roles/AdminRoles.page.tsx";

import { UserLayout } from "@/app/layouts/User/User.layout.tsx";
import { Suspense, useEffect } from "react";

import i18n, { getFirstLanguageCode, getSavedLanguageCode } from "@/i18n.ts";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const savedLanguage = getSavedLanguageCode();

  useEffect(() => {
    if (!savedLanguage) {
      navigate("/language", {
        state: { langRedirect: location.pathname },
      });
    }
    i18n.changeLanguage(savedLanguage || getFirstLanguageCode());
  }, [location.pathname, navigate, savedLanguage]);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="language" element={<SelectLanguagePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="terms" element={<TermsOfServicePage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route element={<MaintenanceRouteGuard />}>
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<HomePage />} />
            <Route path="about" element={<AboutMePage />} />
            <Route path="projects">
              <Route index element={<MyProjectsListPage />} />
              <Route path=":projectId" element={<MyProjectsDetailsPage />} />
            </Route>
            <Route path="glucose/:section?" element={<GlucosePage />} />
            <Route path="game" element={<GamePage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<UnderConstructionPage />} />
            <Route path="settings" element={<UnderConstructionPage />} />
            <Route path="logout" />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
        <Route
          path="admin"
          element={
            <AdminRouteGuard>
              <AdminLayout />
            </AdminRouteGuard>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route
            path="game"
            element={
              <AdminRouteGuard permissions={["game.content:read"]}>
                <AdminGamePage />
              </AdminRouteGuard>
            }
          />
          <Route
            path="projects"
            element={
              <AdminRouteGuard permissions={["projects:read"]}>
                <AdminProjectsPage />
              </AdminRouteGuard>
            }
          />
          <Route
            path="settings"
            element={
              <AdminRouteGuard
                permissions={[
                  "game.settings:read",
                  "glucose.settings:read",
                  "status.maintenance:update",
                ]}
              >
                <AdminSettingsPage />
              </AdminRouteGuard>
            }
          />
          <Route
            path="announcements"
            element={
              <AdminRouteGuard permissions={["announcements:read"]}>
                <AdminAnnouncementsPage />
              </AdminRouteGuard>
            }
          />
          <Route
            path="users"
            element={
              <AdminRouteGuard permissions={["users:read"]}>
                <AdminUsersPage />
              </AdminRouteGuard>
            }
          />
          <Route
            path="roles"
            element={
              <AdminRouteGuard permissions={["roles:read"]}>
                <AdminRolesPage />
              </AdminRouteGuard>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
