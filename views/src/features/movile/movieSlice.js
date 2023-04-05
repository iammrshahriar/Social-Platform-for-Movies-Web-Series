import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieAPI = createApi({
  reducerPath: "movieAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState()?.user?.user || {};
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => "/api/movie",
      providesTags: ["Movies"],
    }),
    getSingleMovie: builder.query({
      query: (id) => `/api/movie/${id}`,
      providesTags: ["Movies"],
    }),
    addLikeInMovie: builder.mutation({
      query: (postId) => ({
        url: `/api/movie/like/${postId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Movies"],
    }),
    addDisLikeInMovie: builder.mutation({
      query: (postId) => ({
        url: `/api/movie/dislike/${postId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Movies"],
    }),
    addOpinionInMovie: builder.mutation({
      query: (data) => ({
        url: `/api/movie/${data.id}`,
        method: "PATCH",
        body: { commentText: data.comment, rate: data.rate },
      }),
      invalidatesTags: ["Movies"],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetSingleMovieQuery,
  useAddDisLikeInMovieMutation,
  useAddLikeInMovieMutation,
  useAddOpinionInMovieMutation,
} = movieAPI;
