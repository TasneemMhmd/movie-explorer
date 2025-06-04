import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./details.module.css";

export default function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setMovie(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (!movie) {
        return <div className={styles.error}>Movie not found</div>;
    }

    return (
        <div className={styles.container}>
            <button 
                className={styles.backButton}
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>
            
            <div className={styles.movieDetails}>
                <div className={styles.imageSection}>
                    <img 
                        src={movie.image?.original || movie.image?.medium} 
                        alt={movie.name}
                        className={styles.movieImage}
                    />
                </div>
                
                <div className={styles.infoSection}>
                    <h1 className={styles.title}>{movie.name}</h1>
                    
                    <div className={styles.rating}>
                        ⭐ {movie.rating.average || "N/A"}
                    </div>
                    
                    <div className={styles.genres}>
                        {movie.genres?.map((genre, index) => (
                            <span key={index} className={styles.genre}>
                                {genre}
                            </span>
                        ))}
                    </div>
                    
                    <div className={styles.summary}>
                        <h3>Summary</h3>
                        <div dangerouslySetInnerHTML={{ __html: movie.summary }} />
                    </div>
                    
                    <div className={styles.details}>
                        <div className={styles.detailItem}>
                            <strong>Premiered:</strong> {movie.premiered || "N/A"}
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Status:</strong> {movie.status || "N/A"}
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Language:</strong> {movie.language || "N/A"}
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} min` : "N/A"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}