import { Navigate, createBrowserRouter } from "react-router-dom";


import AppLayout from "./modules/app/AppLayout";
import { ErrorBoundaryPage } from "./modules/error/boundary";
import { } from "./urls";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: (
      <AppLayout>
        <ErrorBoundaryPage />
      </AppLayout>
    ),
  
  },
]);
