import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";


export const DirectorView = () => {
  const params = useParams();
  const directors = useSelector((state) => state.directors.list);
  const director = directors.find((director) => director.name === params.name);

  if (!director) {
    return <div>Director not found!</div>;
  }

  return (
    <div className="director-view">
      <h1>{director.name}</h1>
      <p>
        <strong>Bio:</strong> {director.bio}
      </p>
      <p>
        <strong>Movies:</strong>
        <ul>
          {director.movies.map((movie) => (
            <li key={movie.title}>
              <Link to={`/movies/${movie.title}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </p>
    </div>
  );
};
