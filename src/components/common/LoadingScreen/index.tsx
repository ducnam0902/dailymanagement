import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { Image } from "primereact/image";
import { useAppSelector } from "@/redux/hooks";

const LoadingScreen = () => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  if (isLoading)
    return (
      <div className="w-screen min-h-screen absolute top-0 left-0 z-[9999] bg-white opacity-80">
        <Image
          className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
          src="/logo.png"
          width="150"
        />
        <div className="min-h-screen flex justify-center items-center">
        <PuffLoader
          color="#AAE2BE"
          loading={true}
          aria-label="Loading Spinner"
          size={280}
          speedMultiplier={1}
        />
        </div>
      </div>
    );
};

export default LoadingScreen;
