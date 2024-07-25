import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducer/movies";
import { setUser, setToken } from "../../redux/reducer/user";

import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { MovieView } from "../movie-view/movie-view";
import { MoviesList } from "../movies-list/movies-list";
import { MovieCard } from "../movie-card/movie-card";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { DirectorView } from "../director-view/director-view";
import { Container, Row, Col } from "react-bootstrap";

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userObject);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      dispatch(setUser(storedUser));
    }

    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

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
          id: movie._id.$oid,
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
      });
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
              path="/"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <div className="login-view">
                    <LoginView
                      onLoggedIn={(user, token) => {
                        dispatch(setUser(user));
                        dispatch(setToken(token));
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                      }}
                    />
                  </div>
                )
              }
            />
            <Route
              path="/login"
              element={
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
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
              path="/users/:Username"
              element={<ProfileView user={user} />}
              element={
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  onLoggedOut={() => {
                    dispatch(setUser(null));
                    dispatch(setToken(null));
                    localStorage.clear();
                    navigate("/login", { replace: true });
                  }}
                />
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
