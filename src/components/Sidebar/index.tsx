import React from "react";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import routes from "@/utils/route";
// const renderHeaderTemplate = (headerItem, option) => {
//   console.log(option);

//   return (
//     <section
//       className={cn("h-14 rounded-none py-4 px-6 flex items-center", {
//         ["bg-[#45B04A]"]: option.active,
//         ["text-white"]: option.active,
//         ["text-[#8E9192]"]: !option.active,
//       })}
//       onClick={}
//     >
//       <i className={cn(headerItem.icon)} />
//       <span className=" ml-4">{headerItem.label}</span>
//       {headerItem?.items && (
//         <span className="grow text-right">
//           {option.active ? (
//             <i className="pi pi-minus " />
//           ) : (
//             <i className="pi pi-plus" />
//           )}
//         </span>
//       )}
//     </section>
//   );
// };

const Sidebar = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-trophy",
      // template: renderHeaderTemplate,
      command: () => {
        navigate(routes.home);
      },
    },
    {
      label: "Daily routines",
      icon: "pi pi-compass",
      className: "bg-green",
      // template: renderHeaderTemplate,
      items: [
        {
          label: "Tasks",
          icon: "pi pi-list-check",
          command: () => {
            navigate(routes.task);
          },
        },
        {
          label: "Schedules",
          icon: "pi pi-calendar-clock",
          command: () => {
            navigate(routes.schedules);
          },
        },
        {
          label: "Tracking",
          icon: "pi pi-chart-line",
          command: () => {
            navigate(routes.routines);
          },
        },
      ],
    },
    {
      label: "Budgets",
      icon: "pi pi-wallet",
      // template: renderHeaderTemplate,
      items: [
        {
          label: "Daily budget",
          icon: "pi pi-money-bill",
        },
      ],
    },
  ];

  return (
    <nav className="w-[16rem]">
      <Menu
        model={items}
        className="w-full md:w-20rem rounded-none  border-none"
      />
    </nav>
  );
};

export default Sidebar;
