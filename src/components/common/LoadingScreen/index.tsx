import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { Image } from "primereact/image";
import { useAppSelector } from "@/redux/hooks";

const LoadingScreen = () => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  if (isLoading)
    return (
      <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-white opacity-80">
        <Image
          className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
          src="/logo.png"
          width="150"
        />
        <PuffLoader
          color="#AAE2BE"
          loading={true}
          className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
          aria-label="Loading Spinner"
          size={280}
          speedMultiplier={1}
        />
      </div>
    );
};

export default LoadingScreen;
