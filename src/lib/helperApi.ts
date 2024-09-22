'use server'

import { cookies } from 'next/headers'

export const getCookies = async (key: string) => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get(key);
  return accessToken?.value
}