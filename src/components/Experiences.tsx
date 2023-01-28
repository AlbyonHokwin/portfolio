import React from 'react';
import styles from '@/styles/Experiences.module.css';
import Experience from './modules/Experience';

import type { experienceType } from '@/types/experienceType';

type propsType = {
    experiences: experienceType[];
}

function Experiences({ experiences }: propsType) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Expériences</h2>
            <div className={styles.experiences}>
                {experiences.map((experience, i) => {
                    return (
                        <section key={i} className={styles.section}>
                            <Experience experience={experience} />
                        </section>)
                })}
            </div>
        </div>
    )
}

export default Experiences