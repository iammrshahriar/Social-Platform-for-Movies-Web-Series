import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../features/auth/authSlice";
import { movieAPI } from "../features/movile/movieSlice";
import userSlice from "../features/auth/authState";
import { postAPI } from "../features/posts/postSlice";
export const store = configureStore({
  reducer: {
    [movieAPI.reducerPath]: movieAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(movieAPI.middleware)
      .concat(authAPI.middleware)
      .concat(postAPI.middleware),
});
