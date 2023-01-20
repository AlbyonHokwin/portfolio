import React from 'react'
import Image from 'next/image'
import styles from '@/styles/Me.module.css'

import type { imageType } from '@/types/imageType'
import type { socialType } from '@/types/socialType'

type propsType = {
    picture: imageType;
    pictureGit: imageType;
    socials: socialType[];
}

function Me({ picture, pictureGit, socials }: propsType) {
    const linkedIn = socials.filter(social => /linkedin/i.test(social.name))[0];
    const github = socials.filter(social => /github/i.test(social.name))[0];

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                    src={picture.url}
                    alt={picture.alt}
                    fill={true}
                    sizes="30vw"
                />
            </div>
            <a href={github ? github.url : '#'} className={styles.imageContainer} >
                <Image
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                    src={pictureGit.url}
                    alt={pictureGit.alt}
                    fill={true}
                    sizes="30vw"
                />
                {github && <Image
                    style={{ objectFit: "cover", borderRadius: "50%", /* backgroundColor: "gray", opacity: 0.8  */ }}
                    className={styles.hoverImage}
                    src={github.image.url}
                    alt={github.image.alt}
                    fill={true}
                    sizes="30vw"
                />}
            </a>
        </div>
    )
}

export default Me