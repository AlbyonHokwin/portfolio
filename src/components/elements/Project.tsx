import React from 'react'
import styles from '@/styles/Project.module.css'
import type { projectType } from '@/types/projectType';

type propsType = {
    project: projectType;
}

function Project({ project }: propsType) {
    return (
        <div className={styles.container}>
            {project.projectTitle}
        </div>
    )
}

export default Project;