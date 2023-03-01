import React, { FC, useEffect } from 'react';
import { useUsers } from 'hooks/useUsers';

/**
 * @description This is main page of the application
 */
export const MainPage: FC = () => {
  const { users, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {users &&
        users.map((user) => (
          <div key={user.cell + user.name.first}>{user.name.last}</div>
        ))}
    </div>
  );
};
