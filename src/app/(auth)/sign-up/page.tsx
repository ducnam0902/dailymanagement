import Image from 'next/image'
import React from 'react'
import logo from '@/assets/logo.png';
import SignUpForm from '@/components/SignUpForm';
import Link from 'next/link';
import routes from '@/utils/routes';

const SignUpPage = () => {
  return (
    <div className='w-[500px] flex flex-col'>
      <Image src={logo} className='hidden lg:block mx-auto mb-4 w-[23rem]' alt='Daily management logo' priority={true} width="0" height="0"/>
      <section className='mx-8 lg:mx-0'>
        <h2 className='font-bold text-3xl my-3 text-center mb-4'>Sign Up</h2>
        <SignUpForm/>
        <h4 className='mt-4 text-gray-800 text-lg '>Have an account? Try to <Link className='text-green-900 hover:text-green-600 underline' href={routes.signIn}>Sign in</Link></h4>
      </section>
    </div>

  )
}

export default SignUpPage
