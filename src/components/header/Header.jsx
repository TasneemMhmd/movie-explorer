import { useState, useEffect, useRef } from "react";
import { Popcorn, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleLinkClick = () => setIsOpen(false);

    return (
        <nav className={styles.nav}>
            <div className={styles.title}>
                <Popcorn className={styles.icon} />
                <span>Movie Explorer</span>
            </div>

            <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </div>

            <ul
                className={`${styles.menu} ${isOpen ? styles.open : ""}`}
                ref={menuRef}
            >
                <li>
                    <Link to="/" onClick={handleLinkClick}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/movies" onClick={handleLinkClick}>
                        Movies
                    </Link>
                </li>
                <li>
                    <Link to="/soon" onClick={handleLinkClick}>
                        Soon
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
