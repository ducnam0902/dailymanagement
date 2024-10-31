
import SideBar from '@/components/SideBar'
import React, { ReactElement, Suspense } from 'react'
import Header from '@/components/Header'
import Loading from './loading'
interface IMainLayout {
    children: ReactElement
}


const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
    <>
      <Header/>
      <main className='flex h-screen'>
        <SideBar isMobile={false}/>
        <div className='w-full'>
          <Suspense fallback={<Loading/>}>
            {children}
          </Suspense>
        </div>
      </main>
    </>
  )
}

export default MainLayout
