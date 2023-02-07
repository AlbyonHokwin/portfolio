import React from 'react';
import styles from '@/styles/Arrow.module.css';

type propsType = {
    disabled?: boolean;
    left?: boolean;
    onClick: (e: any) => void;
}

function Arrow({ disabled, left, onClick }: propsType) {
    return (
        <svg
            onClick={disabled ? undefined : onClick}
            className={`${styles.arrow} ${left ? styles.left : styles.right
                } ${disabled && styles.disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
};

export default Arrow;