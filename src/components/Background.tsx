import React from 'react';
import styles from '@/styles/Background.module.css';
import MovingLine from './elements/MovingLine';

function Background() {
    return (
        <div className={styles.container}>
            <MovingLine size='60vmin' startAngle={15} rotateDuration={3} color={'var(--primary)'} />
            <MovingLine size='70vmin' startAngle={105} rotateDuration={5} color={'var(--secondary)'} />
            <MovingLine size='80vmin' startAngle={195} rotateDuration={7} color={'var(--tertiary)'} />
        </div>
    );
};

export default Background;
