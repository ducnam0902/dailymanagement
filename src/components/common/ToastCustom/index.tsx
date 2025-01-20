import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeToast } from "@/redux/toast/toast";

const ToastCustom = () => {
  const toast = useRef(null);
  const toastMessage = useAppSelector((state) => state.toast);
  const { isShow, type, ...toastProps } = toastMessage;
  const dispatch = useAppDispatch();
  if (isShow) {
    toast.current.show({
      severity: type,
      ...toastProps,
    });
  }

  const removeToastMessage = () => {
    dispatch(removeToast());
  };

  return (
    <>
      <Toast ref={toast} onRemove={removeToastMessage} />
    </>
  );
};

export default ToastCustom;
