import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    (async () =>
      fetch("https://movieapi-aeueoes-projects.vercel.app/movies")
        .then((response) => response.json())
        .then((movies) => {
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
        }))();
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
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
    </div>
  );
};
