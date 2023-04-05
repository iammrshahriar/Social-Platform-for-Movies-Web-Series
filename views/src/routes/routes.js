import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import AllPost from "../pages/AllPost";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SingleMovie from "../pages/SingleMovie";
import UserList from "../pages/UserList";
import UserProfile from "../pages/UserProfile";
import PrivateRoute, { AdminRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/movie/:id", element: <SingleMovie /> },
      { path: "/user/:id", element: <UserProfile /> },
      {
        path: "/posts",
        element: (
          <PrivateRoute>
            <Posts />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),

        children: [
          { index: true, element: <Profile /> },
          {
            path: "users",
            element: (
              <AdminRoute>
                <UserList />
              </AdminRoute>
            ),
          },
          {
            path: "all-posts",
            element: (
              <AdminRoute>
                <AllPost />
              </AdminRoute>
            ),
          },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/signin", element: <SignIn /> },
    ],
  },
]);
