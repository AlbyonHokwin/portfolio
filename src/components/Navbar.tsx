import React, { RefObject, useState } from 'react'
import Link from 'next/link';
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
    refHome: HTMLElement | null;
    refsMenu: (HTMLElement | null)[];
}

function Navbar({ socials, refHome, refsMenu }: propsType) {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleShowMenu = () => setShowMenu(!showMenu);

    return (
        <nav className={styles.container}>
            <FontAwesomeIcon onClick={() => refHome?.scrollIntoView()} icon={faHome} className={styles.homeIcon} />

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
                {refsMenu.map((ref, i) => {
                    return (
                        <li key={i} onClick={() => ref?.scrollIntoView()}>
                            {ref?.title}
                        </li>
                    );
                })}
            </ul>

            <FontAwesomeIcon
                icon={showMenu ? faX : faBars}
                className={`${styles.menuIcon} ${showMenu && styles.open}`}
                onClick={handleShowMenu}
            />

        </nav>
    )
}

export default Navbar