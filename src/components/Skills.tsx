import React from 'react';
import styles from '@/styles/Skills.module.css';
import Skill from './elements/Skill';
import { motion } from 'framer-motion';

import type { skillType } from '@/types/skillType';

type propsType = {
    skills: skillType[];
}

const titleVariants = {
    hidden: {
        x: '-100vw',
        transition: { duration: 0.5 },
    },
    visible: {
        x: 0,
        transition: { duration: 0.5 },
    }
}

const containerVariants = {
    hidden: {
        transition: { duration: 0.5 },
    },
    visible: {
        transition: {
            staggerChildren: 0.05,
        }
    }
}

const skillVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    transition: { type: "spring", stiffness: 300, damping: 24 }
}

function Skills({ skills }: propsType) {
    return (
        <motion.div className={styles.container}
            initial='hidden'
            whileInView='visible'
            transition={{
                delayChildren: 0.1,
                staggerChildren: 0.5,
            }}
        >
            <motion.h2 variants={titleVariants}>
                Compétences
            </motion.h2>

            <div className={styles.skillsContainer}>
                <motion.div className={styles.skills} variants={containerVariants}>
                    {skills.map((skill, i) => {
                        return (
                            <motion.div key={i} className={styles.skill} variants={skillVariants}>
                                <Skill skill={skill} maxSize={100} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Skills