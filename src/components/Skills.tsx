import React from 'react';
import styles from '@/styles/Skills.module.css';
import Skill from './elements/Skill';
import { motion } from 'framer-motion';

import type { skillType } from '@/types/skillType';

type propsType = {
    skills: skillType[];
}

const containerVariant = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.05,
        }
    }
}

const skillVariants = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0 },
    transition: { type: "spring", stiffness: 300, damping: 24 }
}

function Skills({ skills }: propsType) {
    return (
        <div className={styles.container}>
            <motion.h2
                initial={{ opacity: 0, x: '-50vw' }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                Compétences
            </motion.h2>

            <div className={styles.skillsContainer}>
                <motion.div className={styles.skills}
                    variants={containerVariant}
                    initial="hidden"
                    whileInView="show"
                >
                    {skills.map((skill, i) => {
                        return (
                            <motion.div key={i} className={styles.skill}
                                variants={skillVariants}
                            >
                                <Skill skill={skill} maxSize={100} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    )
}

export default Skills