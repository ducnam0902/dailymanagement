import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { Navbar, NavbarBrand } from 'flowbite-react';
import dynamic from 'next/dynamic';
import Loading from '@/app/loading';

const HeaderDropdown = dynamic(() => import('./HeaderDropdown'), { ssr: false, loading: () => <Loading loading size={40} cssOverride={{ margin: 0 }}/> })

const Header = () => {
  return (
    <>
      <Navbar rounded className='my-1'>
        <NavbarBrand as={Link} href="/">
          <Image src={logo} className="mr-3" alt="Daily management Logo" width={100} height={50} priority={true} />
        </NavbarBrand>
        <HeaderDropdown/>
      </Navbar>
      <hr/>
    </>
  )
}

export default Header
