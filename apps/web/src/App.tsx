import "@/i18n";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { HomePage } from "@/app/modules/User/Home/Home.page.tsx";
// import { AboutMePage } from "@/app/modules/User/AboutMe/AboutMe.page.tsx";
import { MyProjectsListPage } from "@/app/modules/User/Projects/ProjectsList.tsx";
import { MyProjectsDetailsPage } from "@/app/modules/User/Projects/ProjectsDetails.tsx";
import { GlucosePage } from "@/app/modules/User/Glucose/Glucose.page.tsx";
import { SelectLanguagePage } from "@/app/modules/User/SelectLanguage/SelectLanguage.page.tsx";

import { LoadingPage } from "@/app/modules/Common/Loading/Loading.page.tsx";
import { NotFoundPage } from "@/app/modules/Common/NotFound/NotFound.page.tsx";
import { ForbiddenPage } from "@/app/modules/Common/Forbidden/Forbidden.page.tsx";
import { MaintenancePage } from "@/app/modules/Common/Maintenance/Maintenance.page.tsx";
import { UnderConstructionPage } from "@/app/modules/Common/UnderConstruction/UnderConstruction.page.tsx";

import { UserLayout } from "@/app/layouts/User/User.layout.tsx";
import { Suspense, useEffect } from "react";

import i18n, { getFirstLanguageCode, getSavedLanguageCode } from "@/i18n.ts";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const savedLanguage = getSavedLanguageCode();

  useEffect(() => {
    !savedLanguage &&
      navigate("/language", {
        state: { langRedirect: location.pathname },
      });
    i18n.changeLanguage(savedLanguage || getFirstLanguageCode());
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="m" element={<MaintenancePage />} />
          <Route path="f" element={<ForbiddenPage />} />
          <Route path="l" element={<LoadingPage />} />
          <Route index element={<Navigate to="home" />} />
          <Route
            path="home"
            element={<HomePage />}
          />
          <Route
            path="about"
            element={<UnderConstructionPage /> /*<AboutMePage />*/}
          />
          <Route path="projects">
            <Route index element={<MyProjectsListPage />} />
            <Route path=":projectId" element={<MyProjectsDetailsPage />} />
          </Route>
          <Route path="glucose/:section?" element={<GlucosePage />} />
          <Route path="language" element={<SelectLanguagePage />} />
          <Route path="login" />
          <Route path="logout" />
          <Route path="admin">
            <Route index element={<Navigate to="dashboard" />} />
            <Route index path="dashboard" element={<UnderConstructionPage />} />
            <Route path="users">
              <Route index element={<UnderConstructionPage />} />
              <Route path=":userId" element={<UnderConstructionPage />} />
            </Route>
            <Route path="users">
              <Route index element={<UnderConstructionPage />} />
              <Route path=":projectId" element={<UnderConstructionPage />} />
            </Route>
            <Route path="settings" element={<UnderConstructionPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
