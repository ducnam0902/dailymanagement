
import React, { ReactElement, Suspense } from 'react'
import Loading from './loading'

interface IMainLayout {
    children: ReactElement
}

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
