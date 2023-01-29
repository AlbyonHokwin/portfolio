import React from 'react'
import styles from '@/styles/Skill.module.css'
import Image from 'next/image';

import type { skillType } from '@/types/skillType';

type propsType = {
    skill: skillType;
    size?: number;
}

function Skill({ skill, size = 60 }: propsType) {
    const sizeStyle = { height: size, width: size };
    return (
        <div className={styles.skill} style={sizeStyle}>
            <Image
                style={{ objectFit: "contain", padding: size * 0.2 }}
                src={skill.image.url}
                alt={skill.image.alt}
                width={size}
                height={size}
            />
            <div className={styles.skillName}>{skill.skill}</div>
        </div>
    );
};

export default Skill;