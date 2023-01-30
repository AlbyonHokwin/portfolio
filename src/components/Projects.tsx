import React from 'react'
import styles from '@/styles/Projects.module.css'
import type { projectType } from '@/types/projectType';

import Project from './modules/Project';

type propsType = {
    projects: projectType[];
}

function Projects({ projects }: propsType) {
    return (
        <div className={styles.container}>
            <h2>Projets</h2>
            <div className={styles.projects}>
                {projects.map((project, i) => {
                    return (
                        <section key={i} className={styles.section}>
                            <Project project={project} />
                        </section>)
                })}
            </div>
        </div>
    )
}

export default Projects