import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styles from "./slider.module.css";

export default function ShowsSlider() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://api.tvmaze.com/shows")
            .then(res => res.json())
            .then(data => setMovies(data.slice(77,87)));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: true
    };

    const stripHtmlTags = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '');
    };

    const handleShowClick = (showId) => {
        navigate(`/show/${showId}`);
    };

    return (
        <div className={styles.slider}>
            <Slider {...settings}>
                {movies.map(movie => (
                    <div key={movie.id} className={styles.slide}>
                        <div className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.imageSection}>
                                    <div 
                                        className={styles.imageContainer}
                                        onClick={() => handleShowClick(movie.id)}
                                    >
                                        <img
                                            src={movie.image?.medium}
                                            alt={movie.name}
                                            className={styles.image}
                                        />
                                        <div className={styles.imageOverlay}>
                                            <button className={styles.viewDetailsBtn}>
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                    {movie.rating?.average && (
                                        <div className={styles.rating}>
                                            ⭐ {movie.rating.average}
                                        </div>
                                    )}
                                </div>

                                <div className={styles.contentSection}>
                                    <h3 className={styles.title}>{movie.name}</h3>
                                    
                                    {movie.genres && movie.genres.length > 0 && (
                                        <div className={styles.genres}>
                                            {movie.genres.slice(0, 3).map((genre, index) => (
                                                <span key={index} className={styles.genre}>
                                                    {genre}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {movie.premiered && (
                                        <p className={styles.detail}>
                                            <span className={styles.label}>Premiered:</span> {movie.premiered}
                                        </p>
                                    )}

                                    {movie.network?.name && (
                                        <p className={styles.detail}>
                                            <span className={styles.label}>Network:</span> {movie.network.name}
                                        </p>
                                    )}

                                    {movie.status && (
                                        <p className={styles.detail}>
                                            <span className={styles.label}>Status:</span> {movie.status}
                                        </p>
                                    )}

                                    {movie.summary && (
                                        <div className={styles.summary}>
                                            <p className={styles.summaryLabel}>Summary:</p>
                                            <p className={styles.summaryText}>
                                                {stripHtmlTags(movie.summary)}
                                            </p>
                                        </div>
                                    )}

                                    <div className={styles.actionButtons}>
                                        <button 
                                            className={styles.viewBtn}
                                            onClick={() => handleShowClick(movie.id)}
                                        >
                                            View Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}