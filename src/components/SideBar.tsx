'use client';

import routes from '@/utils/routes';
import { Sidebar } from 'flowbite-react';
import Link from 'next/link';
import { FcSurvey, FcCheckmark, FcMoneyTransfer, FcComboChart } from 'react-icons/fc';
export function SideBar() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href={routes.home} icon={FcComboChart} as={Link}>
            Dashboard
          </Sidebar.Item>

          <Sidebar.Item href={routes.note} icon={FcSurvey} as={Link}>
            Daily note
          </Sidebar.Item>
          <Sidebar.Item href={routes.routines} icon={FcCheckmark} as={Link}>
            Daily routines
          </Sidebar.Item>

          <Sidebar.Item href={routes.expenses} icon={FcMoneyTransfer} as={Link}>
            Daily expenses
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
