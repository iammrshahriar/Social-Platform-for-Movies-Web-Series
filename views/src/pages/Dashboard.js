import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../features/auth/authState";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <section className="py-5">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="lg:col-span-1 w-full">
            <div className="p-5 bg-slate-800 text-white">
              <h1 className="text-center font-bold font-xl">Dashboard</h1>

              <ul className="my-3 flex items-center gap-3 flex-col text-sm">
                <Link
                  to="/dashboard"
                  className="py-2 bg-slate-900 w-full block text-center"
                >
                  Profile
                </Link>

                {user?.isAdmin && (
                  <>
                    <Link
                      to="/dashboard/users"
                      className="py-2 bg-slate-900 w-full block text-center"
                    >
                      Users
                    </Link>
                    <Link
                      to="/dashboard/all-posts"
                      className="py-2 bg-slate-900 w-full block text-center"
                    >
                      All Post
                    </Link>
                  </>
                )}

                <button
                  className="py-2 bg-orange-600 w-full block text-center"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-3 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
