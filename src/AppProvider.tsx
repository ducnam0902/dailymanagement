'use client'

import { createContext, useContext, useState } from 'react';
import { UserResType } from './utils/types'
import { isClient } from './lib/http';

const AppContext = createContext<{
    user: UserResType | null,
    setUser: (user: UserResType | null) => void,
      }>({
        user: null,
        setUser: () => {}
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

  return <AppContext.Provider value={{ user, setUser }}>
    {children}
  </AppContext.Provider>
}