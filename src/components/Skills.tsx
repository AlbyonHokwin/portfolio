import React from 'react'
import styles from '@/styles/Skills.module.css'
import type { skillType } from '@/types/skillType';

type propsType = {
    skills: skillType[];
}

function Skills({ skills }: propsType) {
    return (
        <div className={styles.container}>
            {skills[0].skill}
        </div>
    )
}

export default Skills