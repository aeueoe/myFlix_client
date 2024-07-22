import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FavoriteMovies } from "./fav-movies";

export const ProfileView = ({ user, token, movies }) => {
  const [username, setUsername] = useState(user?.Username || "");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (user && Array.isArray(user.FavoriteMovies) && movies.length > 0) {
      const updatedFavoriteMovies = user.FavoriteMovies.map((movieTitle) =>
        movies.find((movie) => movie.title === movieTitle)
      ).filter((movie) => movie !== undefined);
      setFavoriteMovies(updatedFavoriteMovies);
    }
  }, [user, movies]);

  const handleUpdateFavorites = (movieTitle) => {
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.filter((movie) => movie.title !== movieTitle)
    );
  };

  return (
    <div>
      <h2>Hi, {username}!</h2>
      <FavoriteMovies
        favoriteMovies={favoriteMovies}
        user={user}
        token={token}
        onUpdateFavorites={handleUpdateFavorites}
      />
      <Button as={Link} to="/edit-profile">
        Edit Profile
      </Button>
    </div>
  );
};
