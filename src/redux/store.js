import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../redux/reducer/movies";
import userReducer from "../redux/reducer/user";

export const store = configureStore({
  reducer: { movies: moviesReducer, user: userReducer },
});
