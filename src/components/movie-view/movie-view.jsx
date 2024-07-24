import { React, useState} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Button, ToggleButton} from "react-bootstrap";
import { useSelector } from "react-redux";
import {useParams} from "react-router";
import {useDispatch} from "react-redux";
import {setUserProfile, setToken} from "../../redux/reducer/user";



export const MovieView = ({ movies }) => {
  let user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

    const [checked, setChecked] = useState(
    user.favorites.indexOf(movie.id) > -1 ? true : false
  );

  console.log(user.favorites.indexOf(movie.id));

  console.log(checked);


   //Delete Movie From User's Favorites List
  const delFav = () => {
    {
      fetch(
        `https://movieapi-aeueoes-projects.vercel.app/users/${user.username}/favoriteMovies/${movie.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: 'DELETE',
        }
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data));
        });
    }
  };

  //Add Movie to User's Favorites List
  const addFav = () => {
    {
      fetch(
        `https://movieapi-aeueoes-projects.vercel.app/users/${user.username}/favoriteMovies/${movie.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: 'PUT',
        }
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data));
        });
    }
  };


  return (
    <Container className="movie-view">
      <Row className="justify-content-center">
        <Col md={6}>
          <Image
            src={movie.imagePath}
            alt={`${movie.title} poster`}
            className="img-fluid"
          />
        </Col>
        <Col md={6}>
          <h2>{movieData.title}</h2>
          <p>
            <strong>Description:</strong> {movie.description}
          </p>
          <p>
            <strong>Genre:</strong> {movie.genre.name}
          </p>
          <p>
            <strong>Director:</strong>{" "}
            <Link
              to={`/directors/${movie.director.name}`}
              state={{ director: movie.director }}
            >
              {movieData.director.name}
            </Link>
          </p>
          <p>
            <strong>Country of Origin:</strong> {movie.countryOfOrigin}
          </p>
          <p>
            <strong>Release Year:</strong> {movie.releaseYear}
          </p>
          <p>
            <strong>IMDb:</strong> {movie.iMDb_Rating}
          </p>
          <p>
            <strong>Rotten Tomatoes :</strong> {movie.rottenTomatoesRating}
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
              {movie.actors.map((actor, index) => (
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
              {movie.awards.map((award) => (
                <li key={award.name}>
                  {award.name} ({award.year}) - {award.wins} wins,{" "}
                  {award.nominations} nominations
                  <br />
                  <span>{award.description}</span>
                </li>
              ))}
            </ul>
          </p>
              <ToggleButton
                id={movie.id}
                className="mb-2 movie-view--favorites-button"
                type="checkbox"
                variant="outline-primary"
                checked={checked}
                value={checked}
                onChange={() => {
                  setChecked(!checked);
                  if (!user.favorites) {
                    return;
                  } else if (user.favorites.indexOf(movie.id) > -1) {
                    delFav();
                  } else {
                    addFav();
                  }
                }}
              >
                Favorite
              </ToggleButton>
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
