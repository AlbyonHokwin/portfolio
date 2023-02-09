import React from 'react';

import { motion, useMotionValue, useTransform } from 'framer-motion';

import type { CSSProperties } from 'react';

type propsType = {
    size: CSSProperties['height' | 'width'];
    startAngle: number;
    rotateDuration: CSSProperties['animationDuration'] | number;
    color: CSSProperties['color'];
    scrollYProgress: ReturnType<typeof useMotionValue<number>>;
    numOfPages: number;
}


function MovingLine({ size, startAngle, rotateDuration, color, scrollYProgress, numOfPages }: propsType) {
    let opacityCircle = useMotionValue(1);
    let opacityLine = useMotionValue(1);
    let rotateLine = useMotionValue(-45);
    let threshold: number = 1;

    numOfPages > 1 && (threshold = 1 / (numOfPages - 1));

    opacityCircle = useTransform(scrollYProgress,
        [0, threshold, 1],
        [1, 0, 0],
    );
    opacityLine = useTransform(scrollYProgress,
        [0, threshold, 1],
        [0, 1, 1],
    );
    rotateLine = useTransform(scrollYProgress,
        [0, threshold, 1],
        [-45, -45, 45],
    );

    return (
        <>
            <motion.div
                style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    borderTopStyle: 'solid',
                    borderColor: color,
                    borderTopWidth: 5,
                    rotate: startAngle,
                    opacity: opacityCircle,
                    willChange: 'rotate, opacity, scale',
                }}
                animate={{
                    rotate: startAngle + 360,
                    scale: [1, 1.05]
                }}
                transition={{
                    rotate: {
                        duration: rotateDuration,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                    },
                    scale: {
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror",
                    },
                }}
            >
            </motion.div >
            <motion.div
                style={{
                    position: 'absolute',
                    width: '500vmin',
                    height: '50vmin',
                    borderRadius: '0%',
                    borderTopStyle: 'solid',
                    borderColor: color,
                    borderTopWidth: 30,
                    translateY: startAngle,
                    rotate: rotateLine,
                    opacity: opacityLine,
                    willChange: 'rotate, opacity, scale',
                }}
                animate={{
                    scale: [1, 1.05]
                }}
                transition={{
                    scale: {
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror",
                    },
                }}
            >
            </motion.div >
        </>
    );
};

export default MovingLine;
