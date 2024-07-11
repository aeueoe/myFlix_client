import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "Sunset Boulevard",
      Description:
        "A screenwriter is hired to rework a faded movie star's script, only to find himself becoming involved in her life.",
      Genre: {
        Name: "Drama",
        Description:
          "Drama films are a genre of narrative fiction that are used to dramatize and depict real life themes and situations.",
      },
      Director: {
        Name: "Billy Wilder",
        Bio: "Billy Wilder was an Austrian-born American filmmaker, screenwriter, and producer.",
        Birth: "June 22, 1906",
        Death: "2002",
      },
      ImagePath:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Sunset_Boulevard_%281950_poster%29.jpg/220px-Sunset_Boulevard_%281950_poster%29.jpg",
      Featured: true,
      ReleaseYear: "1950",
      RatingIMDb: "8.4",
      Cast: [
        { Name: "Gloria Swanson", Character: "Norma Desmond" },
        { Name: "William Holden", Character: "Joe Gillis" },
      ],
    },
    {
      id: 2,
      Title: "The Royal Tenenbaums",
      Description:
        "An estranged family of former child prodigies reunites when their father announces he is terminally ill.",
      Genre: {
        Name: "Comedy",
        Description:
          "Comedy films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.",
      },
      Director: {
        Name: "Wes Anderson",
        Bio: "Wesley Wales Anderson is an American film director, screenwriter, and producer known for his quirky, visually distinctive, and often humorous films.",
        Birth: "1969",
      },
      ImagePath:
        "https://m.media-amazon.com/images/M/MV5BMjI2MTI0NTU1M15BMl5BanBnXkFtZTgwMTgzMTM5NDM@._V1_.jpg",
      Featured: true,
      ReleaseYear: 2001,
      RatingIMDb: "7.6",
      Cast: [
        { Name: "Gene Hackman", Character: "Royal Tenenbaum" },
        { Name: "Anjelica Huston", Character: "Etheline Tenenbaum" },
      ],
    },
    {
      id: 3,
      Title: "Pulp Fiction",
      Description:
        "The lives of two mob hitmen, a boxer, a pair of diner bandits, and a pair of philosophical hitmen intertwine in four tales of violence and redemption.",
      Genre: {
        Name: "Crime",
        Description:
          "Crime films are a genre of film that focus on the lives of criminals.",
      },
      Director: {
        Name: "Quentin Tarantino",
        Bio: "Quentin Jerome Tarantino is an American film director, writer, and actor.",
        Birth: "1963",
        Death: null,
      },
      ImagePath:
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      Featured: true,
      ReleaseYear: 1994,
      RatingIMDb: "8.9",
      Cast: [
        { Name: "Uma Thurman", Character: "Mia Wallace" },
        { Name: "John Travolta", Character: "Vincent Vega" },
        { Name: "Bruce Willis", Character: "Butch Coolidge" },
      ],
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
};
