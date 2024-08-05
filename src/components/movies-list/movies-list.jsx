import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MoviesFilter } from "../movies-list/movies-filter";
import { MovieCard } from "../movie-card/movie-card";

export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const [visibleMovies, setVisibleMovies] = useState(4);

  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();
  const filteredMovies =
    filter === ""
      ? movies
      : movies.filter(
          (movie) => movie.title && movie.title.toLowerCase().includes(filter)
        );

  const navigate = useNavigate();

  const showMoreMovies = () => {
    setVisibleMovies((prevVisible) => prevVisible + 4);
  };

  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie.title}`, { state: { movie } });
  };

  return (
    <>
      <div className="movies-list">
        <Row className="search">
          <Col className="mx-auto mt-3" xs={12} sm={10} md={8} lg={6}>
            <MoviesFilter />
          </Col>
        </Row>
        <Row>
          {filteredMovies.slice(0, visibleMovies).map((movie) => (
            <Col
              className="mb-3 d-flex"
              key={movie.title}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <MovieCard
                movie={movie}
                onMovieClick={handleMovieClick}
                user={user}
              />
            </Col>
          ))}
        </Row>
        {filteredMovies.length > visibleMovies && (
          <div className="text-center mt-3 mb-3">
            <Button className="show-more" onClick={showMoreMovies}>
              Show more
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
