'use client'

import { createContext, useContext, useReducer, Dispatch } from 'react';
import { initialState, reducer, ActionContextInterface, InitialStateInterface } from './utils/initialContext';
const AppContext = createContext<{
      state: InitialStateInterface,
      dispatch: Dispatch<ActionContextInterface>
        }>({
          state: {
            isLoading: false,
            user: null
          },
          dispatch: ({ type: ActionContextInterface, payload: any }) => {}
        });

export default function AppProvider({ children }: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    user: null
  }, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>
    {children}
  </AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
}