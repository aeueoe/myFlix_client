import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";

export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(filter) ||
      movie.genre.toLowerCase().includes(filter)
  );

  const [visibleMovies, setVisibleMovies] = useState(4);
  const showMoreMovies = useCallback(() => {
    setVisibleMovies((prevVisible) => prevVisible + 4);
  }, [setVisibleMovies]);

  const handleMovieClick = (movie) => {};

  return (
    <>
      <Row>
        <MoviesFilter />
      </Row>
      <Row className="movie-list justify-content-md-center">
        {movies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          filteredMovies.slice(0, visibleMovies).map((movie) => (
            <Col key={movie.id}>
              <MovieCard movie={movie} onMovieClick={handleMovieClick} />
            </Col>
          ))
        )}
      </Row>
      {filteredMovies.length > visibleMovies && (
        <div className="text-center mt-5">
          <Button onClick={showMoreMovies}>Show more</Button>
        </div>
      )}
    </>
  );
};
