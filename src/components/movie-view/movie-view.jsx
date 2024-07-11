import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt={`${movie.Title} poster`} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Release Year: </span>
        <span>{movie.ReleaseYear}</span>
      </div>
      <div>
        <span>Rating IMDb: </span>
        <span>{movie.RatingIMDb}</span>
      </div>
      <div>
        <span>Cast: </span>
        <span>
          {movie.Cast.map((cast, index) => (
            <div key={index}>
              <span>
                {cast.Name} as {cast.Character}
              </span>
            </div>
          ))}
        </span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
