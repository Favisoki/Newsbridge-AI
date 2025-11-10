"use client";

import { SnackbarKey, SnackbarOrigin, useSnackbar } from "notistack";
import { useRef } from "react";

const anchorOrigin: SnackbarOrigin = {
  horizontal: "center",
  vertical: "top",
};

const useToast = () => {
  const toastRef = useRef<SnackbarKey>("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const successToastHandler = (message?: string) => {
    closeSnackbar(toastRef.current);
    if (message) {
      enqueueSnackbar(message, {
        anchorOrigin,
        variant: "success",
        autoHideDuration: 7000,
      });
    }
  };
  const loadingToastHandler = (message: string) => {
    closeSnackbar();
    toastRef.current = enqueueSnackbar(message, {
      anchorOrigin,
      variant: "default",
      persist: true,
    });
  };
  const errorToastHandler = (message: string) => {
    closeSnackbar();
    enqueueSnackbar(message, {
      anchorOrigin,
      variant: "error",
      autoHideDuration: 7000,
    });
  };
  const closeToast = () => {
    closeSnackbar();
  };
  return {
    errorToastHandler,
    successToastHandler,
    loadingToastHandler,
    closeToast,
  };
};

export default useToast;
