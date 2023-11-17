import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./modules/app/AppLayout";
import { LoginPage } from "./modules/auth";
import { BranchManagePage } from "./modules/branch";
import { BranchRegisterPage } from "./modules/branch-register";
import { CityManagePage } from "./modules/city";
import { CustomerPage } from "./modules/customer";
import { DashboardPage } from "./modules/dashboard";
import { ErrorBoundaryPage } from "./modules/error/boundary";
import { ExperienceRegisterPage } from "./modules/experience-register";
import { NewsPage } from "./modules/news";
import { PageManagePage } from "./modules/page";
import { SlideManagePage } from "./modules/slides";
import { TestRegisterPage } from "./modules/test-register";
import "./urls";
import {
  BRANCH_REGISTER_URL,
  BRANCH_URL,
  CITY_URL,
  CUSTOMERS_URL,
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
        element: <DashboardPage />,
      },
      {
        path: NEWS_URL,
        element: <NewsPage />,
      },
      {
        path: CUSTOMERS_URL,
        element: <CustomerPage />,
      },
      {
        path: EXPERIENCE_REGISTER_URL,
        element: <ExperienceRegisterPage />,
      },
      {
        path: TEST_REGISTER_URL,
        element: <TestRegisterPage />,
      },
      {
        path: BRANCH_REGISTER_URL,
        element: <BranchRegisterPage />,
      },
      {
        path: PAGE_URL,
        element: <PageManagePage />,
      },
      {
        path: SLIDES_URL,
        element: <SlideManagePage />,
      },
      {
        path: BRANCH_URL,
        element: <BranchManagePage />,
      },
      {
        path: CITY_URL,
        element: <CityManagePage />,
      },
    ],
  },
  {
    path: LOGIN_URL,
    element: <LoginPage />,
  },
]);
