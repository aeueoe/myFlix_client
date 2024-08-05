import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { MoviesFilter } from "../movies-list/movies-filter";
import { MovieCard } from "../movie-card/movie-card";

export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const [visibleMovies, setVisibleMovies] = useState(4);
  const [showTopButton, setShowTopButton] = useState(false);

  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();
  const filteredMovies =
    filter === ""
      ? movies
      : movies.filter(
          (movie) => movie.title && movie.title.toLowerCase().includes(filter)
        );

  const navigate = useNavigate();

  const showMoreMovies = () => {
    setVisibleMovies((prevVisible) => prevVisible + 4);
  };

  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie.title}`, { state: { movie } });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="movies-list">
        <Row className="search">
          <Col className="mx-auto mt-3" xs={12} sm={10} md={8} lg={6}>
            <MoviesFilter />
          </Col>
        </Row>
        <Row>
          {filteredMovies.slice(0, visibleMovies).map((movie) => (
            <Col
              className="mb-3 d-flex"
              key={movie.title}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <MovieCard
                movie={movie}
                onMovieClick={handleMovieClick}
                user={user}
              />
            </Col>
          ))}
        </Row>
        {filteredMovies.length > visibleMovies && (
          <div className="text-center mt-3 mb-5">
            <Button className="show-more" onClick={showMoreMovies}>
              Show more
            </Button>
          </div>
        )}
        {showTopButton && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="30"
            fill="currentColor"
            class="bi bi-arrow-up"
            viewBox="0 0 16 16"
            className="top-button"
            onClick={handleScrollToTop}
          >
            <path
              fill-rule="evenodd"
              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
            />
          </svg>
        )}
      </div>
    </>
  );
};
