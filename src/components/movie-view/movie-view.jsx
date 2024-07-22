import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movie }) => {
  const location = useLocation();
  const movieData = movie || location.state.movie; // Use prop or location state

  if (!movieData) {
    return <p>Loading...</p>; // Handle case where movie data is not available
  }

  return (
    <Container className="movie-view">
      <Row>
        <Col md={4}>
          <Image
            src={movieData.imagePath}
            alt={`${movieData.title} poster`}
            className="w-100"
          />
        </Col>
        <Col md={8}>
          <h1>{movieData.title}</h1>
          <p>
            <strong>Description:</strong> {movieData.description}
          </p>
          <p>
            <strong>Genre:</strong> {movieData.genre.name}
          </p>
          <p>
            <strong>Director:</strong>{" "}
            <Link
              to={`/directors/${movieData.director.name}`}
              state={{ director: movieData.director }}
            >
              {movieData.director.name}
            </Link>
          </p>
          <p>
            <strong>Country of Origin:</strong> {movieData.countryOfOrigin}
          </p>
          <p>
            <strong>Release Year:</strong> {movieData.releaseYear}
          </p>
          <p>
            <strong>IMDb Rating:</strong> {movieData.iMDb_Rating}
          </p>
          <p>
            <strong>Rotten Tomatoes Rating:</strong>{" "}
            {movieData.rottenTomatoesRating}
          </p>
          <p>
            <strong>Runtime:</strong> {movieData.runtime}
          </p>
          <p>
            <strong>Language:</strong> {movieData.language}
          </p>
          <p>
            <strong>Cast:</strong>
            <ul>
              {movieData.actors.map((actor, index) => (
                <li key={index}>
                  <Link to={`/actors/${actor.name}`}>{actor.name}</Link> as{" "}
                  {actor.character}
                </li>
              ))}
            </ul>
          </p>
          <p>
            <strong>Awards:</strong>
            <ul>
              {movieData.awards.map((award) => (
                <li key={award.name}>
                  {award.name} ({award.year}) - {award.wins} wins,{" "}
                  {award.nominations} nominations
                  <br />
                  <span>{award.description}</span>
                </li>
              ))}
            </ul>
          </p>
          <Link to="/" className="mt-3 d-inline-block">
            Back
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    actors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        character: PropTypes.string.isRequired,
      })
    ).isRequired,
    countryOfOrigin: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    iMDb_Rating: PropTypes.string.isRequired,
    rottenTomatoesRating: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  }),
};
