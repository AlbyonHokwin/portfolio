import React from 'react'
import styles from '@/styles/Me.module.css'
import type { profileType } from '@/types/profileType'

type propsType = {
    profile: profileType;
}

function Me({ profile }: propsType) {
    return (
        <div className={styles.container}>
            {profile.lastname}
        </div>
    )
}

export default Me