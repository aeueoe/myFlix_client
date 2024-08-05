import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    filter: "",
    favorites: JSON.parse(localStorage.getItem("user"))?.favoriteMovies || [],
  },
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      const user = JSON.parse(localStorage.getItem("user"));
      user.favoriteMovies.push(action.payload);
      localStorage.setItem("user", JSON.stringify(user));
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (movieId) => movieId !== action.payload
      );
      const user = JSON.parse(localStorage.getItem("user"));
      user.favoriteMovies = user.favoriteMovies.filter(
        (movieId) => movieId !== action.payload
      );
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
});

export const { setMovies, setFilter, addFavorite, removeFavorite } =
  moviesSlice.actions;
export default moviesSlice.reducer;
