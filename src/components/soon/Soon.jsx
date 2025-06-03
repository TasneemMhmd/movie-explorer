import { useEffect, useState } from 'react';


export default function Soon() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://api.tvmaze.com/shows")
            .then((res) => res.json())
            .then((data) => setMovies(data.slice(90, 120))); 
    }, []);

    return (
        <div className="movies-container">
            {movies.map((movie) => (
                <div className="movie-card" key={movie.id}>
                    <img src={movie.image?.medium} alt={movie.name} />
                    <h3>{movie.name}</h3>
                    <p>Rating: {movie.rating.average || "N/A"}</p>
                </div>
            ))}
        </div>
    );
}
