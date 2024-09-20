'use client'
import React from 'react';
import { Button, Drawer } from 'flowbite-react';
import { useState } from 'react';
import SideBar from './SideBar';
import { FcMenu } from 'react-icons/fc';
const SidebarMobile = () => {
  const [isOpenMenuBar, setIsOpenMenuBar] = useState(false);

  const handleClose = () => {
    setIsOpenMenuBar(false);
  }
  return (
    <div className='lg:hidden'>
      <Button className='ml-3 h-10' color='success' outline onClick={() => setIsOpenMenuBar(true)}>
        <FcMenu className='text-green-300'/>
      </Button>
      <Drawer className='w-[290px] bg-[#F9FAFB]' open={isOpenMenuBar} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <SideBar isMobile={true} onCloseDrawMobile={handleClose}/>
        </Drawer.Items>
      </Drawer>
    </div>
  );
}

export default SidebarMobile;
