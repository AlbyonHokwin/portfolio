import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { socialType } from '@/types/socialType';

type socialHashIconType = Record<string, IconDefinition>;

const socialHashIcons: socialHashIconType = {
    'GitHub': faGithub,
    'LinkedIn': faLinkedin,
}

type propsType = {
    socials: socialType[];
}

function Navbar({ socials }: propsType) {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleShowMenu = () => setShowMenu(!showMenu);

    return (
        <nav className={styles.container}>
            <Link href="#me">
                <FontAwesomeIcon icon={faHome} className={styles.homeIcon} />
            </Link>

            <ul className={styles.socials}>
                {socials.map((social, i) => {
                    return (
                        <li key={i}>
                            <a href={social.url}>
                                <FontAwesomeIcon icon={socialHashIcons[social.name]} className={styles.socialIcon} />
                            </a>
                        </li>
                    )
                })}
            </ul>

            <ul className={`${styles.menuSection} ${showMenu && styles.open}`}>
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

            <FontAwesomeIcon
                icon={showMenu ? faX : faBars}
                className={styles.menuIcon}
                onClick={handleShowMenu}
            />

        </nav>
    )
}

export default Navbar