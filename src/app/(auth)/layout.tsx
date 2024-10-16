import React from 'react'

interface IAuthLayout {
    children: React.ReactNode
}

const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
  return (
    <div className='flex justify-center items-center min-h-screen gap-16'>
      {children}
    </div>
  )
}

export default AuthLayout
