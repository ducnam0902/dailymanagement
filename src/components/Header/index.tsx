import React, { useRef } from "react";
import { Image } from "primereact/image";
import { UserData } from "@/types/user";
import { Avatar } from "primereact/avatar";
import capitalize from "lodash-es/capitalize";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useAppDispatch } from "@/redux/hooks";
import UserService from "@/services/UserService";
import { hideLoading, showLoading } from "@/redux/loading/loading";
import routes from "@/utils/route";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/redux/toast/toast";

const Header = () => {
  const menuRight = useRef(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data: UserData = JSON.parse(localStorage.getItem("user"));
  const fullName = capitalize(data.firstName) + " " + capitalize(data.lastName);

  const items: MenuItem[] = [
    {
      label: fullName,
      items: [
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: async () => {
            try {
              dispatch(showLoading());
              const resp = await UserService.signOut();
              if (resp?.ok) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                navigate(routes.login);
                dispatch(
                  showToast({
                    type: "success",
                    summary: "Logout Successfully!",
                  })
                );
              }
            } catch (error) {
              console.log(error);
            } finally {
              dispatch(hideLoading());
            }
          },
        },
      ],
    },
  ];

  return (
    <header className="py-4 flex justify-between items-center w-auto mx-4 sm:mx-16">
      <Image imageClassName="block mb-4" src="/logo.png" width={"120px"} />
      <section className="items-center flex justify-between">
        <div className="hidden sm:block text-right">
          <h2 className="text-lg font-bold pr-6">{fullName}</h2>
          <h3 className="pr-10 text-neutral-400">Member</h3>
        </div>
        <Avatar
          size="xlarge"
          image={data.image}
          shape="circle"
          onClick={(event) => menuRight.current.toggle(event)}
        />
        <Menu
          model={items}
          popup
          ref={menuRight}
          id="popup_menu_right"
          popupAlignment="right"
          className="mt-2 py-0"
        />
      </section>
    </header>
  );
};

export default Header;
