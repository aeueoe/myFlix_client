import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { EditProfile } from "../profile-view/edit-profile";
import { MovieView } from "../movie-view/movie-view";
import { MoviesList } from "../movies-list/movies-list";
import { MovieCard } from "../movie-card/movie-card";
import { DirectorView } from "../director-view/director-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const handleFavorite = (movieTitle, isAdding) => {
    const updatedUser = {
      ...user,
      FavoriteMovies: isAdding
        ? [...user.FavoriteMovies, movieTitle]
        : user.FavoriteMovies.filter((title) => title !== movieTitle),
    };
    setUser(updatedUser);
  };

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const response = await fetch(
          "https://movieapi-aeueoes-projects.vercel.app/movies",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        const moviesApi = data.map((movie) => ({
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
            actor: actor.name,
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

        setMovies(moviesApi);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    })();
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row>
        <Col>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <MoviesList movies={movies} />
                  )}
                </>
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
            <Route path="/signup" element={<SignupView />} />
            <Route
              path="/users/:Username"
              element={
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  onLogout={handleLogout}
                />
              }
            />
            <Route
              path="/edit-profile"
              element={<EditProfile user={user} token={token} />}
            />
            <Route
              path="/movies"
              element={
                <MoviesList movies={movies} onFavorite={handleFavorite} />
              }
            />
            <Route
              path="/movies"
              element={
                <MovieCard
                  movies={movies}
                  user={user}
                  token={token}
                  onFavorite={handleFavorite}
                />
              }
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
          </Routes>
        </Col>
      </Row>
    </BrowserRouter>
  );
};
