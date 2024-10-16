'use client'
import React from 'react';
import { Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-react';
import Image from 'next/image';
import { useAppContext } from '@/AppProvider';
import { handleErrorApiResponse } from '@/utils/helper';
import userApi from '@/api/user';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ACTION_ENUM } from '@/utils/initialContext';

const HeaderDropdown = () => {
  const { state: { user }, dispatch } = useAppContext();
  const router = useRouter();
  const handleSignOut = async () => {
    dispatch({ type: ACTION_ENUM.SET_LOADING, payload: true })
    try {
      const response = await userApi.signOut();
      if (response.ok) {
        localStorage.removeItem('user');
        toast.success('Sign out successfully');
        router.push('/sign-in');
      }

    } catch (error) {
      handleErrorApiResponse(error);
    } finally {
      dispatch({ type: ACTION_ENUM.SET_LOADING, payload: false })
    }
  }
  if (user)
    return (
      <Dropdown
        arrowIcon={false}
        inline
        label={
          user?.image ?
            <Image className='rounded-full h-10 object-cover w-10' loading='lazy' src={user.image} alt='Default Avatar' width={0} height={0}/> : ''
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
