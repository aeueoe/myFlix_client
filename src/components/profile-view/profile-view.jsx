import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

export const ProfileView = ({ user }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(parseInt(timestamp, 10));
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0]; // yyyy-mm-dd
  };

  const [email, setEmail] = useState(user?.Email || "");

  const [username, setUsername] = useState(user?.Username || "");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState(user?.Birthday);
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [error, setError] = useState(null);
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
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            setError(errorData.message);
          });
        } else {
          dispatch(setUser({ ...user, ...data }));
          alert("Profile updated successfully!");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const deregister = () => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      fetch(
        `https://movieapi-aeueoes-projects.vercel.app/users/${user.Username}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            dispatch(setUser(null));
            dispatch(setToken(null));
            alert("Account deleted successfully!");
            navigate("/signup", { replace: true });
          } else {
            alert("Account deletion failed!");
          }
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          alert("Account deletion failed: " + error.message);
        });
    }
  };
  return (
    <Row>
      <Col md={8}>
        <div className="profile-section mb-4 p-4">
          <Form onSubmit={updateUser}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                defaultValue={user.Username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={user.Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
            <Button
              className="update-user--btn"
              variant="success"
              type="submit"
            >
              Update User
            </Button>
            <Button
              className="delete-user--btn"
              variant="danger"
              onClick={deregister}
            >
              Delete User
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.shape({
      $oid: PropTypes.string.isRequired,
    }).isRequired,
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