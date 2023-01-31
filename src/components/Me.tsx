import React, { useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/Me.module.css'

import type { imageType } from '@/types/imageType'
import type { socialType } from '@/types/socialType'
import { setTimeout } from 'timers'

type propsType = {
    picture: imageType;
    pictureGit: imageType;
    socials: socialType[];
}

function Me({ picture, pictureGit, socials }: propsType) {
    const [pictureStyle, setPictureStyle] = useState<React.CSSProperties>({});
    const [gitPictureStyle, setGitPictureStyle] = useState<React.CSSProperties>({});
    const [isFlip, setIsFlip] = useState(false);

    const github = socials.filter(social => /github/i.test(social.name))[0];

    const flipCard = () => {
        setPictureStyle({ transform: "rotateY(180deg)", transition: "0.7s", opacity: 0 });
        setGitPictureStyle({ transform: "rotateY(180deg)", transition: "0.7s", opacity: 1 });
        setIsFlip(true);
    }

    const deflipCard = () => {
        setPictureStyle({});
        setGitPictureStyle({});
        setIsFlip(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.flipContainer}
                onTouchStart={flipCard}
                onTouchEnd={deflipCard}
                onMouseEnter={flipCard}
                onMouseLeave={deflipCard}
                onMouseOut={deflipCard}
            >
                <div className={`${styles.picture} ${styles.flipCard}`} style={pictureStyle}>
                    <Image
                        style={{ objectFit: "cover" }}
                        src={picture.url}
                        alt={picture.alt}
                        fill={true}
                        sizes="(max-width: 350px) 300px, 50vmin"
                    />
                </div>
                {github && <a href={github.url} className={`${styles.git} ${styles.flipCard}`} style={gitPictureStyle}>
                    <Image
                        style={{ objectFit: "cover" }}
                        src={pictureGit.url}
                        alt={pictureGit.alt}
                        fill={true}
                        sizes="(max-width: 350px) 300px, 50vmin"
                    />
                </a>}
                {github && isFlip && <div className={styles.overlayImage}>
                    <Image
                        style={{ objectFit: "cover", /* padding: "2px 3px 4px 3px" */ }}
                        src={github.image.url}
                        alt={github.image.alt}
                        fill={true}
                        sizes="80px"
                    />
                </div>}
            </div>
        </div>
    )
}

export default Me