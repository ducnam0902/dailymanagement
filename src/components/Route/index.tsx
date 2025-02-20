import routes from "@/utils/route";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import clsx from "clsx";

const unAuthenicatedRoute = [routes.login, routes.register];

const Route = () => {
  const { pathname } = useLocation();
  const isMatchUnAuthenPath = unAuthenicatedRoute.includes(pathname);
  const userData = JSON.parse(localStorage.getItem("user"));

  if (!userData?.id && !isMatchUnAuthenPath) {
    return <Navigate to={routes.login} />;
  }

  if (userData?.id && isMatchUnAuthenPath) {
    return <Navigate to={routes.home} />;
  }

  return (
    <>
      {userData?.id && <Header />}
      <section
        className={clsx(
          {
            flex: userData?.id,
          },
          "border-t"
        )}
      >
        {userData?.id && <Sidebar />}
        <div className="w-full bg-[#f2f7f8]">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Route;
