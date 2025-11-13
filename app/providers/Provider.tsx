"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { getQueryClient } from "@/app/getQueryClient";

const isDev = process.env.NEXT_PUBLIC_NODE_ENV !== "production";

const ReactQueryDevtools = isDev
  ? dynamic(
      () =>
        import("@tanstack/react-query-devtools").then(
          (mod) => mod.ReactQueryDevtools
        ),
      { ssr: false }
    )
  : () => null;

function Providers({ children }: PropsWithChildren) {
  const client = getQueryClient();

  return (
    <QueryClientProvider client={client}>
      {children}
      {isDev && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default Providers;
