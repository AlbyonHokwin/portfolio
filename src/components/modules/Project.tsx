import React, { useEffect, useRef, useState } from 'react'
import styles from '@/styles/Project.module.css'
import Image from 'next/image';
import Skill from '@/components/elements/Skill';
import { PortableText } from '@portabletext/react'

import type { projectType } from '@/types/projectType';

type propsType = {
    project: projectType;
}

function Project({ project }: propsType) {
    const imagesContainerRef = useRef<HTMLDivElement>(null);
    const [imagesContainerHeight, setImagesContainerHeight] = useState<number>(250);

    const {
        projectTitle,
        description,
        date,
        onProgress,
        mainImage,
        images,
        video,
        githubLinks,
        skills,
    } = project;

    useEffect(() => {
        function updateImagesContainerHeight() {
            if (imagesContainerRef.current && imagesContainerRef.current?.clientHeight !== imagesContainerHeight) {
                setImagesContainerHeight(imagesContainerRef.current.clientHeight);
            }
        }
        
        window.addEventListener('resize', updateImagesContainerHeight);
        updateImagesContainerHeight();

        return () => window.removeEventListener('resize', updateImagesContainerHeight);
    });

    let dateStr: string = '';
    !onProgress && (dateStr = Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(new Date(date)));

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h3 className={styles.title}>{projectTitle}</h3>
                {!onProgress && <time className={styles.date}>(Fini en {dateStr})</time>}
            </div>
            <div className={styles.content}>
                <div className={styles.slider} ref={imagesContainerRef}>
                    {video &&
                        <div className={styles.videoContainer}>
                            <iframe
                                className={styles.video}
                                src={video}
                                allow="fullscreen"
                                loading='lazy'
                                height={imagesContainerHeight}
                                width={imagesContainerHeight * mainImage.aspect}
                            />
                        </div>
                    }
                    <div className={styles.imageContainer} style={{ width: imagesContainerHeight * mainImage.aspect }}>
                        <Image
                            style={{ objectFit: "contain" }}
                            className={styles.image}
                            src={mainImage.url}
                            alt={mainImage.alt}
                            width={mainImage.width}
                            height={mainImage.height}
                        />
                    </div>
                    {images.map((image, i) => {
                        return (
                            <div key={i} className={styles.imageContainer} style={{ width: imagesContainerHeight * mainImage.aspect }}>
                                <Image
                                    style={{ objectFit: "contain" }}
                                    className={styles.image}
                                    src={image.url}
                                    alt={image.alt}
                                    width={image.width}
                                    height={image.height}
                                />
                            </div>
                        )
                    })}
                </div>

                <div className={styles.skills}>
                    {skills.map((skill, i) => {
                        return (
                            <div key={i} className={styles.skill}>
                                <Skill skill={skill} maxSize={50} />
                            </div>
                        );
                    })}
                </div>

                <div className={styles.description}>
                    <PortableText value={description} />
                </div>

                {githubLinks[0] && <div className={styles.linksContainer}>
                    <Image
                        style={{ objectFit: "contain" }}
                        src={'/github.png'}
                        alt="Logo github"
                        width={50}
                        height={50}
                    />
                    <div className={styles.links}>
                        {githubLinks.map((link, i) => {
                            return (
                                <a key={i} href={link.url} className={styles.link}>{link.name}</a>
                            );
                        })}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Project;