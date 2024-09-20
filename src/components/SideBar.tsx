'use client';

import routes from '@/utils/routes';
import { Sidebar } from 'flowbite-react';
import Link from 'next/link';
import {
  FcSurvey,
  FcCheckmark,
  FcMoneyTransfer,
  FcComboChart
} from 'react-icons/fc';
import cn from 'classnames';
type SideBarType = {
  isMobile: boolean;
  onCloseDrawMobile?: () => void
};
export function SideBar({ isMobile = false, onCloseDrawMobile = () => {} }: SideBarType) {
  return (
    <Sidebar
      className={cn({
        'hidden lg:block': !isMobile
      })}
      aria-label="Default sidebar example"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href={routes.home} icon={FcComboChart} as={Link} onClick={onCloseDrawMobile}>
            Dashboard
          </Sidebar.Item>

          <Sidebar.Item href={routes.note} icon={FcSurvey} as={Link} onClick={onCloseDrawMobile}>
            Daily note
          </Sidebar.Item>
          <Sidebar.Item href={routes.routines} icon={FcCheckmark} as={Link} onClick={onCloseDrawMobile}>
            Daily routines
          </Sidebar.Item>

          <Sidebar.Item href={routes.expenses} icon={FcMoneyTransfer} as={Link} onClick={onCloseDrawMobile}>
            Daily expenses
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
