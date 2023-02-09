import React from 'react';
import styles from '@/styles/CustomInput.module.css';
import { useFormContext } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import type { RegisterOptions } from 'react-hook-form';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

const errorIcon = <FontAwesomeIcon icon={faCircleExclamation} className={styles.errorIcon} />

type propsType = {
    formName: string;
    formOptions: RegisterOptions;
    label: string;
    id: string;
    errorMessageRequired?: string;
    errorMessagePattern?: string;
    isTextarea?: boolean;
}

function CustomInput({
    formName,
    formOptions,
    label,
    id,
    errorMessageRequired,
    errorMessagePattern = '',
    isTextarea = false,
    ...rest
}: propsType & InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>) {

    const { register, watch, formState: { errors } } = useFormContext();
    const value = watch(formName);
    const error = errors[formName];

    const attributes = {
        className: `${isTextarea ? styles.textarea : styles.input} ${error ? styles.error : ''} ${value ? styles.filled : ''}`,
        id,
        ...register(formName, formOptions),
        'aria-invalid': error ? true : false,
        ...rest,
    }

    return (
        <>
            {isTextarea ?
                <textarea {...attributes} /> :
                <input {...attributes} />
            }
            <label htmlFor={id} className={styles.label}>{label}</label>
            {error && <div className={styles.errorMessage}>
                {errorIcon}{
                    error?.type === 'required' ?
                        errorMessageRequired :
                        error?.type === 'pattern' ?
                            errorMessagePattern :
                            ''
                }
            </div>}
        </>
    );
};

export default CustomInput;