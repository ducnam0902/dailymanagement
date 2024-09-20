
import SideBar from '@/components/SideBar'
import React, { ReactElement } from 'react'
import Header from '@/components/Header'

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
          {children}
        </div>
      </main>
    </>
  )
}

export default MainLayout
