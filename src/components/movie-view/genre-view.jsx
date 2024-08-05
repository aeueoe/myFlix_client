import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const GenreView = ({ token }) => {
  const { genreName } = useParams();
  const [genre, setGenre] = useState(null);
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies.list);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const response = await fetch(
          `https://movieapi-aeueoes-projects.vercel.app/movies/genres/${genreName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setGenre(data);
        } else {
          console.error("Error fetching genre:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching genre:", error);
      }
    })();
  }, [token, genreName]);

  const sameGenreMovies = movies.filter(
    (movie) => movie.genre.name === genreName
  );

  return (
    <div className="view-container genre-view">
      <Container>
        <Row>
          <Col md={8}>
            <h2>{genre?.name}</h2>
            <p>
              <strong>Description:</strong> {genre?.description}
            </p>
            <p>
              <strong>Other films from this genre:</strong>
              <ul className="similar-movies">
                {sameGenreMovies.map((movie) => (
                  <li key={movie.title}>
                    <Link to={`/movies/${movie.title}`} state={{ movie }}>
                      {movie.title}
                    </Link>
                  </li>
                ))}
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

GenreView.propTypes = {
  token: PropTypes.string.isRequired,
};
