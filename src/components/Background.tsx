import React from 'react';
import styles from '@/styles/Background.module.css';
import MovingLine from './elements/MovingLine';

import { motion, useScroll } from 'framer-motion';

type useScrollType = ReturnType<typeof useScroll> | null;

type propsType = {
    mainScroll: useScrollType;
    numOfPages: number;
}

function Background({ mainScroll, numOfPages }: propsType) {
    return (
        <div className={styles.container}>
            <MovingLine numOfPages={numOfPages} scrollYProgress={mainScroll?.scrollYProgress} size='60vmin' startAngle={15} rotateDuration={3} color={'var(--primary)'} />
            <MovingLine numOfPages={numOfPages} scrollYProgress={mainScroll?.scrollYProgress} size='75vmin' startAngle={105} rotateDuration={5} color={'var(--secondary)'} />
            <MovingLine numOfPages={numOfPages} scrollYProgress={mainScroll?.scrollYProgress} size='90vmin' startAngle={195} rotateDuration={7} color={'var(--tertiary)'} />
        </div>
    );
};

export default Background;
