import React from 'react';
import styles from '@/styles/Experience.module.css';
import Image from 'next/image';
import Skill from '@/components/elements/Skill';
import { PortableText } from '@portabletext/react'

import type { experienceType } from '@/types/experienceType';

type propsType = {
    experience: experienceType;
}

function Experience({ experience }: propsType) {
    const {
        jobTitle,
        company,
        description,
        location,
        industry,
        startDate,
        endDate,
        logo,
        skills,
    } = experience;

    const startDateStr: string = Intl.DateTimeFormat(undefined, {month: 'long', year: 'numeric'}).format(new Date(startDate));
    const endDateStr: string = Intl.DateTimeFormat(undefined, {month: 'long', year: 'numeric'}).format(new Date(endDate));

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image
                    style={{ objectFit: "contain" }}
                    className={styles.image}
                    src={logo.url}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                />
            </div>
            <div className={styles.titleContainer}>
                <h3 className={styles.title}>{jobTitle}</h3>
                <h3 className={styles.company}>{company}</h3>
                <div className={styles.dates}>
                    <p>
                        <time className={styles.date}>{startDateStr}</time>
                        <span> à </span>
                        <time className={styles.date}>{endDateStr}</time>
                    </p>
                </div>
            </div>
            <div className={styles.skills}>
                {skills.map((skill, i) => {
                    return (<Skill key={i} skill={skill} />);
                })}
            </div>

            <div className={styles.description}>
                <PortableText value={description} />
            </div>

        </div>
    )
}

export default Experience