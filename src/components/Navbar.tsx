import React, { RefObject, useState } from 'react'
import styles from '@/styles/Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { socialType } from '@/types/socialType';
import type { refName, refType } from '@/types/refType';

type socialHashIconType = Record<string, IconDefinition>;

const socialHashIcons: socialHashIconType = {
    'GitHub': faGithub,
    'LinkedIn': faLinkedin,
}

const isRefName = (variable: any): variable is refName => (
    typeof variable === 'string'
);

type propsType = {
    socials: socialType[];
    refHome: HTMLElement | null;
    refs: refType;
}

function Navbar({ socials, refHome, refs }: propsType) {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const validKeys: refName[] = [];
    Object.keys(refs).forEach(key => isRefName(key) && validKeys.push(key));

    const handleShowMenu = () => setShowMenu(!showMenu);

    const scrollTo = (ref: HTMLElement | null) => ref?.scrollIntoView({ behavior: 'smooth' });

    return (
        <nav className={styles.container}>
            <FontAwesomeIcon onClick={() => scrollTo(refHome)} icon={faHome} className={styles.homeIcon} />

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
                {validKeys.map((key, i) => {
                    return (
                        <li key={i} onClick={() => scrollTo(refs[key])}>
                            {key}
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