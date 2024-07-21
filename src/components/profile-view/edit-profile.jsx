import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

export const EditProfile = ({ user, token }) => {
  const [username, setUsername] = useState(user.Username || "");
  const [password, setPassword] = useState(user.Password || "");
  const [email, setEmail] = useState(user.Email || "");
  const [birthday, setBirthday] = useState(user.Birthday || "01/01/0001");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
    };

    if (birthday !== "01/01/0001") {
      data.Birthday = birthday;
    }

    fetch(
      `https://movieapi-aeueoes-projects.vercel.app/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Profile updated successfully");
          navigate("/user");
        } else {
          alert("Failed to update profile");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("An error occurred while updating the profile.");
      });
  };

  const deregister = (e) => {
    e.preventDefault();
    let response = window.confirm(
      "Are you sure, you want to delete this account?"
    );

    if (response) {
      fetch(
        `https://movieapi-aeueoes-projects.vercel.app/users/${encodeURIComponent(
          user.Username
        )}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          if (response.ok) {
            alert("Account deleted successfully");
            navigate("/");
          } else {
            alert("Failed to delete account");
          }
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          alert("An error occurred while deleting the account.");
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6"
          required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBdate">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Button className="upd-user-btn" type="submit">
        Edit User
      </Button>
      <Button className="delete-user-btn" variant="danger" onClick={deregister}>
        Delete User
      </Button>
    </Form>
  );
};
