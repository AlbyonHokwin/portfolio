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
        setTimeout(() => setIsFlip(true), 700);
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
            >
                <div className={`${styles.picture} ${styles.flipContainer}`} style={pictureStyle}>
                    <Image
                        style={{ objectFit: "cover" }}
                        src={picture.url}
                        alt={picture.alt}
                        fill={true}
                        sizes="(max-width: 425px) 300px,50vmin"
                    />
                </div>
                {isFlip && <div className={styles.overlayImage}>
                    <Image
                        style={{ borderRadius: "50%" }}
                        src={github.image.url}
                        alt={github.image.alt}
                        width={80}
                        height={80}
                    />
                </div>}
                {github && <a href={github.url} className={`${styles.git} ${styles.flipContainer}`} style={gitPictureStyle}>
                    <Image
                        style={{ objectFit: "cover" }}
                        src={pictureGit.url}
                        alt={pictureGit.alt}
                        fill={true}
                        sizes="50vmin"
                    />
                </a>}
            </div>
        </div>
    )
}

export default Me