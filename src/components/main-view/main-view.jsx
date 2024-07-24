import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducer/movies";
import { setGenres } from "../../redux/reducer/genres";

import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { MovieView } from "../movie-view/movie-view";
import { MoviesList } from "../movies-list/movies-list";
import { DirectorView } from "../director-view/director-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { FavoritesView } from "../profile-view/favorites-view";
import { Container, Row, Col } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const movies = useSelector((state) => state.movies.list);
  const dispatch = useDispatch();

  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);

  useEffect(() => {
    if (!token) return;

    fetch("https://movieapi-aeueoes-projects.vercel.app/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.title,
          description: movie.description,
          image: movie.imagePath,
          url: movie.url,
          actors: movie.actors,
          director: movie.director,
          genre: movie.genre.name,
          featured: movie.featured,
        }));

        dispatch(setMovies(moviesFromApi));

        // Optionally, dispatch setGenres and other actions if needed
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Container>
        <Row className="justify-content-md-center main">
          <Routes>
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <div className="login-view">
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                      }}
                    />
                  </div>
                )
              }
            />
            <Route
              path="/signup"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <div>
                    <SignupView />
                  </div>
                )
              }
            />
            <Route
              path="/movies/:movieTitle"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <MovieView movies={movies} />
                )
              }
            />
            <Route
              path="/user"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView user={user} />
                )
              }
            />
            <Route
              path="/"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <MoviesList />
                )
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
