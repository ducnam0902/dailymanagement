import React from 'react'

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import defaultAvatar from '@/assets/defaultAvatar.jpg';
import { Navbar, NavbarBrand, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-react';

const Header = () => {
  return (
    <>
      <Navbar rounded className='my-1'>
        <NavbarBrand as={Link} href="/">
          <Image src={logo} className="mr-3" alt="Daily management Logo" width={100} height={50} priority={true} />
        </NavbarBrand>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Image className='rounded-full' src={defaultAvatar} alt='Default Avatar' width={40}/>
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Mark Avita</span>
            <span className="block truncate text-sm font-medium">markavita0902@gmail.com</span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
      </Navbar>
      <hr/>
    </>

  )
}

export default Header
