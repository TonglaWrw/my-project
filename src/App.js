import React from 'react';
import { Main } from './component/auction/Main';
import { Navbar } from './component/auth/Navbar';
import { AuthProvider } from './context/Authen';

export const App = () => {
  return ( 
    <AuthProvider>
      <Navbar />
      <Main />
    </AuthProvider>
  ) 
};
