import React, { FC } from 'react';
import { IAppUserCard } from './types';
import styles from './styles.module.scss';

/**
 * @description This is the app user card UI component
 */
export const AppUserCard: FC<IAppUserCard> = ({ name, photo, email }) => {
  return (
    <div className={styles.AppUserCard}>
      <img className={styles.photo} src={photo} alt={name} />
      <div className={styles.textContainer}>
        <p className={styles.text}>{name}</p>
        <p className={styles.text}>{email}</p>
      </div>
    </div>
  );
};
