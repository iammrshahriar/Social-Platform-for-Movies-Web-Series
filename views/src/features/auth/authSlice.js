import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "./authState";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState()?.user?.user || {};
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/api/user",
      providesTags: ["Users"],
    }),
    getUser: builder.query({
      query: (id) => `/api/user/${id}`,
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `/api/user/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setUser(data));
      },
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: `/api/user/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setUser(data));
      },
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `/api/user/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setUser(data));
      },
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    userRestricted: builder.mutation({
      query: (id) => ({
        url: `/api/user/admin/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useUserRestrictedMutation,
  useGetUserQuery,
} = authAPI;
