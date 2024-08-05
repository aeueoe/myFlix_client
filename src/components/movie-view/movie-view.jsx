import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export const MovieView = () => {
  const location = useLocation();
  const movie = location.state.movie;
  const movies = useSelector((state) => state.movies.list);
  const { movieTitle } = useParams();
  const navigate = useNavigate();

  return (
    <div className="view-container movie-view ">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card.Img
              variant="top"
              className="movie-image"
              src={movie.imagePath}
              alt={movie.title}
            />
          </Col>
          <Col md={6}>
            <div className="movie-details">
              <h2>{movie.title}</h2>
              <p>
                <strong>Description:</strong> {movie.description}
              </p>
              <p>
                <strong>Genre:</strong>{" "}
                <Link to={`/genres/${movie.genre.name}`}>
                  {movie.genre.name}
                </Link>
              </p>
              <p>
                <strong>Director:</strong>{" "}
                <Link to={`/directors/${movie.director.name}`}>
                  {movie.director.name}
                </Link>
              </p>
              <p>
                <strong>Release Year:</strong> {movie.releaseYear}
              </p>
              <p>
                <strong>IMDb:</strong> {movie.iMDb_Rating}
              </p>
              <p>
                <strong>Rotten Tomatoes:</strong> {movie.rottenTomatoesRating}
              </p>
              <p>
                <strong>Runtime:</strong> {movie.runtime}
              </p>
              <p>
                <strong>Language:</strong> {movie.language}
              </p>
              <p>
                <strong>Country of Origin:</strong> {movie.countryOfOrigin}
              </p>
              <p>
                <strong>Cast:</strong>
                <ul className="cast-films">
                  {movie.actors.map((actor) => (
                    <li key={actor.name}>
                      <span className="value"> {actor.name}</span> as{" "}
                      {actor.character}
                    </li>
                  ))}
                </ul>
              </p>
              <p>
                <strong>Awards:</strong>
                <ul className="awards">
                  {movie.awards.map((award) => (
                    <li key={award.name}>
                      <span className="value">{award.name}</span> ({award.year})
                      - {award.wins} wins, {award.nominations} nominations
                      <br />
                      <span>{award.description}</span>
                    </li>
                  ))}
                </ul>
              </p>
              <Link to="/" className="back-link" onClick={() => navigate(-1)}>
                Back
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
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
    awards: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        wins: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
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
