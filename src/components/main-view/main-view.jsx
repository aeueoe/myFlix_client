import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducer/movies";

import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { MovieView } from "../movie-view/movie-view";
import { MoviesList } from "../movies-list/movies-list";
import { MovieCard } from "../movie-card/movie-card";
import { GenreView } from "../movie-view/genre-view";
import { FavoritesView } from "../profile-view/favorites-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { DirectorView } from "../director-view/director-view";
import { Container, Row, Col } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const movies = useSelector((state) => state.movies.list);

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const dispatch = useDispatch();

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movieapi-aeueoes-projects.vercel.app/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          description: movie.description,
          countryOfOrigin: movie.countryOfOrigin,
          imagePath: movie.imagePath,
          featured: movie.featured,
          releaseYear: movie.releaseYear,
          iMDb_Rating: movie.iMDb_Rating,
          rottenTomatoesRating: movie.rottenTomatoesRating,
          runtime: movie.runtime,
          language: movie.language,
          genre: {
            name: movie.genre.name,
            description: movie.genre.description,
          },
          director: {
            name: movie.Director.Name,
          },
          actors: movie.actors.map((actor) => ({
            name: actor.name,
            character: actor.character,
          })),
          awards: movie.awards
            ? movie.awards.map((award) => ({
                name: award.name,
                year: award.year,
                wins: award.wins,
                nominations: award.nominations,
                description: award.description,
              }))
            : [],
        }));

        dispatch(setMovies(moviesFromApi));
        console.log(moviesFromApi);

        const genresFromApi = data.map((movie) => {
          return { name: movie.genre.name };
        });
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      ></NavigationBar>
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
              path="/"
              element={
                !user ? <Navigate to="/login" replace /> : <MoviesList />
              }
            />
            <Route path="/movies" element={<MoviesList movies={movies} />} />
            <Route
              path="/movies"
              element={<MovieCard movies={movies} user={user} />}
            />
            <Route
              path="/movies/:title"
              element={
                <MovieView
                  movie={movies.find((movie) => movie.title === ":title")}
                />
              }
            />
            <Route
              path="/directors/:directorName"
              element={<DirectorView token={token} />}
            />
            <Route
              path="/genres/:genreName"
              element={<GenreView token={token} />}
            />
            <Route
              path="/users/:Username"
              element={<ProfileView user={user} />}
            />
            <Route
              path="/users/:Username/favoriteMovies"
              element={<FavoritesView user={user} />}
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
