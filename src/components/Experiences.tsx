import React from 'react';
import styles from '@/styles/Experiences.module.css';
import Experience from './modules/Experience';
import { motion } from 'framer-motion';

import type { experienceType } from '@/types/experienceType';

type propsType = {
    experiences: experienceType[];
}

const experiencesVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.5,
        },
    },
}

const experienceVariants = {
    hidden: { opacity: 0, x: 1000 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 }
    },
}

function Experiences({ experiences }: propsType) {
    return (
        <div className={styles.container}>
            <motion.h2
                initial={{ opacity: 0, x: '-50vw' }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Expériences
            </motion.h2>

            <motion.div className={styles.experiences}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={experiencesVariants}
            >
                {experiences.map((experience, i) => {
                    return (
                        <motion.section key={i} className={styles.section} variants={experienceVariants}>
                            <Experience experience={experience} />
                        </motion.section>)
                })}
            </motion.div>
        </div>
    )
}

export default Experiences