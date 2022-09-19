import React, { createContext, useEffect, useState } from 'react';

interface IAuthContext {
  loggedIn: boolean;
  getLoggedIn: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const getLoggedIn = async () => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      setLoggedIn(true);
    }
  };
  useEffect(() => {
    getLoggedIn();
  }, []);

  return <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>{children}</AuthContext.Provider>;
};
