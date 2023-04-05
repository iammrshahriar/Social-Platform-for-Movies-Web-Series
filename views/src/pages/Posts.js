import React from "react";
import Post from "../components/Post";
import User from "../components/User";
import { useGetUsersQuery } from "../features/auth/authSlice";
import { useGetPostsQuery } from "../features/posts/postSlice";

const Posts = () => {
  const { data, isLoading, isError, error } = useGetPostsQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const users = useGetUsersQuery();

  return (
    <section className="py-10">
      <div className="container text-white">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {isLoading ? (
            <div className="lg:col-span-3 w-full">
              <h1>Loading...</h1>
            </div>
          ) : isError ? (
            <div className="lg:col-span-3 w-full">
              <h1>{error?.data.message}</h1>
            </div>
          ) : (
            <div className="lg:col-span-3 w-full flex flex-col gap-5">
              {data?.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          )}

          {users?.isLoading ? (
            <div className="lg:col-span-1 w-full">
              <h1>Loading...</h1>
            </div>
          ) : users?.isError ? (
            <div className="lg:col-span-1 w-full">
              <h1>{users?.error?.data.message}</h1>
            </div>
          ) : (
            <div className="lg:col-span-1 w-full flex flex-col gap-5">
              {users?.data?.map((user) => (
                <User key={user._id} user={user} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Posts;
