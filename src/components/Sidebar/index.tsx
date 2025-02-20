import React from "react";
import { Menu } from "primereact/menu";
import { NavLink } from "react-router-dom";
import routes from "@/utils/route";
import clsx from "clsx";

interface ISidebar {
  isMobile?: boolean,
}

const renderHeaderTemplate = (headerItem) => {
  return (
    <section className={headerItem.className}>
      <NavLink
        to={headerItem.route}
        className={({ isActive }) => {
          return clsx(
            "flex gap-2 p-4 items-center text-[#F9FEFE] hover:bg-primary",
            {
              "bg-primary": isActive,
            }
          );
        }}
      >
        <i className={headerItem.icon} />
        <p>{headerItem.label}</p>
      </NavLink>
    </section>
  );
};

const Sidebar = ({ isMobile = false }: ISidebar) => {
  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-trophy",
      template: renderHeaderTemplate,
      route: routes.home,
    },
    {
      label: "Tasks",
      icon: "pi pi-list-check",
      route: routes.task,
      template: renderHeaderTemplate,
    },
    {
      label: "Schedules",
      icon: "pi pi-calendar-clock",
      template: renderHeaderTemplate,
      route: routes.schedules,
    },
    {
      label: "Tracking",
      icon: "pi pi-chart-line",
      template: renderHeaderTemplate,
      route: routes.routines,
      className: "hidden sm:block",
    },

    {
      label: "Daily budget",
      template: renderHeaderTemplate,
      icon: "pi pi-money-bill",
      route: routes.expenses,
    },
  ];

  return (
    <nav className={clsx(' sm:block sm:min-w-[11rem] lg:min-w-[16rem] min-h-[calc(100vh-107px)] bg-[#33495D]', {
      'hidden': !isMobile
    })}>
      <Menu
        model={items}
        className="w-full rounded-none  border-none bg-[#33495D] py-0"
      />
    </nav>
  );
};

export default Sidebar;
