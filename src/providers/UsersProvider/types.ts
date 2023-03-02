import { ReactNode } from 'react';
import { IUser } from 'models/IUser';

/**
 * @description This entity describes the content in the user context
 */
export interface IUsersContext {
  users: IUser[];
  usersIsLoading: boolean;
  moreUsersIsLoading: boolean;
  fetchUsersError: string | null;
  fetchUsers: (page?: number, results?: number) => void;
  fetchMoreUsers: (page?: number, results?: number) => void;
}

/**
 * @description This entity describes the content in the user provider
 */
export interface IUsersProvider {
  children: ReactNode;
}
