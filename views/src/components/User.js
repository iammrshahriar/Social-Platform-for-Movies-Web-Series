import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <Link
      to={`/user/${user._id}`}
      className="flex items-center justify-between gap-2 p-3  bg-slate-800"
    >
      <img
        src={user?.profile}
        alt="user"
        className="h-10 rounded-full border-2 border-white"
      />

      <div className="text-right">
        <h2>{user?.userName}</h2>
        <p className="text-xs">{user?.email}</p>
      </div>
    </Link>
  );
};

export default User;
