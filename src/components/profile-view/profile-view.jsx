import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EditProfile } from "./edit-profile";
import { Button, Form } from "react-bootstrap";

export const ProfileView = ({ user, token }) => {
  const [username, setUsername] = useState(user.Username || "");
  const [favoriteMovies, setFavoriteMovies] = useState(
    user.FavoriteMovies || []
  );

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <h3>Favorite Movies:</h3>
      <ul>fav</ul>
      <Button as={Link} to="/edit-profile">
        Edit Profile
      </Button>
    </div>
  );
};
