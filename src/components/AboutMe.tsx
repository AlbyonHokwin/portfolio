import React from 'react';
import styles from '@/styles/AboutMe.module.css';
import { motion } from 'framer-motion';

import type { profileType } from '@/types/profileType';

type propsType = {
    description: profileType['description'];
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

function AboutMe({ description }: propsType) {
    return (
        <motion.div className={styles.container}
            initial='hidden'
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
                A propos de moi
            </motion.div>
        </motion.div>
    )
};

export default AboutMe;