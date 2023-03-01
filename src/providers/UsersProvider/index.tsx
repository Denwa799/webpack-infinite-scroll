import React, {
  createContext,
  FC,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { IUser } from 'models/IUser';
import { IUsersContext, IUsersProvider } from './types';
import { getService } from 'api';

/**
 * @description This is users context created to users store
 */
export const UsersContext = createContext<IUsersContext>({} as IUsersContext);

/**
 * @description This is users provider created to users store
 */
export const UsersProvider: FC<IUsersProvider> = ({ children }) => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [loadedMoreUsers, setLoadedMoreUsers] = useState<IUser[] | null>(null);

  const [usersIsLoading, setUsersIsLoading] = useState(false);
  const [moreUsersIsLoading, setMoreUsersIsLoading] = useState(false);
  const [fetchUsersError, setFetchUsersError] = useState<string | null>(null);

  const usersPath = `${process.env.REACT_APP_API}`;

  const fetchUsers = useCallback(async (page = 1, results = 10) => {
    setUsersIsLoading(true);
    setFetchUsersError(null);
    try {
      const response = await getService(usersPath, { page, results });
      setUsers(response.results);
    } catch (error) {
      console.log(error);
      setFetchUsersError('Ошибка загрузки списка пользователей');
    } finally {
      setUsersIsLoading(false);
    }
  }, []);

  const fetchMoreUsers = useCallback(async (page = 1, results = 10) => {
    setMoreUsersIsLoading(true);
    setFetchUsersError(null);
    try {
      const response = await getService(usersPath, { page, results });
      setLoadedMoreUsers(response.results);
    } catch (error) {
      console.log(error);
      setFetchUsersError('Ошибка загрузки списка пользователей');
    } finally {
      setMoreUsersIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      users,
      loadedMoreUsers,
      usersIsLoading,
      moreUsersIsLoading,
      fetchUsersError,
      fetchUsers,
      fetchMoreUsers,
    }),
    [
      users,
      loadedMoreUsers,
      usersIsLoading,
      moreUsersIsLoading,
      fetchUsersError,
    ]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
