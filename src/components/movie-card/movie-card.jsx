import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducer/user";

export const MovieCard = ({ movie, onMovieClick }) => {
  const user = useSelector((state) => state.user.userProfile);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

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
    id: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
