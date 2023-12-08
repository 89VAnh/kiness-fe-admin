import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./modules/app/AppLayout";
import ProtectedComponent from "./modules/app/ProtectComponent";
import { LoginPage } from "./modules/auth";
import { BranchManagePage } from "./modules/branch";
import { CityManagePage } from "./modules/city";
import { DashboardPage } from "./modules/dashboard";
import { EmployeePage } from "./modules/employee";
import { ErrorBoundaryPage } from "./modules/error/boundary";
import { ExperienceRegisterPage } from "./modules/experience-register";
import { FaqManagePage } from "./modules/faq";
import { PageManagePage } from "./modules/page";
import { PositionPage } from "./modules/position";
import { ResearcherPage } from "./modules/researcher";
import { SlideManagePage } from "./modules/slide";
import {
  BRANCH_URL,
  CITY_URL,
  EMPLOYEE_URL,
  EXPERIENCE_REGISTER_URL,
  FAQ_URL,
  HOME_URL,
  LOGIN_URL,
  PAGE_URL,
  POSITION_URL,
  RESEARCHER_URL,
  SLIDES_URL,
} from "./urls";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: (
      <AppLayout>
        <ErrorBoundaryPage />
      </AppLayout>
    ),
    children: [
      {
        path: HOME_URL,
        element: (
          <ProtectedComponent Element={DashboardPage} title="Trang chủ" />
        ),
      },
      {
        path: EXPERIENCE_REGISTER_URL,
        element: (
          <ProtectedComponent
            Element={ExperienceRegisterPage}
            title="Quản lý đăng ký trải nghiệm"
          />
        ),
      },
      {
        path: BRANCH_URL,
        element: (
          <ProtectedComponent
            Element={BranchManagePage}
            title="Quản lý chi nhánh"
          />
        ),
      },
      {
        path: CITY_URL,
        element: (
          <ProtectedComponent
            Element={CityManagePage}
            title="Quản lý thành phố"
          />
        ),
      },
      {
        path: FAQ_URL,
        element: (
          <ProtectedComponent
            Element={FaqManagePage}
            title="Quản lý câu hỏi thường gặp"
          />
        ),
      },

      {
        path: EMPLOYEE_URL,
        element: (
          <ProtectedComponent
            Element={EmployeePage}
            title="Quản lý nhân viên"
            role={2}
          />
        ),
      },

      {
        path: PAGE_URL,
        element: (
          <ProtectedComponent
            Element={PageManagePage}
            title="Quản lý các trang"
            role={2}
          />
        ),
      },
      {
        path: SLIDES_URL,
        element: (
          <ProtectedComponent
            Element={SlideManagePage}
            title="Quản lý slides"
            role={2}
          />
        ),
      },
      {
        path: EMPLOYEE_URL,
        element: (
          <ProtectedComponent
            Element={EmployeePage}
            title="Quản lý nhân viên"
            role={2}
          />
        ),
      },
      {
        path: BRANCH_URL,
        element: <BranchManagePage />,
      },
      {
        path: CITY_URL,
        element: <CityManagePage />,
      },

      {
        path: POSITION_URL,
        element: <PositionPage />,
      },
      {
        path: RESEARCHER_URL,
        element: <ResearcherPage />,
      },
    ],
  },
  {
    path: LOGIN_URL,
    element: <ProtectedComponent Element={LoginPage} title="Đăng nhập" />,
  },
]);
