import React from 'react';
import styles from '@/styles/Experience.module.css';

import type { experienceType } from '@/types/experienceType';

type propsType = {
    experience: experienceType;
}

function Experience({ experience }: propsType) {
    return (
        <div>Experience</div>
    )
}

export default Experience