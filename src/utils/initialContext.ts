import { isClient } from '@/lib/http';
import { UserResType } from './types'
import { produce } from 'immer'
export interface ActionContextInterface {
    payload: any,
    type: ACTION_ENUM,
}

export enum ACTION_ENUM {
    SET_LOADING = 'SET_LOADING',
    SET_USER = 'SET_USER',
}

export interface InitialStateInterface {
    isLoading: boolean,
    user: UserResType | null
}

export const initialState = (initState: InitialStateInterface) => {
  if (isClient()) {
    const _user = localStorage.getItem('user');
    return {
      ...initState,
      user: _user ? JSON.parse(_user) : null
    }
  }
  return {
    ...initState,
    user: null
  }
}

export const reducer = produce((draft: InitialStateInterface, action: ActionContextInterface) => {
  switch (action.type) {
  case ACTION_ENUM.SET_LOADING:
    draft.isLoading = action.payload
    break;

  case ACTION_ENUM.SET_USER:
    draft.user = action.payload
    break;

  default:
    break;
  }

})