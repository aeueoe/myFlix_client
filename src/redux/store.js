import { configureStore } from "@reduxjs/toolkit";
import movies from "./reducer/movies";
import user from "./reducer/user";
import token from "./reducer/token";
import genres from "./reducer/genres";

export const store = configureStore({
  reducer: {
    movies: movies,
    user: user,
    token: token,
    genres: genres,
  },
});
