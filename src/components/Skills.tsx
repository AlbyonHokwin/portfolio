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
            console.log(skillsContainerRef.current.clientWidth);
            let calculatedSize = Math.min(Math.floor(0.85 * skillsContainerRef.current.clientWidth / numOfSkillOnRow), 100);
            setSize(calculatedSize);
        }
    }, [skillsContainerRef]);



    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Compétences</h2>
            <div className={styles.skillsContainer} ref={skillsContainerRef}>
                <div className={styles.skills}>
                    {skills.map((skill, i) => {
                        return (<Skill
                            key={i}
                            skill={skill}
                            size={size}
                        />);
                    })}
                </div>
            </div>
        </div>
    )
}

export default Skills