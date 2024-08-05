import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const DirectorView = ({ token }) => {
  const { directorName } = useParams();
  const [director, setDirector] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const response = await fetch(
          `https://movieapi-aeueoes-projects.vercel.app/directors/${directorName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setDirector(data);
        } else {
          console.error("Error fetching director:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching director:", error);
      }
    })();
  }, [token, directorName]);

  if (!director) {
    return <div>Loading...</div>; // or a loading spinner, etc.
  }

  return (
    <div className="view-container director-view">
      <Container>
        <Row>
          <Col md={8}>
            <h2>{director.name}</h2>
            <p>
              <strong>Bio:</strong> {director.bio}
            </p>
            <p>
              <strong>Birth:</strong> {director.birth}
            </p>
            {director.death && director.death !== "0" && (
              <p>
                <strong>Death:</strong> {director.death}
              </p>
            )}
            <p>
              <strong>Country:</strong> {director.country}
            </p>
            <p>
              <strong>Other Films:</strong>
              <ul className="other-films">
                {director.otherFilms &&
                  director.otherFilms.map((film) => <li key={film}>{film}</li>)}
              </ul>
            </p>
            <hr />
            <div>
              <Link to="/" className="back-link" onClick={() => navigate(-1)}>
                Back
              </Link>
            </div>
            <div>
              <Link to="/" className="back-link">
                Home
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

DirectorView.propTypes = {
  token: PropTypes.string.isRequired,
};
