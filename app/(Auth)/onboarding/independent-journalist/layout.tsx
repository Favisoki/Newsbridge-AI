import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Join as an Independent Journalist | Newsbridge",
  description:
    "Apply to join Newsbridge as an independent journalist. Discover real community stories, collaborate securely, and stay connected across regions.",
};

export default function IndependentJournalistLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
