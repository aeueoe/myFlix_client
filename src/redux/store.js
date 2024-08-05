import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../redux/reducer/movies";
import userReducer from "../redux/reducer/user";
import genresReducer from "../redux/reducer/genres";

export const store = configureStore({
  reducer: { movies: moviesReducer, user: userReducer, genres: genresReducer },
});
