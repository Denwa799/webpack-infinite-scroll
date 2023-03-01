import React from 'react';
import { MainPage } from 'pages/Main';
import { UsersProvider } from 'providers/UsersProvider';

/**
 * @description This is the main component of the application, located at the top level
 */
export const App = () => {
  return (
    <UsersProvider>
      <MainPage />
    </UsersProvider>
  );
};
