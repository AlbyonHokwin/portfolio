import React, { useState } from 'react'
import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars, faX } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleShowMenu = () => setShowMenu(!showMenu);

    return (
        <nav className={styles.container}>
            <Link href="#me">
                <FontAwesomeIcon icon={faHome} className={styles.homeIcon} />
            </Link>

            <div className={`${styles.menuSection} ${showMenu && styles.open}`}>
                <ul>
                    <li>
                        <Link href="#projects">Projets</Link>
                    </li>
                    <li>
                        <Link href="#experiences">Expériences</Link>
                    </li>
                    <li>
                        <Link href="#skills">Compétences</Link>
                    </li>
                    <li>
                        <Link href="#contact">Contact</Link>
                    </li>
                </ul>
            </div>

            <FontAwesomeIcon
                icon={showMenu ? faX : faBars}
                className={styles.menuIcon}
                onClick={handleShowMenu}
            />

        </nav>
    )
}

export default Navbar