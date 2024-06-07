import React from 'react'
import Image from 'next/image'
import logo from '@/assets/logo.png';
import Link from 'next/link';
import SignInForm from '@/components/SignInForm';
const SignInPage = () => {
  return (
    <section className='flex flex-col justify-center'>
      <Image src={logo} className='mx-auto' alt='Daily management logo' priority={true} width={300} height={300}/>
      <h1 className='font-bold text-xl uppercase mt-3 my-3 text-center'>Sign In</h1>
      <SignInForm/>
      <h4 className='mt-4 text-gray-800 text-md '>Don&apos;t have an account? Create <Link className='text-blue-400 underline' href={'/sign-up'}> new account</Link></h4>
    </section>
  )
}

export default SignInPage
