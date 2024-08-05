import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile, setToken } from "../../redux/reducer/user";

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
        if (data.user && data.token) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          dispatch(setUserProfile(data.user));
          dispatch(setToken(data.token));
          onLoggedIn(data.user, data.token);
          navigate("/movies");
          window.location.reload();
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
    <Container className="auth-container">
      <Row className="justify-content-center">
        <div
          className="text-center mb-4"
          style={{ fontSize: "34px", fontWeight: "bold", color: "#f39c12" }}
        >
          myFlix
        </div>

        <Col md={6} className="auth-form-container">
          <h2 className="auth-title">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={5}
                required
                className="auth-input"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
                className="auth-input"
              />
            </Form.Group>
            <Button type="submit" className="auth-btn" variant="primary">
              Login
            </Button>
            {error && <div className="auth-error">{error}</div>}
            <div className="auth-footer">
              <span>New here?</span>
              <Button
                variant="outline"
                onClick={() => navigate("/signup")}
                className="auth-link-btn"
              >
                Signup
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
