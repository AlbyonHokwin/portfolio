import React, { useEffect } from 'react';

import { motion, useMotionValue, useMotionValueEvent, useTransform, useAnimationControls } from 'framer-motion';

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
    let width = useMotionValue(size);
    let height = useMotionValue(size);
    let rotate = useMotionValue(startAngle);
    let borderTopWidth = useMotionValue(5);
    let translateY = useMotionValue(0);
    let threshold: number = 1;

    numOfPages > 1 && (threshold = 1 / (numOfPages - 1));

    const controls = useAnimationControls();

    useEffect(() => {
        controls.start({
            rotate: startAngle + 360,
            scale: [1, 1.05]
        });
    }, [controls, startAngle]);

    useMotionValueEvent(scrollYProgress, 'change', value => {
        if (value >= threshold) {
            controls.stop();
            controls.start({
                scale: [1, 1.05]
            });
        } else {
            controls.stop();
            controls.start({
                rotate: startAngle + 360,
                scale: [1, 1.05]
            });
        }
    })

    width = useTransform(scrollYProgress,
        [0, threshold, 1],
        [size, '500vmin', '500vmin']
    );
    height = useTransform(scrollYProgress,
        [0, threshold, 1],
        [size, '50vmin', '50vmin']
    );
    rotate = useTransform(scrollYProgress,
        [0, threshold, 1],
        [startAngle, -45, 45]
    );
    borderTopWidth = useTransform(scrollYProgress,
        [0, threshold, 1],
        [5, 20, 40]
    );
    translateY = useTransform(scrollYProgress,
        [0, threshold, 1],
        [0, -startAngle, -startAngle]
    );

    return (
        <motion.div
            style={{
                position: 'absolute',
                width,
                height,
                borderRadius: '50%',
                borderTopStyle: 'solid',
                borderColor: color,
                borderTopWidth,
                rotate,
                translateY,
            }}
            animate={controls}
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
    );
};

export default MovingLine;
