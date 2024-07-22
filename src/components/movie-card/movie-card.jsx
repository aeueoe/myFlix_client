import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, token, onFavorite, onMovieClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (
      user &&
      user.FavoriteMovies &&
      user.FavoriteMovies.includes(movie.title)
    ) {
      setIsFavorite(true);
    }
  }, [user, movie.title]);

  const handleFavoriteClick = async () => {
    if (!user || !token) return;

    try {
      if (isFavorite) {
        await axios.delete(
          `/users/${user.Username}/favoriteMovies/${movie.title}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        onFavorite(movie.title, false);
      } else {
        await axios.post(
          `/users/${user.Username}/favoriteMovies/${movie.title}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        onFavorite(movie.title, true);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={movie.imagePath} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          <span>IMDb: {movie.iMDb_Rating}</span>
          <br />
          <span>Rotten Tomatoes: {movie.rottenTomatoesRating}</span>
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Button onClick={() => onMovieClick(movie)} variant="primary">
            Open
          </Button>
          <Button
            onClick={handleFavoriteClick}
            variant={isFavorite ? "danger" : "primary"}
          >
            {isFavorite ? "Unfavorite" : "Favorite"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    iMDb_Rating: PropTypes.string.isRequired,
    rottenTomatoesRating: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
