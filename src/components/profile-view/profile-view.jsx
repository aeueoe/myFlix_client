import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Form } from "react-bootstrap";


export const ProfileView = ({ user }) => {
  const [userInfo, setUserInfo] = useState("");
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birth);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch(
      `https://movieapi-aeueoes-projects.vercel.app/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const userFromApi = {
          username: data.username,
        };
        setUserInfo(userFromApi);
      });
  }, [token]);

  const updateUser = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      email: email,
      birth: birthday,
    };

    fetch(
      `https://movieapi-aeueoes-projects.vercel.app/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
        body: JSON.stringify(data),
        method: "PUT",
      }
    ).then((response) => {
      if (response.ok) {
        alert(
          "User Info Successfully Updated! Please Logout to See the Updated Information"
        );
      } else {
        alert("User Update Failed");
      }
    });

    const deregister = (e) => {
      e.preventDefault();
      let response = confirm("Are you sure, you want to delete this account?");
      console.log(response);
      if (response) {
        fetch(
          `https://movieapi-aeueoes-projects.vercel.app/users/${user.Username}`,
          { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
        );
      }
    };

    return (
      <Row>
        <Col md={8}>
          <div className="profile-section mb-4 p-4">
            <h2>Hi, {user.Username}!</h2>
                    <Form onSubmit={updateUser}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={user.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Birth Date</Form.Label>
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

  ProfileViewView.propTypes = {
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birth: PropTypes.string.isRequired,

      favoriteMovies: PropTypes.array.isRequired,
    }).isRequired,
  };
};
