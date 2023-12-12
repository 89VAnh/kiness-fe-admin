import { Navigate, createBrowserRouter } from "react-router-dom";

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
import RequestManage from "./modules/request/RequestManage";
import { ResearcherPage } from "./modules/researcher";
import { SlideManagePage } from "./modules/slide";
import {
  ADMIN_URL,
  BRANCH_URL,
  CITY_URL,
  CONFIG_URL,
  EMPLOYEE_URL,
  EXPERIENCE_REGISTER_URL,
  FAQ_URL,
  HOME_URL,
  LOGIN_URL,
  MANAGER_URL,
  PAGE_URL,
  POSITION_URL,
  REQUEST_URL,
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
        path: "/",
        element: <Navigate to={HOME_URL} />,
      },
      {
        path: HOME_URL,
        element: (
          <ProtectedComponent Element={DashboardPage} title="Trang chủ" />
        ),
      },

      // Manager
      {
        path: MANAGER_URL,
        element: <Navigate to={EXPERIENCE_REGISTER_URL} />,
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
        path: REQUEST_URL,
        element: (
          <ProtectedComponent Element={RequestManage} title="Quản lý yêu cầu" />
        ),
      },
      {
        path: RESEARCHER_URL,
        element: (
          <ProtectedComponent
            Element={ResearcherPage}
            title="Quản lý nhà nghiên cứu"
          />
        ),
      },

      // Config
      {
        path: CONFIG_URL,
        element: <Navigate to={PAGE_URL} />,
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

      // Admin
      {
        path: ADMIN_URL,
        element: <Navigate to={EMPLOYEE_URL} />,
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
        path: POSITION_URL,
        element: (
          <ProtectedComponent
            Element={PositionPage}
            title="Quản lý vị trí / chức vụ"
            role={2}
          />
        ),
      },
      {
        path: BRANCH_URL,
        element: (
          <ProtectedComponent
            Element={BranchManagePage}
            title="Quản lý chi nhánh"
            role={2}
          />
        ),
      },
    ],
  },
  {
    path: LOGIN_URL,
    element: <ProtectedComponent Element={LoginPage} title="Đăng nhập" />,
  },
]);
