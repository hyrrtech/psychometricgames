import React, {createContext, useState, useEffect} from 'react';
import {
  login,
  signin_with_google,
  signout,
  signup,
} from '../firebase/authFunctions';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        signout,
        signin_with_google,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
