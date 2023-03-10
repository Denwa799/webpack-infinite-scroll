import { useContext } from 'react';
import { UsersContext } from 'providers/UsersProvider/index';

/**
 * @description This hook returns data from the user context
 *
 * @return {IUsersContext} - return data in user context
 */
export const useUsers = () => useContext(UsersContext);
