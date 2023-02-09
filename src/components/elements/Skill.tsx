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
                style={{ objectFit: "contain", padding: "15%" }}
                src={skill.image.url}
                alt={skill.image.alt}
                fill
                sizes={`${maxSize}px`}
                // height={maxSize}
                // width={maxSize}
            />
            <div className={styles.skillName}>
                <h3>{skill.skill}</h3>
            </div>
        </div>
    );
};

export default Skill;