import React, { FC, useCallback, useEffect, useState } from 'react';
import { useUsers } from 'hooks/useUsers';
import { AppUserCard } from 'UI/AppUserCard';
import { AppContainer } from 'layouts/AppContainer';
import styles from './styles.module.scss';
import { AppInfiniteScroll } from 'components/AppInfiniteScroll';

/**
 * @description This is main page of the application
 * @return {ReactELement} - Returns the main page component containing a list of user cards
 */
export const MainPage: FC = () => {
  const { users, moreUsersIsLoading, fetchUsers, fetchMoreUsers } = useUsers();
  const [page, setPage] = useState(2);

  useEffect(() => {
    fetchUsers();
  }, []);

  const onFetchMore = useCallback(() => {
    if (!moreUsersIsLoading) {
      setPage((prev) => prev + 1);
      fetchMoreUsers(page);
    }
  }, [moreUsersIsLoading, page]);

  return (
    <AppContainer>
      {users.length > 0 && (
        <AppInfiniteScroll
          data={users}
          renderItem={(item) => (
            <div
              key={`${item.id.value} ${item.name.last} ${item.cell}`}
              className={styles.cardContainer}
            >
              <AppUserCard
                name={`${item.name.last} ${item.name.first}`}
                photo={item.picture.medium}
                email={item.email}
              />
            </div>
          )}
          fetchMore={onFetchMore}
        />
      )}
    </AppContainer>
  );
};
