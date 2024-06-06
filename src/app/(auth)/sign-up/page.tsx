import Image from 'next/image'
import React from 'react'
import logo from '@/assets/logo.png';
import SignUpForm from '@/components/SignUpForm';
const SignUpPage = () => {
  return (
    <section className='flex items-center gap-10'>
      <section >
        <h2 className='font-bold text-xl uppercase my-3 '>Sign Up</h2>
        <SignUpForm/>
      </section>
      <Image src={logo} className='hidden md:block' alt='Daily management logo' priority={true} width={400} height={300}/>
    </section>
  )
}

export default SignUpPage
