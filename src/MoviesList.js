import React from 'react';
import './MoviesList.css';

function MoviesList({movies, selectedMovie, onSelectMovie}) {

    return (
        <div className='moviesList'>
            {!!movies && movies.map(movie => (
                <p
                    key={movie.episode_id}
                    className={selectedMovie == movie.url ? 'selected' : ''}
                    onClick={() => onSelectMovie(movie.url)}>{movie.title}</p>
            ))}
        </div>
    );
}

export default MoviesList;
