import React, { useEffect, useState } from 'react';
import styles from '@/styles/Projects.module.css'
import type { projectType } from '@/types/projectType';
import { motion } from 'framer-motion';
import { isMobile as deviceIsMobile } from 'react-device-detect';

import Project from './modules/Project';

type propsType = {
    projects: projectType[];
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

function Projects({ projects }: propsType) {
    const [isMobile, setIsMobile] = useState<boolean>(true);

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
                Projets
            </motion.h2>

            <motion.div className={styles.projects} variants={variants}>
                {projects.map((project, i) => {
                    return (
                        <section key={i} className={styles.section}>
                            <Project project={project} />
                        </section>)
                })}
            </motion.div>
        </motion.div>
    )
}

export default Projects