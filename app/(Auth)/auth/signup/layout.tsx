import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign Up | Newsbridge",
  description:
    "Join Newsbridge as an independent journalist or media house and connect with authentic stories from across Africa.",
};

export default function SignupLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
