import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./modules/app/AppLayout";
import { LoginPage } from "./modules/auth";
import Dashboard from "./modules/dashboard/Dashboard";
import { ErrorBoundaryPage } from "./modules/error/boundary";
import "./urls";
import { HOME_URL, LOGIN_URL, NEWS_URL } from "./urls";

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
        element: <Dashboard />,
      },
      {
        path: NEWS_URL,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: LOGIN_URL,
    element: <LoginPage />,
  },
]);
