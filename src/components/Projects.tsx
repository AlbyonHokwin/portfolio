import React from 'react'
import styles from '@/styles/Projects.module.css'
import type { projectType } from '@/types/projectType';

import Project from './elements/Project';

type propsType = {
    projects: projectType[];
}

function Projects({ projects }: propsType) {
    return (
        <div className={styles.container}>
            {projects.map((project, i) => {
                return <Project key={i} project={project} />
            })}
        </div>
    )
}

export default Projects