import React from 'react'
import styles from '@/styles/Skill.module.css'
import Image from 'next/image';

import type { skillType } from '@/types/skillType';

type propsType = {
    skill: skillType;
    maxSize?: number;
}

function Skill({ skill, maxSize = 60 }: propsType) {
    return (
        <div className={styles.skill}>
            <Image
                style={{ objectFit: "contain", padding: "20%" }}
                src={skill.image.url}
                alt={skill.image.alt}
                fill={true}
                sizes={`${maxSize}px`}
            />
            <div className={styles.skillName}>{skill.skill}</div>
        </div>
    );
};

export default Skill;