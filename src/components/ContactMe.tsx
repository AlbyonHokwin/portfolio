import React, { useState } from 'react'
import styles from '@/styles/ContactMe.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const EMAIL_REGEX: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
const errorIcon = <FontAwesomeIcon icon={faCircleExclamation} className={styles.errorIcon} />
const spinnerIcon = <FontAwesomeIcon icon={faSpinner} spinPulse />

function ContactMe() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log('data', data);

    return (
        <div className={styles.container}>
            <h2>Me contacter</h2>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                    <div className={styles.inputContainer}>
                        <input className={styles.input} type="text" placeholder="Nom"
                            {...register("name", { required: true, maxLength: 80 })}
                            aria-invalid={errors.name ? 'true' : 'false'}
                        />
                        {errors.name && <div className={styles.error}>{errorIcon}Champ obligatoire</div>}
                    </div>

                    <div className={styles.inputContainer}>
                        <input className={styles.input} type="text" placeholder="E-mail"
                            {...register("email", { required: true, pattern: EMAIL_REGEX })}
                            aria-invalid={errors.email ? 'true' : 'false'}
                        />
                        <div ></div>
                        {errors.email?.type === 'required' ? <div className={styles.error}>{errorIcon}Champ obligatoire</div> :
                            errors.email?.type === 'pattern' && <div className={styles.error}>{errorIcon}Saisissez une adresse-email valide</div>}
                    </div>

                    <div className={styles.inputContainer}>
                        <input className={styles.input} type="text" placeholder="Objet"
                            {...register("subject", { required: true })}
                            aria-invalid={errors.subject ? 'true' : 'false'}
                        />
                        {errors.subject && <div className={styles.error}>{errorIcon}Champ obligatoire</div>}
                    </div>

                    <div className={styles.inputContainer}>
                        <textarea className={styles.textarea} placeholder="Message" rows={10}
                            {...register("message", { required: true })}
                            aria-invalid={errors.message ? 'true' : 'false'}
                        />
                        {errors.message && <div className={styles.error}>{errorIcon}Champ obligatoire</div>}
                    </div>

                    <button type="submit" className={styles.button}>{isLoading && spinnerIcon} Envoyer</button>
                </form>
            </div>
        </div>
    )
}

export default ContactMe;
