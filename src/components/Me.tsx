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
        setTimeout(() => setIsFlip(true), 500);
    }

    const deflipCard = () => {
        setPictureStyle({});
        setGitPictureStyle({});
        setIsFlip(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.flipContainer}
                onMouseEnter={flipCard}
                onMouseLeave={deflipCard}
            >
                <div className={`${styles.picture} ${styles.flipContainer}`} style={pictureStyle}>
                    <Image
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                        src={picture.url}
                        alt={picture.alt}
                        fill={true}
                        sizes="30vw"
                    />
                </div>
                {github && <a href={github.url} className={`${styles.git} ${styles.flipContainer}`} style={gitPictureStyle}>
                    {isFlip && <Image
                        style={{ borderRadius: "50%" }}
                        className={styles.overlayImage}
                        src={github.image.url}
                        alt={github.image.alt}
                        width={80}
                        height={80}
                    />}
                    <Image
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                        src={pictureGit.url}
                        alt={pictureGit.alt}
                        fill={true}
                        sizes="30vw"
                        onTransitionEnd={() => console.log('end')}
                    />
                </a>}
            </div>
        </div>
    )
}

export default Me