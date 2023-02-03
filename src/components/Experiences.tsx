import React from 'react';
import styles from '@/styles/Experiences.module.css';
import Experience from './modules/Experience';
import { motion } from 'framer-motion';

import type { experienceType } from '@/types/experienceType';

type propsType = {
    experiences: experienceType[];
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

function Experiences({ experiences }: propsType) {
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
                Expériences
            </motion.h2>

            <motion.div className={styles.experiences} variants={variants}>
                {experiences.map((experience, i) => {
                    return (
                        <section key={i} className={styles.section}>
                            <Experience experience={experience} />
                        </section>)
                })}
            </motion.div>
        </motion.div>
    )
}

export default Experiences