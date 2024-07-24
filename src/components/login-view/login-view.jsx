import React, { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUserProfile } from "../../redux/reducer/user";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    fetch("https://movieapi-aeueoes-projects.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          dispatch(setUserProfile(data.user));
          dispatch(setToken(data.token));
          onLoggedIn(data.user, data.token);
        } else {
          alert("Username or password is incorrect");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Container className="login-section mb-4 p-4">
      <Row className="justify-content-center">
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
          <Button className="submit-btn" type="submit">
            Login
          </Button>

          {error && <div className="error">{error}</div>}

          <div>New here? Sign up now!</div>
          <Button
            className="submit-btn"
            variant="outline-primary"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </Form>
      </Row>
    </Container>
  );
};
