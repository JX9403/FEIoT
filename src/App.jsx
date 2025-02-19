import React, { useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import NotFound from "./components/NotFound";
import LayoutAdmin from "./components/Layout/LayoutAdmin";

import Dashboard from "./pages/dashboard/dashboard";
import Sensor from "./pages/sensor/sensor";
import History from "./pages/history/history";
import Profile from "./pages/profile/profile";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "sensor",
          element: <Sensor />,
        },
        {
          path: "history",
          element: <History />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
