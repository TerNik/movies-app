import React, {useState, useEffect, Fragment} from 'react';
import Loader from './Loader';
//import ReviewForm from './ReviewForm'
import './MovieInfo.css';

function MovieInfo({selectedMovie}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [movie, setMovie] = useState(null);
    const [isFormShown, setIsFormShown] = useState(false);
    const ReviewForm = React.lazy(
        () => new Promise(resolve => {
            resolve(import('./ReviewForm'))
        })
    );

    useEffect(() => {
            setIsLoaded(false);
            setMovie(null);
            setIsFormShown(false);
            selectedMovie && fetch(selectedMovie)
                .then(res => res.json())
                .then(
                    (res) => {
                        setIsLoaded(true);
                        setMovie(res);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }, [selectedMovie]
    );

    return (
        <div className='movieInfo'>
            {selectedMovie && !isLoaded && <Loader/>}
            {!!error && <div>Error: {error.message}</div>}
            {!!movie &&
            <Fragment>
                <h2>{movie.title}</h2>
                <p>
                    <span>Release date: </span>{movie.release_date.substr(8, 2) + '.' + movie.release_date.substr(5, 2) + '.' + movie.release_date.substr(0, 4)}
                </p>
                <p><span>Director: </span>{movie.director}</p>
                <p><span>Producer: </span>{movie.producer}</p>
                <div className='openingCrawl'>
                    <div>{movie.opening_crawl}</div>
                </div>
                {!isFormShown ?
                    <button onClick={() => setIsFormShown(true)}> Live a review</button> :
                    <React.Suspense fallback={<Loader/>}>
                        <ReviewForm selectedMovie={selectedMovie} closeForm={() => setIsFormShown(false)}/>
                    </React.Suspense>
                }
            </Fragment>
            }
        </div>
    );
}

export default MovieInfo;