import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./movieCard.module.css";

export default function MoviesCard() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://api.tvmaze.com/shows")
            .then((res) => res.json())
            .then((data) => setMovies(data.slice(0, 300)));
    }, []);

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <div className={styles.card}>
            {movies.map((movie) => (
                <div 
                    className={styles.movieCard} 
                    key={movie.id}
                    onClick={() => handleMovieClick(movie.id)}
                >
                    <img src={movie.image?.medium} alt={movie.name} />
                    <div className={styles.overlay}>
                        <h3>{movie.name}</h3>
                        <p>Rating: {movie.rating.average || "N/A"}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}