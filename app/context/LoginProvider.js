import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [location, setLocation] = useState('');

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, profile, setProfile, location, setLocation }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
