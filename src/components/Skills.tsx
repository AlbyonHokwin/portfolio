import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Skills.module.css';
import Skill from './elements/Skill';

import type { skillType } from '@/types/skillType';

type propsType = {
    skills: skillType[];
}

function Skills({ skills }: propsType) {
    return (
        <div className={styles.container}>
            <h2>Compétences</h2>
            <div className={styles.skillsContainer} >
                <div className={styles.skills}>
                    {skills.map((skill, i) => {
                        return (
                            <div key={i} className={styles.skill}>
                                <Skill skill={skill} maxSize={100} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Skills