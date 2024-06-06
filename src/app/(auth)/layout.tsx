import React from 'react'

interface IAuthLayout {
    children: React.ReactNode
}

const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
  return (
    <div className='mx-auto flex justify-center items-center lg:gap-20 min-h-screen'>
      {children}
    </div>
  )
}

export default AuthLayout
