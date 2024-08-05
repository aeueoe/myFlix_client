import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const FavoritesView = () => {
  const movies = useSelector((state) => state.movies.list);
  const favoriteMovieIds = useSelector((state) => state.movies.favorites);
  const navigate = useNavigate();

  const favoriteMovies = movies.filter((movie) =>
    favoriteMovieIds.includes(movie.id)
  );

  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie.title}`, { state: { movie } });
  };

  return (
    <Row className="favorites-view">
      <Col>
        <h3>My Favorite Movies</h3>
        <Row className="justify-content-center">
          {favoriteMovies.length === 0 ? (
            <Col>The list is empty!</Col>
          ) : (
            favoriteMovies.map((movie) => (
              <Col className="mb-5" xs={6} sm={4} md={3} key={movie.id}>
                <MovieCard movie={movie} onMovieClick={handleMovieClick} />
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default FavoritesView;
