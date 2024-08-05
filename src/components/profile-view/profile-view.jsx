import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Form, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile, setToken } from "../../redux/reducer/user";
import PropTypes from "prop-types";

export const ProfileView = ({ user }) => {
  const [userInfo, setUserInfo] = useState("");
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [error, setError] = useState(null);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(parseInt(timestamp, 10));
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };

  const [username, setUsername] = useState(user?.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.Email || "");
  const [birthday, setBirthday] = useState(
    formatDate(user?.Birthday?.$date?.$numberLong) || ""
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    fetch("https://movieapi-aeueoes-projects.vercel.app/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setEmail(data.Email || email);
        setBirthday(formatDate(data.Birthday?.$date?.$numberLong) || birthday);
        setUsername(data.Username || username);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [token, username]);

  const updateUser = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
      favoriteMovies: [],
    };

    fetch(
      `https://movieapi-aeueoes-projects.vercel.app/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    ).then((response) => {
      if (response.ok) {
        alert(
          "User Info Successfully Updated! Please Logout to See the Updated Information Reflected in Your Account"
        );
      } else {
        alert("User Update Failed");
      }
    });
  };

  const deregister = async (e) => {
    e.preventDefault();

    if (
      !window.confirm(
        "Are you sure you want to delete this account? This action is not reversible!"
      )
    ) {
      return;
    }

    if (!token) {
      alert("Token is missing or invalid. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `https://movieapi-aeueoes-projects.vercel.app/users/${user.Username}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Account deleted successfully!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      } else {
        const errorData = await response.json();
        alert(
          `Account deletion failed: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Account deletion failed: " + error.message);
    }
  };

  return (
    <Container className="profile-container">
      <Row className="justify-content-center">
        <Col md={8} className="profile-form-container">
          <h2 className="profile-title">Profile</h2>
          <Form onSubmit={updateUser}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="profile-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="profile-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="profile-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="profile-input"
              />
            </Form.Group>
            <div className="button-group">
              <Button className="profile-btn" variant="success" type="submit">
                Update User
              </Button>
              <Button
                className="profile-btn"
                variant="danger"
                onClick={deregister}
              >
                Delete User
              </Button>
            </div>
          </Form>
          {error && <div className="profile-error">{error}</div>}
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.shape.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.shape({
      $date: PropTypes.shape({
        $numberLong: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    favoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        $oid: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ProfileView;
