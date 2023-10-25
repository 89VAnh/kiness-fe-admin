import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./modules/app/AppLayout";
import Dashboard from "./modules/dashboard/Dashboard";
import { ErrorBoundaryPage } from "./modules/error/boundary";
import "./urls";

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
        element: <Dashboard />,
      },
    ],
  },
]);
