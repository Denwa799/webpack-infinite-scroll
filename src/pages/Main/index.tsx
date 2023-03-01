import React, { FC, useEffect } from 'react';
import { useUsers } from 'hooks/useUsers';
import { AppUserCard } from 'UI/AppUserCard';
import { AppContainer } from 'layouts/AppContainer';
import styles from './styles.module.scss';

/**
 * @description This is main page of the application
 */
export const MainPage: FC = () => {
  const { users, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AppContainer>
      {users &&
        users.map((user) => (
          <div className={styles.cardContainer}>
            <AppUserCard
              key={user.id.value}
              name={`${user.name.last} ${user.name.first}`}
              photo={user.picture.medium}
              email={user.email}
            />
          </div>
        ))}
    </AppContainer>
  );
};
