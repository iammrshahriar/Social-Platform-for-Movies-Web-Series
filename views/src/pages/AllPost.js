import React from "react";
import {
  useDeletePostMutation,
  useGetPostsQuery,
} from "../features/posts/postSlice";

const AllPost = () => {
  const { data, isLoading, isError } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

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
            <th className="p-3">Post Image</th>
            <th className="p-3">Review</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((post) => (
            <tr
              key={post._id}
              className="border-b border-opacity-20 border-gray-300 bg-gray-700 text-white"
            >
              <td className="p-3">
                <img
                  src={post?.moviePoster}
                  alt="moviePoster"
                  className="h-14 rounded"
                />
              </td>
              <td className="p-3">
                <p>{post?.review}</p>
              </td>
              <td className="p-3 flex gap-2 items-center">
                <button onClick={() => deletePost(post?._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPost;
