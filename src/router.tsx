import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./modules/app/AppLayout";
import ProtectedComponent from "./modules/app/ProtectComponent";
import { LoginPage } from "./modules/auth";
import { BranchRegisterPage } from "./modules/branch-register";
import { CustomerPage } from "./modules/customer";
import { DashboardPage } from "./modules/dashboard";
import { EmployeePage } from "./modules/employee";
import { ErrorBoundaryPage } from "./modules/error/boundary";
import { ExperienceRegisterPage } from "./modules/experience-register";
import { NewsPage } from "./modules/news";
import { PageManagePage } from "./modules/page";
import { SlideManagePage } from "./modules/slides";
import { TestRegisterPage } from "./modules/test-register";
import "./urls";
import {
  BRANCH_REGISTER_URL,
  CUSTOMERS_URL,
  EMPLOYEE_URL,
  EXPERIENCE_REGISTER_URL,
  HOME_URL,
  LOGIN_URL,
  NEWS_URL,
  PAGE_URL,
  SLIDES_URL,
  TEST_REGISTER_URL,
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
        path: NEWS_URL,
        element: (
          <ProtectedComponent Element={NewsPage} title="Quản lý tin tức" />
        ),
      },
      {
        path: CUSTOMERS_URL,
        element: (
          <ProtectedComponent
            Element={CustomerPage}
            title="Quản lý khách hàng"
          />
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
        path: TEST_REGISTER_URL,
        element: (
          <ProtectedComponent
            Element={TestRegisterPage}
            title="Quản lý đăng ký kiểm tra"
          />
        ),
      },
      {
        path: BRANCH_REGISTER_URL,
        element: (
          <ProtectedComponent
            Element={BranchRegisterPage}
            title="Quản lý đăng ký trung tâm"
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
    ],
  },
  {
    path: LOGIN_URL,
    element: <ProtectedComponent Element={LoginPage} title="Đăng nhập" />,
  },
]);
