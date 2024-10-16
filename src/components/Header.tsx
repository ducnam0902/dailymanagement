import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { Navbar, NavbarBrand } from 'flowbite-react';
import dynamic from 'next/dynamic';
import routes from '@/utils/routes';
import SidebarMobile from './SidebarMobile';

const HeaderDropdown = dynamic(() => import('./HeaderDropdown'), { ssr: false })

const Header = () => {
  return (
    <>
      <Navbar rounded className='my-1'>
        <NavbarBrand as={Link} href={routes.home}>
          <Image src={logo} className="mr-3 w-[100px]" alt="Daily management Logo" width={0} height={0} priority={true} />
        </NavbarBrand>
        <div className='flex'>
          <HeaderDropdown/>
          <SidebarMobile/>
        </div>

      </Navbar>
      <hr/>
    </>
  )
}

export default Header
