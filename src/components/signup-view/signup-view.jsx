import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://movieapi-aeueoes-projects.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          }),
        }
      );

      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        setError("Signup failed");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="signUpUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
      </Form.Group>
      <Form.Group controlId="signUpPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6"
          required
        />
      </Form.Group>
      <Form.Group controlId="signUpEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="signUpBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Sign Up
      </Button>
    </Form>
  );
};
