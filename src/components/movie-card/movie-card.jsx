import React, { useState, useMemo } from "react";
import { Card, Button, ToggleButton } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector, useDispatch } from "react-redux";

export const MovieCard = ({ movie, onMovieClick }) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [checked, setChecked] = useState(
    user && user.favorites.indexOf(movie.id) > -1
  );

  const filteredMovies = useMemo(() => {
    const filter = "";
    return movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(filter) ||
        movie.genre.toLowerCase().includes(filter)
    );
  }, [movies]);

  const delFav = () => {
    fetch(
      `https://movieapi-aeueoes-projects.vercel.app/users/${user.username}/favoriteMovies/${movie.id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete movie from favorites");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      })
      .catch((error) => {
        console.error("Error deleting movie from favorites:", error);
      });
  };

  const addFav = () => {
    fetch(
      `https://movieapi-aeueoes-projects.vercel.app/users/${user.username}/favoriteMovies/${movie.id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        method: "PUT",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie to favorites");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      })
      .catch((error) => {
        console.error("Error adding movie to favorites:", error);
      });
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
          <ToggleButton
            id={movie.title}
            className="movie-card--favorites-button mb-2"
            type="checkbox"
            variant="outline-primary"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              if (!user.favorites) {
                return;
              } else if (user.favorites.indexOf(movie.id) > -1) {
                delFav();
              } else {
                addFav();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-bookmark-heart"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"
              />
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
            </svg>
          </ToggleButton>
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
    id: PropTypes.string.isRequired, // Add id for movie
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired, // Correct prop name
};
