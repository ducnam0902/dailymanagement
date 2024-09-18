import Image from 'next/image'
import React from 'react'
import logo from '@/assets/logo.png';
import SignUpForm from '@/components/SignUpForm';
import Link from 'next/link';
import routes from '@/utils/routes';

const SignUpPage = () => {
  return (
    <>
      <section>
        <h2 className='font-bold text-xl uppercase my-3 '>Sign Up</h2>
        <SignUpForm/>
        <h4 className='mt-4 text-gray-800 text-md '>Have an account? Try to <Link className='text-blue-400 underline' href={routes.signIn}>Sign in</Link></h4>
      </section>
      <Image src={logo} className='hidden lg:block' alt='Daily management logo' priority={true} width={400} height={300}/>
    </>

  )
}

export default SignUpPage
