import React from 'react'

interface IAuthLayout {
    children: React.ReactNode
}

const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
  return (
    <div className='flex justify-center h-screen'>
      {children}
    </div>
  )
}

export default AuthLayout
