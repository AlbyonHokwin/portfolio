import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import styles from '@/styles/ProjectWithCarousel.module.css'
import Image from 'next/image';
import Skill from '@/components/elements/Skill';
import { PortableText } from '@portabletext/react'

import "keen-slider/keen-slider.min.css"
import { useKeenSlider, KeenSliderPlugin, TrackDetails } from "keen-slider/react"

import type { projectType } from '@/types/projectType';

type propsType = {
    project: projectType;
}

function ProjectWithCarousel({ project }: propsType) {
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

    const [slidesPerView, setSlidesPerView] = useState<number>(1);
    const [imageHeight, setImageHeight] = useState<number>(0);
    const [imagesContainerRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: "snap",
        slides: { origin: 'center', perView: slidesPerView, spacing: 15 },
        created(slider) {
            setImageHeight(slider.container.clientHeight)
            setSlidesPerView(Math.max(1, slider.size / (slider.container.clientHeight * mainImage.aspect)));
        },
        detailsChanged(slider) {
            setImageHeight(slider.container.clientHeight)
            setSlidesPerView(Math.max(1, slider.size / (slider.container.clientHeight * mainImage.aspect)));
        },
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
                <div className={`keen-slider ${styles.images}`} ref={imagesContainerRef}>
                    {video &&
                        <iframe
                            className={`keen-slider__slide ${styles.video}`}
                            src={video}
                            allow="autoplay; fullscreen"
                            loading='lazy'
                            height={imageHeight}
                            width={imageHeight * mainImage.aspect}
                        />
                    }
                    <Image
                        style={{ objectFit: "cover" }}
                        className={`keen-slider__slide ${styles.image}`}
                        src={mainImage.url}
                        alt={mainImage.alt}
                        width={mainImage.width}
                        height={mainImage.height}
                    />
                    {images.map((image, i) => {
                        return (
                            <Image
                                key={i}
                                style={{ objectFit: "cover" }}
                                className={`keen-slider__slide ${styles.image}`}
                                src={image.url}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                            />
                        )
                    })}
                </div>

                <div className={styles.skills}>
                    {skills.map((skill, i) => {
                        return (
                            <div key={i} className={styles.skill}>
                                <Skill skill={skill} maxSize={60} />
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

export default ProjectWithCarousel;