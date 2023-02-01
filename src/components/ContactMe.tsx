import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser';
import styles from '@/styles/ContactMe.module.css'
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

type propsType = {
    myEmail: string;
};

const formVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.5,
            staggerChildren: -0.05,
        },
    },
}

const inputVariants = {
    hidden: { opacity: 0, y: -1000 },
    show: { opacity: 1, y: 0 },
}

const EMAIL_REGEX: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
const errorIcon = <FontAwesomeIcon icon={faCircleExclamation} className={styles.errorIcon} />
const spinnerIcon = <FontAwesomeIcon icon={faSpinner} spinPulse />

function ContactMe({ myEmail }: propsType) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, reset, formState, formState: { errors, isSubmitSuccessful } } = useForm<Inputs>({
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    });

    const onSubmit: SubmitHandler<Inputs> = data => {
        setIsLoading(true);
        const params = { myEmail, ...data };
        emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, params, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
            .then(result => {
                if (result.text === 'OK') {
                    alert("Votre message a bien été envoyé.");
                    reset();
                    setIsLoading(false);
                }
            })
            .catch(() => alert("Une erreur s'est produite durant l'envoi, veuillez réessayer."));
    };

    return (
        <div className={styles.container}>
            <motion.h2
                initial={{ opacity: 0, x: '-50vw' }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Me contacter
            </motion.h2>

            <div className={styles.formContainer}>
                <motion.form className={styles.form} onSubmit={handleSubmit(onSubmit)}
                    initial='hidden'
                    whileInView='show'
                    viewport={{ once: true }}
                    variants={formVariants}
                >

                    <motion.div className={styles.inputContainer} variants={inputVariants}>
                        <input className={styles.input} type="text" placeholder="Nom"
                            {...register("name", { required: true, maxLength: 80 })}
                            aria-invalid={errors.name ? 'true' : 'false'}
                        />
                        {errors.name && <div className={styles.error}>{errorIcon}Champ obligatoire</div>}
                    </motion.div>

                    <motion.div className={styles.inputContainer} variants={inputVariants}>
                        <input className={styles.input} type="text" placeholder="E-mail"
                            {...register("email", { required: true, pattern: EMAIL_REGEX })}
                            aria-invalid={errors.email ? 'true' : 'false'}
                        />
                        <div ></div>
                        {errors.email?.type === 'required' ? <div className={styles.error}>{errorIcon}Champ obligatoire</div> :
                            errors.email?.type === 'pattern' && <div className={styles.error}>{errorIcon}Saisissez une adresse-email valide</div>}
                    </motion.div>

                    <motion.div className={styles.inputContainer} variants={inputVariants}>
                        <input className={styles.input} type="text" placeholder="Objet"
                            {...register("subject", { required: true })}
                            aria-invalid={errors.subject ? 'true' : 'false'}
                        />
                        {errors.subject && <div className={styles.error}>{errorIcon}Champ obligatoire</div>}
                    </motion.div>

                    <motion.div className={styles.inputContainer} variants={inputVariants}>
                        <textarea className={styles.textarea} placeholder="Message" rows={7}
                            {...register("message", { required: true })}
                            aria-invalid={errors.message ? 'true' : 'false'}
                        />
                        {errors.message && <div className={styles.error}>{errorIcon}Champ obligatoire</div>}
                    </motion.div>

                    <motion.button type="submit" className={styles.button} variants={inputVariants}>
                        {isLoading && spinnerIcon} Envoyer
                    </motion.button>
                </motion.form>
            </div>
        </div>
    )
}

export default ContactMe;
