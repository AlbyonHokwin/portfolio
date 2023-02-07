import React, { useState } from 'react'
import styles from '@/styles/ProjectWithCarousel.module.css'
import Image from 'next/image';
import Skill from '@/components/elements/Skill';
import Arrow from '@/components/elements/Arrow';
import Dots from '@/components/elements/Dots';
import { PortableText } from '@portabletext/react'

import "keen-slider/keen-slider.min.css"
import { useKeenSlider, KeenSliderPlugin } from 'keen-slider/react';
import type { TrackDetails, TrackInstance } from 'keen-slider/react';

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
    const [track, setTrack] = useState<TrackInstance | null>(null);
    const [details, setDetails] = useState<TrackDetails | null>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [loaded, setLoaded] = useState<boolean>(false);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            loop: true,
            mode: 'snap',
            renderMode: 'performance',
            slides: { origin: 'center', perView: slidesPerView },
            created() {
                setLoaded(true);
            },
            detailsChanged(slider) {
                setDetails(slider.track.details);
                setTrack(slider.track);
                setImageHeight(slider.container.clientHeight);
                setSlidesPerView(Math.max(1, slider.size / (slider.container.clientHeight * mainImage.aspect)));
            },
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel);
            },
        },
    );

    let dateStr: string = '';
    !onProgress && (dateStr = Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(new Date(date)));

    const slideStyle = (i: number) => {
        if (!track || !details) return {};
        const slide = details.slides[i];
        const scaleSize = 0.85;
        const scale = Math.max(scaleSize, 1 - Math.abs(track?.idxToDist(i) || 0));

        return {
            opacity: slide.portion,
            transform: `scale(${scale})`,
            WebkitTransform: `scale(${scale})`,
        }
    }

    const clickOnDot = (i: number) => {
        instanceRef.current?.moveToIdx(i);
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h3 className={styles.title}>{projectTitle}</h3>
                {!onProgress && <time className={styles.date}>(Fini en {dateStr})</time>}
            </div>
            <div className={styles.content}>

                <div className={styles.sliderContainer}>
                    <div className={`keen-slider ${styles.slider}`} ref={sliderRef}>
                        {video &&
                            <div className='keen-slider__slide'>
                                <iframe
                                    style={{ ...slideStyle(0) }}
                                    className={styles.video}
                                    src={video}
                                    allow="autoplay; fullscreen"
                                    loading='lazy'
                                    height={imageHeight}
                                    width={imageHeight * mainImage.aspect}
                                />
                            </div>
                        }
                        <div className='keen-slider__slide'>
                            <Image
                                style={{ objectFit: "cover", ...slideStyle(video ? 1 : 0) }}
                                className={styles.image}
                                src={mainImage.url}
                                alt={mainImage.alt}
                                width={mainImage.width}
                                height={mainImage.height}
                            />
                        </div>
                        {images.map((image, i) => {
                            const idx: number = video ? i + 2 : i + 1;
                            return (
                                <div key={i} className='keen-slider__slide'>
                                    <Image
                                        style={{ objectFit: "cover", ...slideStyle(idx) }}
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
                    {loaded && instanceRef.current && (
                        <>
                            <Arrow
                                left
                                onClick={(e: any) =>
                                    e.stopPropagation() || instanceRef.current?.prev()
                                }
                            />

                            <Arrow
                                onClick={(e: any) =>
                                    e.stopPropagation() || instanceRef.current?.next()
                                }
                            />
                        </>
                    )}
                </div>

                {loaded && instanceRef.current &&
                    <Dots
                        length={instanceRef.current.track.details.slides.length}
                        currentSlide={currentSlide}
                        onClick={clickOnDot}
                    />
                }

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