import React from 'react'
import styles from '@/styles/Experiences.module.css'
import type { experienceType } from '@/types/experienceType';

type propsType = {
    experiences: experienceType[];
}

function Experiences({ experiences }: propsType) {
    return (
        <div className={styles.container}>
            {experiences[0].jobTitle}
        </div>
    )
}

export default Experiences