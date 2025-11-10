"use client";

import { PropsWithChildren } from "react";
import { SnackbarProvider } from "notistack";

function ToastProvider({ children }: PropsWithChildren) {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}

export default ToastProvider;
