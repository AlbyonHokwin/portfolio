import React from 'react'
import styles from '@/styles/Skill.module.css'
import Image from 'next/image';

import type { skillType } from '@/types/skillType';

type propsType = {
    skill: skillType;
}

function Skill({ skill }: propsType) {
    return (
        <div className={styles.skill}>
            <Image
                style={{ objectFit: "contain" }}
                src={skill.image.url}
                alt={skill.image.alt}
                width={40}
                height={40}
            />
            <div className={styles.skillName}>{skill.skill}</div>
        </div>
    );
};

export default Skill;