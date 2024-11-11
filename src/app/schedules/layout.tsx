
import React, { ReactElement, Suspense } from 'react'
import Header from '@/components/Header'
import Loading from '@/app/(page)/loading';
interface IMainLayout {
    children: ReactElement
}

const ScheduleLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
    <>
      <Header/>
      <main className='h-screen'>
        <Suspense fallback={<Loading/>}>
          {children}
        </Suspense>
      </main>
    </>
  )
}

export default ScheduleLayout
