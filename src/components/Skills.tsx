import React from 'react';
import styles from '@/styles/Skills.module.css';
import Skill from './elements/Skill';
import type { skillType } from '@/types/skillType';

type propsType = {
    skills: skillType[];
}

function Skills({ skills }: propsType) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Compétences</h2>
            <div className={styles.skillsContainer}>
                <div className={styles.skills}>
                    {skills.map((skill, i) => {
                        return (<Skill
                            key={i}
                            skill={skill}
                            size={100}
                        />);
                    })}
                </div>
            </div>
        </div>
    )
}

export default Skills