import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = () => {
  const location = useLocation();
  const movie = location.state.movie;

  return (
    <Container className="movie-view">
      <Row>
        <Col md={4}>
          <Image
            src={movie.imagePath}
            alt={`${movie.title} poster`}
            className="w-100"
          />
        </Col>
        <Col md={8}>
          <h1>{movie.title}</h1>
          <p>
            <strong>Description:</strong> {movie.description}
          </p>
          <p>
            <strong>Genre:</strong> {movie.genre.name}
          </p>
          <p>
            <strong>Director:</strong>{" "}
            <Link to={`/directors/${movie.director.name}`}>
              {movie.director.name}
            </Link>
          </p>
          <p>
            <strong>Country of Origin:</strong> {movie.countryOfOrigin}
          </p>
          <p>
            <strong>Release Year:</strong> {movie.releaseYear}
          </p>
          <p>
            <strong>IMDb Rating:</strong> {movie.iMDb_Rating}
          </p>
          <p>
            <strong>Rotten Tomatoes Rating:</strong>{" "}
            {movie.rottenTomatoesRating}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime}
          </p>
          <p>
            <strong>Language:</strong> {movie.language}
          </p>
          <p>
            <strong>Cast:</strong>
            <ul>
              {movie.actors.map((actor) => (
                <li key={actor.name}>
                  {actor.name} as {actor.character}
                </li>
              ))}
            </ul>
          </p>
          <p>
            <strong>Awards:</strong>
            <ul>
              {movie.awards.map((award) => (
                <li key={award.name}>
                  {award.name} ({award.year}) - {award.wins} wins,{" "}
                  {award.nominations} nominations
                  <br />
                  <p>{award.description}</p>
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
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    actors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        character: PropTypes.string.isRequired,
      })
    ).isRequired,
    CountryOfOrigin: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.number.isRequired,
    IMDb_Rating: PropTypes.string.isRequired,
    RottenTomatoesRating: PropTypes.string.isRequired,
    Runtime: PropTypes.string.isRequired,
    Language: PropTypes.string.isRequired,
  }).isRequired,
};
