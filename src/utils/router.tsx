import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Category from "../pages/Categories";
import ErrorFallback from "../pages/ErrorFallback";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Status from "../pages/Status";
import PersonalInfo from "../pages/PersonalInfo";
import Organization from "../pages/organizations";
import User from "../pages/Users";
import Logout from "../pages/Logout";
import Setting from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "categories",
        element: <Category />,
      },
      {
        path: "personal-infos",
        element: <PersonalInfo />,
      },
      {
        path: "organizations",
        element: <Organization />,
      },
      {
        path: "status",
        element: <Status />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "settings",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
