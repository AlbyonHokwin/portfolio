import React from 'react'
import styles from '@/styles/Projects.module.css'
import type { projectType } from '@/types/projectType';
import { motion } from 'framer-motion';

import Project from './modules/Project';

type propsType = {
    projects: projectType[];
}

const projectsVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.5,
        },
    },
}

const projectVariants = {
    hidden: { opacity: 0, x: 1000 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 }
    },
}

function Projects({ projects }: propsType) {
    return (
        <div className={styles.container}>
            <motion.h2
                initial={{ opacity: 0, x: '-50vw' }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Projets
            </motion.h2>

            <motion.div className={styles.projects}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={projectsVariants}
            >
                {projects.map((project, i) => {
                    return (
                        <motion.section key={i} className={styles.section} variants={projectVariants}>
                            <Project project={project} />
                        </motion.section>)
                })}
            </motion.div>
        </div>
    )
}

export default Projects