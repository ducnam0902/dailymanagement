'use client';

import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiViewBoards } from 'react-icons/hi';
export function SideBar() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>

          <Sidebar.Item href="/sign-up" icon={HiChartPie}>
            Daily routines
          </Sidebar.Item>

          <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
            Daily expenses
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
