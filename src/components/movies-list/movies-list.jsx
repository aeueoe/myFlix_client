import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./movies-list.scss";

export const MoviesList = ({ movies }) => {
  const [visibleMovies, setVisibleMovies] = useState(4);
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie.title}`, { state: { movie } });
  };

  const showMoreMovies = () => {
    setVisibleMovies((prevVisible) => prevVisible + 4);
  };

  return (
    <>
      <Row className="mb-3"></Row>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {movies.slice(0, visibleMovies).map((movie) => (
          <Col key={movie.title}>
            <MovieCard movie={movie} onMovieClick={handleMovieClick} />
          </Col>
        ))}
      </Row>
      {movies.length > visibleMovies && (
        <div className="text-center mt-5">
          <Button onClick={showMoreMovies}>Show more</Button>
        </div>
      )}
    </>
  );
};
