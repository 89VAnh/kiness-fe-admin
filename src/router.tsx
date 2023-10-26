import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./modules/app/AppLayout";
import { LoginPage } from "./modules/auth";
import { CustomerPage } from "./modules/customer";
import { DashboardPage } from "./modules/dashboard";
import { ErrorBoundaryPage } from "./modules/error/boundary";
import { NewsPage } from "./modules/news";
import "./urls";
import { CUSTOMERS_URL, HOME_URL, LOGIN_URL, NEWS_URL } from "./urls";

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
    ],
  },
  {
    path: LOGIN_URL,
    element: <LoginPage />,
  },
]);
