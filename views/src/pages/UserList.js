import React from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUserRestrictedMutation,
} from "../features/auth/authSlice";

const UserList = () => {
  const { data, isLoading, isError } = useGetUsersQuery();
  const [updateRestricted] = useUserRestrictedMutation();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Something Went Wrong</h1>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs">
        <thead className="bg-gray-800 text-white">
          <tr className="text-left">
            <th className="p-3">User Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Restricted</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr
              key={user._id}
              className="border-b border-opacity-20 border-gray-300 bg-gray-700 text-white"
            >
              <td className="p-3">
                <p>{user?.userName}</p>
              </td>
              <td className="p-3">
                <p>{user?.email}</p>
              </td>

              <td className="p-3">
                {user.isRestricted ? (
                  <button
                    disabled={user.isAdmin}
                    onClick={() => updateRestricted(user._id)}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    disabled={user.isAdmin}
                    onClick={() => updateRestricted(user._id)}
                  >
                    Block
                  </button>
                )}
              </td>
              <td className="p-3 flex gap-2">
                {user?.isAdmin ? (
                  <button>Admin</button>
                ) : (
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
