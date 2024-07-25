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
        const data = await response.json();
        setDirector(data);
      } catch (error) {
        console.error("Error fetching director:", error);
      }
    })();
  }, [token, directorName]);
  if (!director) {
    return <div>Loading...</div>; // or a loading spinner, etc.
  }

  return (
    <Container className="director-view">
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
            <ul>
              {director.otherFilms &&
                director.otherFilms.map((film) => <li key={film}>{film}</li>)}
            </ul>
          </p>

          <Link
            to="/"
            className="mt-3 d-inline-block"
            onClick={() => navigate(-1)}
          >
            Back
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

DirectorView.propTypes = {
  token: PropTypes.string.isRequired,
  director: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
    death: PropTypes.string,
    country: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    otherFilms: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};
