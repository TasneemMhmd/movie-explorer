import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import ShowsSlider from "./slider/ShowsSlider";
import Footer from "../footer/Footer";

function ShowRow({ title, type, linkTo }) {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://api.tvmaze.com/shows")
            .then(res => res.json())
            .then(data => {
                let filteredShows = data;
                if (type && type !== 'all') {
                    filteredShows = data.filter(show =>
                        show.type && show.type.toLowerCase() === type.toLowerCase()
                    );
                }
                setShows(filteredShows.slice(0, 8));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [type]);

    const handleShowClick = (showId) => {
        navigate(`/show/${showId}`);
    };

    const handleSeeAll = () => {
        navigate(linkTo);
    };

    if (loading) {
        return (
            <div className={styles.showRow}>
                <h2 className={styles.sectionTitle}>{title}</h2>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    return (
        <div className={styles.showRow}>
            <div className={styles.rowHeader}>
                <h2 className={styles.sectionTitle}>{title}</h2>
                <button className={styles.seeAllButton} onClick={handleSeeAll}>
                    See All →
                </button>
            </div>
            <div className={styles.showGrid}>
                {shows.map(show => (
                    <div
                        key={show.id}
                        className={styles.showCard}
                        onClick={() => handleShowClick(show.id)}
                    >
                        <div className={styles.showImageContainer}>
                            <img
                                src={show.image?.medium || show.image?.original}
                                alt={show.name}
                                className={styles.showImage}
                            />
                            <div className={styles.showOverlay}>
                                <div className={styles.showInfo}>
                                    <h4 className={styles.showTitle}>{show.name}</h4>
                                    {show.rating?.average && (
                                        <div className={styles.showRating}>
                                            ⭐ {show.rating.average}
                                        </div>
                                    )}
                                    {show.type && (
                                        <span className={styles.showType}>{show.type}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <div className={styles.homeContainer}>
            <ShowsSlider />
            <ShowRow
                title="Popular Series"
                type="scripted"
                linkTo="/series"
            />
            <ShowRow
                title="Animated Shows"
                type="animation"
                linkTo="/animation"
            />
            <ShowRow
                title="Reality TV"
                type="reality"
                linkTo="/reality"
            />
            <ShowRow
                title="Documentaries"
                type="documentary"
                linkTo="/documentary"
            />
            <Footer />
        </div>
    );
}