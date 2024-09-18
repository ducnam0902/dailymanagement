'use client'
import React from 'react';
import { Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-react';
import Image from 'next/image';
import { useAppContext } from '@/AppProvider';
import { handleErrorApiResponse } from '@/utils/helper';
import userApi from '@/api/user';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const HeaderDropdown = () => {
  const { user } = useAppContext();
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      const response = await userApi.signOut();
      if (response.ok) {
        await userApi.signOutNextServer();
      }
      localStorage.removeItem('user');
      toast.success('Sign out successfully');
      router.push('/sign-in');
    } catch (error) {
      handleErrorApiResponse(error);
    }
  }
  if (user)
    return (
      <Dropdown
        arrowIcon={false}
        inline
        label={
          user?.image ?
            <Image className='rounded-full h-10 object-cover' loading='lazy' src={user.image} alt='Default Avatar' width={40} height={40}/> : ''
        }
      >
        <DropdownHeader>
          <span className="block text-sm">{user?.firstName + ' ' + user?.lastName}</span>
          <span className="block truncate text-sm font-medium">{user?.email}</span>
        </DropdownHeader>
        <DropdownItem>Dashboard</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
      </Dropdown>
    );
}

export default HeaderDropdown;
