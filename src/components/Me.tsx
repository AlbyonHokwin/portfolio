import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/Me.module.css';

import type { imageType } from '@/types/imageType';
import type { socialType } from '@/types/socialType';

type propsType = {
    picture: imageType;
    pictureGit: imageType;
    socials: socialType[];
}

function Me({ picture, pictureGit, socials }: propsType) {
    console.log(styles);
    const [isFlip, setIsFlip] = useState<boolean>(false);

    const github = socials.filter(social => /github/i.test(social.name))[0];

    const flipCard = () => {
        github && setIsFlip(!isFlip);
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.flipContainer}  ${isFlip && styles.flipped}`}
                onTouchStart={flipCard}
                onTouchEnd={flipCard}
                onMouseEnter={flipCard}
                onMouseLeave={flipCard}
            >
                <div className={styles.front}>
                    <Image
                        style={{ objectFit: "cover" }}
                        src={picture.url}
                        alt={picture.alt}
                        fill={true}
                        sizes="(max-width: 350px) 300px, 50vmin"
                        priority={true}
                    />
                </div>
                {github && <a href={github.url} className={styles.back}>
                    <Image
                        style={{ objectFit: "cover" }}
                        src={pictureGit.url}
                        alt={pictureGit.alt}
                        fill={true}
                        sizes="(max-width: 350px) 300px, 50vmin"
                        priority={true}
                    />
                </a>}
                {github && <div className={`${styles.overlayImage} ${isFlip && styles.flipped}`}>
                    <Image
                        style={{ objectFit: "cover" }}
                        src={github.image.url}
                        alt={github.image.alt}
                        fill={true}
                        sizes="80px"
                    />
                </div>}
                <div className={styles.introContainer}>
                    <h1 className={styles.name}>
                        Camille HAUSTANT
                    </h1>
                    <p className={styles.job}>
                        Développeur Full Stack
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Me