import React, { FC } from 'react';
import { IAppContainer } from './types';
import styles from './styles.modules.scss';

/**
 * @description This is the app layout container
 */
export const AppContainer: FC<IAppContainer> = ({ children }) => {
  return <div className={styles.AppContainer}>{children}</div>;
};
