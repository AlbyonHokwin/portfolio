import React from 'react';
import styles from '@/styles/MovingLine.module.css';

import { motion } from 'framer-motion';

import type { CSSProperties } from 'react';

type propsType = {
    size : CSSProperties['height' | 'width'];
    startAngle: number;
    rotateDuration: CSSProperties['animationDuration'] | number;
    color: CSSProperties['color'];
}

function MovingLine({ size, startAngle, rotateDuration, color }: propsType) {
    return (
        <motion.div
            style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: '50%',
                rotate: startAngle,
                borderTop: `5px solid`,
                borderColor: color
            }}
            animate={{
                scale: [1.0, 1.05],
                rotate: startAngle + 360,
            }}
            transition={{
                scale: {
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                },
                rotate: {
                    duration: rotateDuration,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                }
            }}
        ></motion.div>
    );
};

export default MovingLine;
