import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({
  favoriteMovies,
  user,
  token,
  onMovieClick,
  onUpdateFavorites,
}) => {
  const handleRemoveFavorite = async (movieTitle) => {
    try {
      await axios.delete(
        `/users/${user.Username}/favoriteMovies/${movieTitle}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdateFavorites(movieId);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div>
      <h3>Favorite Movies</h3>
      <Row>
        {favoriteMovies.length === 0 ? (
          <p>No favorite movies added yet.</p>
        ) : (
          favoriteMovies.map((movie) => (
            <Col md={4} key={movie.title}>
              <MovieCard
                movie={movie}
                onMovieClick={onMovieClick}
                onRemoveFavorite={() => handleRemoveFavorite(movie.title)}
              />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
      iMDb_Rating: PropTypes.string.isRequired,
      rottenTomatoesRating: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  onMovieClick: PropTypes.func.isRequired,
  onUpdateFavorites: PropTypes.func.isRequired,
};
