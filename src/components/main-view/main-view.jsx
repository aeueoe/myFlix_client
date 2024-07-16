import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
        const movies = await response.json();
        const moviesApi = movies.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            imagePath: movie.ImagePath,
            genre: movie.Genre,
            director: movie.Director,
          };
        });
        setMovies(moviesApi);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [token]);

  if (!user) {
    return (
      <>
        Login
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        Sign Up
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return (
      <>
        <div>The list is empty</div>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};
