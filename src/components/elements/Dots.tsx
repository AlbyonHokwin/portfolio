import React from 'react';
import styles from '@/styles/Dots.module.css';

type propsType = {
    length: number;
    currentSlide: number;
    onClick: (i: number) => void;
}

function Dots({ length, currentSlide, onClick }: propsType) {
    return (
        <div className={styles.dots}>
            {[...Array(length)].map((v, i) => {
                const isActive: boolean = currentSlide === i;

                return (
                    <button
                        key={i}
                        className={`${styles.dot} ${isActive && styles.active}`}
                        onClick={() => onClick(i)}
                    ></button>
                )
            })}
        </div>
    )
};

export default Dots;