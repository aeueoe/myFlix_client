import PropType from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

MovieCard.propTypes = {
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
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }).isRequired,
    ReleaseYear: PropTypes.number.isRequired,
    IMDb_Rating: PropTypes.string.isRequired,
    RottenTomatoesRating: PropTypes.string.isRequired,
    Actors: PropTypes.arrayOf(
      PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Character: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
