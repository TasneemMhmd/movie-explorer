import { Heart, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <div className={styles.logo}>
                        <img src="/tv-icon.svg" alt="Logo" className={styles.icon} />
                        <span className={styles.title}>TV Show Explorer</span>
                    </div>
                    <p className={styles.description}>
                        Discover and explore your favorite TV shows and series from around
                        the world.
                    </p>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Quick Links</h3>
                    <ul className={styles.linkList}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/all">All Shows</Link>
                        </li>
                        <li>
                            <Link to="/series">TV Series</Link>
                        </li>

                    </ul>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Categories</h3>
                    <ul className={styles.linkList}>
                        <li>
                            <Link to="/animation">Animation</Link>
                        </li>
                        <li>
                            <Link to="/documentary">Documentaries</Link>
                        </li>
                        <li>
                            <Link to="/reality">Reality Shows</Link>
                        </li>                      <li>
                            <Link to="/talkshow">Talk Shows</Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Connect</h3>
                    <div className={styles.socialLinks}>
                        <a href="https://github.com/TasneemMhmd " aria-label="GitHub">
                            <Github size={20} />
                        </a>
                        <a href="mailto:tassnemm70@gmail.com" aria-label="Email">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <div className={styles.container}>
                    <p className={styles.copyright}>
                        © {currentYear} TV Show Explorer. Made with{" "}
                        <Heart size={16} className={styles.heartIcon} /> for TV enthusiasts.
                    </p>
                    <p className={styles.attribution}>
                        Data provided by{" "}
                        <a
                            href="https://www.tvmaze.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            TVMaze API
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
