import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./card.module.css";

export default function Card() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const getFilterType = () => {
        const path = location.pathname;
        switch (path) {
            case "/series":
                return "Scripted"; // TVMaze API uses 'Scripted' for series
            case "/reality":
                return "Reality";
            case "/animation":
                return "Animation";
            case "/documentary":
                return "Documentary";
            case "/talkshow":
                return "Talk Show";
            case "/gameshow":
                return "Game Show";
            case "/movies":
                return "Movie"; // TVMaze API uses 'Movie' (not 'Movies')
            default:
                return null; // This will show all items for /all route
        }
    };
    /*
              switch(path) {
              case '/series': return 'Scripted';  // TVMaze API uses 'Scripted' for series
              case '/reality': return 'Reality';
              case '/animation': return 'Animation';
              case '/documentary': return 'Documentary';
              case '/talkshow': return 'Talk Show';
              case '/gameshow': return 'Game Show';
              case '/movies': return 'Movie';     // TVMaze API uses 'Movie' (not 'Movies')
              default: return null; // This will show all items for /all route
          } */

    const filterType = getFilterType();

    useEffect(() => {
        setLoading(true);
        fetch("https://api.tvmaze.com/shows")
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.slice(0, 300));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (movies.length > 0) {
            // Add this to see what types are actually in your data
            const uniqueTypes = [...new Set(movies.map((movie) => movie.type))];
            console.log("Available types in API:", uniqueTypes);

            if (filterType) {
                const filtered = movies.filter(
                    (movie) =>
                        movie.type && movie.type.toLowerCase() === filterType.toLowerCase()
                );
                console.log(
                    `Filtering for: ${filterType}, Found: ${filtered.length} items`
                );
                setFilteredMovies(filtered);
            } else {
                setFilteredMovies(movies);
            }
        }
    }, [movies, filterType]);

    const handleMovieClick = (movieId) => {
        navigate(`/show/${movieId}`);
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading movies...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <div
                            className={styles.movieCard}
                            key={movie.id}
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <img src={movie.image?.medium} alt={movie.name} />
                            <div className={styles.overlay}>
                                <h3>{movie.name}</h3>
                                <p>Rating: {movie.rating.average || "N/A"}</p>
                                {movie.type && (
                                    <span className={styles.typeTag}>{movie.type}</span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.noResults}>
                        <p>No movies found for this type.</p>
                        <button
                            onClick={() => navigate("/movies")}
                            className={styles.backToAll}
                        >
                            Show All Movies
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
