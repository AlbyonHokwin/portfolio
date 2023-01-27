import React from 'react'
import styles from '@/styles/Project.module.css'
import Image from 'next/image';
import { PortableText } from '@portabletext/react'

import type { projectType } from '@/types/projectType';

type propsType = {
    project: projectType;
}

function Project({ project }: propsType) {
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

    return (
        <div className={styles.container}>
            <div className={styles.images}>
                <div className={styles.imageContainer}>
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
                        <div key={i} className={styles.imageContainer}>
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
            <div className={styles.titleContainer}>
                <h3 className={styles.title}>{projectTitle}</h3>
                {!onProgress && <time className={styles.date}>({date})</time>}
            </div>
            <div className={styles.skills}>
                {skills.map((skill, i) => {
                    return (
                        <div key={i} className={styles.skill}>
                            <Image
                                style={{ objectFit: "contain" }}
                                src={skill.image.url}
                                alt={skill.image.alt}
                                width={40}
                                height={40}
                            />
                            <div className={styles.skillName}>{skill.skill}</div>
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
    )
}

export default Project;