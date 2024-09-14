'use client'

import { createContext, useContext, useState } from 'react';
import { UserResType } from './utils/types'
import { isClient } from './lib/http';

const AppContext = createContext<{
    user: UserResType | null,
    setUser: (user: UserResType | null) => void,
    isAuthenicated: boolean
      }>({
        user: null,
        setUser: () => {},
        isAuthenicated: false
      });

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
}

export default function AppProvider({ children }: {children: React.ReactNode}) {
  const [user, setUserState] = useState(() => {
    if (isClient()) {
      const _user = localStorage.getItem('user');
      return _user ? JSON.parse(_user) : null;
    }
    return null
  });

  const setUser = (user: UserResType | null) => {
    setUserState(user);
    localStorage.setItem('user', JSON.stringify(user));

  }

  const isAuthenicated = Boolean(user);
  return <AppContext.Provider value={{ user, setUser, isAuthenicated }}>
    {children}
  </AppContext.Provider>
}