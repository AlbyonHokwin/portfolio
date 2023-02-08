import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import styles from '@/styles/ContactMe.module.css'
import CustomInput from '@/components/elements/CustomInput';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

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
const spinnerIcon = <FontAwesomeIcon icon={faSpinner} spinPulse />

function ContactMe({ myEmail }: propsType) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const formMethods = useForm<Inputs>({
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    });
    const { handleSubmit, reset } = formMethods;

    const errorMessageRequired: string = 'Champ obligatoire';

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

            <FormProvider {...formMethods} >
                <div className={styles.formContainer}>
                    <motion.form className={styles.form} onSubmit={handleSubmit(onSubmit)}
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true }}
                        variants={formVariants}
                    >

                        <motion.div className={styles.inputContainer} variants={inputVariants}>
                            <CustomInput
                                formName='name'
                                formOptions={{ required: true, maxLength: 80 }}
                                label='Nom'
                                id='input-name'
                                errorMessageRequired={errorMessageRequired}
                                type='text'
                            />
                        </motion.div>

                        <motion.div className={styles.inputContainer} variants={inputVariants}>
                            <CustomInput
                                formName='email'
                                formOptions={{ required: true, pattern: EMAIL_REGEX }}
                                label='E-mail'
                                id='input-email'
                                errorMessageRequired={errorMessageRequired}
                                errorMessagePattern='Saisissez une adresse-email valide'
                                type='text'
                            />
                        </motion.div>

                        <motion.div className={styles.inputContainer} variants={inputVariants}>
                            <CustomInput
                                formName='subject'
                                formOptions={{ required: true }}
                                label='Object'
                                id='input-subject'
                                errorMessageRequired={errorMessageRequired}
                                type='text'
                            />
                        </motion.div>

                        <motion.div className={styles.inputContainer} variants={inputVariants}>
                            <CustomInput
                                formName='message'
                                formOptions={{ required: true }}
                                label='Message'
                                id='input-message'
                                errorMessageRequired={errorMessageRequired}
                                isTextarea
                                rows={7}
                            />
                        </motion.div>

                        <motion.button type="submit" className={styles.button}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            variants={inputVariants}>
                            {isLoading && spinnerIcon} Envoyer
                        </motion.button>
                    </motion.form>
                </div>
            </FormProvider>
        </div>
    )
}

export default ContactMe;
