import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoritesView = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const movies = useSelector((state) => state.movies.list);

  const favoriteMovies = movies.filter((m) => {
    return user.favoriteMovies.includes(m.id);
  });

  return (
    <Row>
      <Col>
        <h3>My Favorite Movies</h3>
        <Row className="justify-content-center">
          {favoriteMovies.length === 0 ? (
            <Col>The list is empty!</Col>
          ) : (
            favoriteMovies.map((movie) => (
              <Col className="mb-5" md={3} key={movie.id}>
                <MovieCard movie={movie} user={user} />
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Row>
  );
};
