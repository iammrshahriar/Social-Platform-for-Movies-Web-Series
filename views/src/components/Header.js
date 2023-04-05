import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <header className="py-6  text-white">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-xl font-bold ">
          <span>FLIM</span>
          <span className="text-orange-600">CRAVE</span>
        </Link>

        <ul className="flex items-center gap-5 ">
          <NavLink to="/">Movies</NavLink>
          <NavLink to="/posts">Posts</NavLink>
        </ul>

        <div>
          {user ? (
            <NavLink to="/dashboard">Dashboard</NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
