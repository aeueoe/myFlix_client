import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/reducer/movies";
import axios from "axios";

export const MovieCard = ({ movie, onMovieClick }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));

  const favorites = useSelector((state) => state.movies.favorites);

  const [checked, setChecked] = useState(favorites.includes(movie.id));

  useEffect(() => {
    setChecked(favorites.includes(movie.id));
  }, [favorites, movie.id]);

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        `https://movieapi-aeueoes-projects.vercel.app/users/${user.Username}/favoriteMovies/${movie.id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(addFavorite(movie.id));
        setChecked(true);
        alert(`${movie.title} is added to favouriteList`);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await axios.delete(
        `https://movieapi-aeueoes-projects.vercel.app/users/${user.Username}/favoriteMovies/${movie.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(removeFavorite(movie.id));
        setChecked(false);
        alert(`${movie.title} is removed from favouriteList`);
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const handleToggleFavorite = () => {
    if (checked) {
      handleRemove();
    } else {
      handleAdd();
    }
  };

  return (
    <Card className="movie-card">
      <div className="card-image-container">
        <Card.Img
          variant="top"
          src={movie.imagePath}
          alt={movie.title}
          className="card-image"
        />
      </div>
      <Card.Body className="card-body">
        <Card.Title className="text-truncate">{movie.title}</Card.Title>
        <div className="ratings">
          <div className="rating">
            <i className="bi bi-star-fill"></i>
            <span className="rating-value">IMDb: {movie.iMDb_Rating}</span>
          </div>
          <div className="rating">
            <i className="bi bi-star-fill"></i>
            <span className="rating-value">
              Rotten Tomatoes: {movie.rottenTomatoesRating}
            </span>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="card-footer">
        <Button className="see-more" onClick={() => onMovieClick(movie)}>
          More
        </Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill={checked ? "red" : "grey"}
          className="bi bi-heart-fill heart-icon"
          viewBox="0 0 16 16"
          onClick={handleToggleFavorite}
        >
          <path
            fillRule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
      </Card.Footer>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    iMDb_Rating: PropTypes.string.isRequired,
    rottenTomatoesRating: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
