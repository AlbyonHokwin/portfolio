import React from 'react'
import styles from '@/styles/Projects.module.css'
import type { projectType } from '@/types/projectType';

type propsType = {
    projects: projectType[];
}

function Projects({ projects }: propsType) {
    return (
        <div className={styles.container}>
            {projects[0].projectTitle}
        </div>
    )
}

export default Projects