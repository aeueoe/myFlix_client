import React, { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducer/user";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user.userObject);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://movieapi-aeueoes-projects.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password");
        }
        return response.json();
      })
      .then((data) => {
        // Log the response data to see its structure
        console.log("API response:", data);

        // Check if the expected fields are present in the response
        if (data.user && data.token) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          dispatch(setUser(data.user));
          dispatch(setToken(data.token));
          onLoggedIn(data.user, data.token);
          navigate("/movies");
        } else {
          throw new Error("Invalid response data");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.error("Login Error:", error);
      });
  };

  return (
    <Container className="login-section mb-4 p-4">
      <Row className="justify-content-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
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
          <Button className="submit-btn" type="submit" variant="primary">
            Login
          </Button>
          {error && (
            <div className="error" style={{ color: "red" }}>
              {error}
            </div>
          )}
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
