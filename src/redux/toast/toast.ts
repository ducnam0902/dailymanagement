import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  isShow: boolean;
  type: string;
  summary: string;
  detail?: string;
}

const initialState: ToastState = {
  isShow: false,
  type: "",
  summary: "",
  detail: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Omit<ToastState, "isShow">>) => {
      state.isShow = true;
      state.type = action.payload.type;
      state.summary = action.payload.summary;
      state.detail = action.payload.detail;
    },
    removeToast: (state) => {
      state.isShow = false;
      state.type = "";
      state.summary = "";
      state.detail = "";
    },
  },
});

export const { showToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
