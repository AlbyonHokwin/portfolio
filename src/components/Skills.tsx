import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Skills.module.css';
import Skill from './elements/Skill';

import type { skillType } from '@/types/skillType';

type propsType = {
    skills: skillType[];
}

function Skills({ skills }: propsType) {
    const skillsContainerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<number>(0);
    const numOfSkillOnRow = 3;

    useEffect(() => {
        if (skillsContainerRef.current) {
            let calculatedSize = Math.min(Math.floor(0.85 * skillsContainerRef.current.clientWidth / numOfSkillOnRow), 100);
            setSize(calculatedSize);
        }
    }, [skillsContainerRef]);



    return (
        <div className={styles.container}>
            <h2>Compétences</h2>
            <div className={styles.skillsContainer} ref={skillsContainerRef}>
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