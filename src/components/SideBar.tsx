'use client';

import routes from '@/utils/routes';
import { Sidebar } from 'flowbite-react';
import Link from 'next/link';
import {
  FcSurvey,
  FcMoneyTransfer,
  FcComboChart,
  FcTodoList
} from 'react-icons/fc';
import cn from 'classnames';
import moment from 'moment';
type SideBarType = {
  isMobile: boolean;
  onCloseDrawMobile?: () => void
};
export function SideBar({ isMobile = false, onCloseDrawMobile = () => {} }: SideBarType) {
  const currentMonday = moment().day(1).format('YYYY-MM-DD');

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

          <Sidebar.Item href={routes.task} icon={FcTodoList} as={Link} onClick={onCloseDrawMobile}>
            Tasks
          </Sidebar.Item>
          <Sidebar.Item href={routes.routines(currentMonday)} icon={FcSurvey} as={Link} onClick={onCloseDrawMobile}>
            Daily Tasks
          </Sidebar.Item>

          <Sidebar.Item href={routes.expenses} icon={FcMoneyTransfer} as={Link} onClick={onCloseDrawMobile}>
            Expenses
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
