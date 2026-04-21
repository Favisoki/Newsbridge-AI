import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Join as a Media House | Newsbridge",
  description:
    "Request early access for your media house on Newsbridge. Access community reports that are translated, structured, and ready for editorial review.",
};

export default function MediaHouseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
