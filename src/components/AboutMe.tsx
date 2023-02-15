import React, { useEffect, useState } from 'react';
import styles from '@/styles/AboutMe.module.css';
import Image from 'next/image';
import { PortableText } from '@portabletext/react'
import { motion, MotionProps } from 'framer-motion';
import { isMobile as deviceIsMobile } from 'react-device-detect';

import type { profileType } from '@/types/profileType';

type propsType = {
    description: profileType['description'];
    pictureAboutMe: profileType['pictureAboutMe'];
}

const variants = {
    hidden: {
        x: '-100vw',
        transition: { duration: 0.5 },
    },
    visible: {
        x: 0,
        transition: { duration: 0.5 },
    }
}

function AboutMe({ description, pictureAboutMe }: propsType) {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        setIsMobile(deviceIsMobile);
    }, []);

    return (
        <motion.div className={styles.container}
            animate={isMobile ? 'visible' : 'hidden'}
            whileInView='visible'
            transition={{
                delayChildren: 0.1,
                staggerChildren: 0.2,
            }}
        >
            <motion.h2 variants={variants}>
                A propos
            </motion.h2>

            <motion.div className={styles.aboutMeContainer} variants={variants}>
                <div className={styles.imageContainer}>
                    <Image
                        style={{ objectFit: "cover" }}
                        className={styles.image}
                        src={pictureAboutMe.url}
                        alt={pictureAboutMe.alt}
                        fill={true}
                        sizes="450px"
                        priority={true}
                    />
                </div>

                <div className={styles.description}>
                    <PortableText value={description} />
                </div>

            </motion.div>
        </motion.div >
    )
};

export default AboutMe;