import React from 'react'
import Image from 'next/image'
import logo from '@/assets/logo.png';
import Link from 'next/link';
import SignInForm from '@/components/SignInForm';
import routes from '@/utils/routes';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Sign In'
};

const SignInPage = () => {
  return (
    <section className='w-[23rem] mx-4'>
      <Image src={logo} className='block mx-auto w-[18rem]' alt='Daily management logo' priority={true} width={0} height={0}/>
      <h1 className='font-bold text-xl uppercase mt-3 my-3 text-center'>Sign In</h1>
      <SignInForm/>
      <h4 className='mt-4 text-gray-800 text-md '>Don&apos;t have an account? <Link className='text-green-900 hover:text-green-600 underline' href={routes.signUp}>Create new account</Link></h4>
    </section>
  )
}

export default SignInPage
