
import React, { ReactElement, Suspense } from 'react'
import Loading from './loading'
import type { Metadata } from 'next';

interface IMainLayout {
    children: ReactElement
}

export const metadata: Metadata = {
  title: 'Daily Schedules',
  description: 'Daily Schedules - To show what have you done and remained'
};


const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
    <>
      <Suspense fallback={<Loading/>}>
        {children}
      </Suspense>
    </>
  )
}

export default MainLayout
