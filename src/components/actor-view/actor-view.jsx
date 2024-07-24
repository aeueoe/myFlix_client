import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const ActorView = ({ token }) => {
  const { actorName } = useParams();
  const navigate = useNavigate();
  const [actor, setActor] = useState(null);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const response = await fetch(
          `https://movieapi-aeueoes-projects.vercel.app/actors/${actorName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setActor(data);
      } catch (error) {
        console.error("Error fetching actor:", error);
      }
    })();
  }, [token, actorName]);

  if (!actor) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="actor-view">
      <Row>
        <Col md={8}>
          <h1>{actor.name}</h1>
          <p>
            <strong>Bio:</strong> {actor.bio}
          </p>
          <p>
            <strong>Birth:</strong> {actor.birth}
          </p>
          {actor.death && actor.death !== "0" && (
            <p>
              <strong>Death:</strong> {actor.death}
            </p>
          )}
          <p>
            <strong>Awards:</strong>
            <ul>
              {actor.awards.map((award) => (
                <li key={award.name}>
                  {award.name} ({award.year})
                  <br />
                  <span>{award.description}</span>
                </li>
              ))}
            </ul>
          </p>
          <p>
            <strong>Other Films:</strong>
            <ul>
              {actor.movies &&
                actor.movies.map((film) => <li key={film}>{film}</li>)}
            </ul>
          </p>
          <button onClick={() => navigate(-1)} className="mt-3 d-inline-block">
            Back
          </button>
        </Col>
      </Row>
    </Container>
  );
};

ActorView.propTypes = {
  token: PropTypes.string.isRequired,
};
