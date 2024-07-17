import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://movieapi-aeueoes-projects.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: username,
            Password: password,
          }),
        }
      );

      const data = await response.json();

      if (data.user && data.token) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        setError("No such user");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={5}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Login
      </Button>
    </Form>
  );
};
