import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://movieapi-aeueoes-projects.vercel.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.errors.map((e) => e.msg).join(", "));
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.user) {
          alert("Signup Successful");
          navigate("/login");
        } else {
          setError("Signup failed. Please try again.");
        }
      })
      .catch((error) => {
        setError(error.message);
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
          <h2 className="auth-title">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signUpUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={5}
                className="auth-input"
              />
            </Form.Group>
            <Form.Group controlId="signUpPassword">
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
            <Form.Group controlId="signUpEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </Form.Group>
            <Form.Group controlId="signUpBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="auth-input"
              />
            </Form.Group>
            <Button type="submit" className="auth-btn" variant="primary">
              Sign Up
            </Button>
            {error && <div className="auth-error">{error}</div>}
            <div className="auth-footer">
              <span>Already a member?</span>
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="auth-link-btn"
              >
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
