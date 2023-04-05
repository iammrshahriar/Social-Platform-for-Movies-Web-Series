import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().user.user;
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/api/post",
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `/api/post`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),

    addLike: builder.mutation({
      query: (postId) => ({
        url: `/api/post/${postId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Posts"],
    }),
    commentInPost: builder.mutation({
      query: (data) => ({
        url: `/api/post/${data.postId}`,
        method: "PUT",
        body: { commentText: data.commentText },
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddLikeMutation,
  useCreatePostMutation,
  useCommentInPostMutation,
  useDeletePostMutation,
} = postAPI;
