import type React from "react";
import type { Metadata } from "next";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers/Provider";
import ToastProvider from "./providers/ToastProvider";

export const metadata: Metadata = {
  title: "Newsbridge - African Journalism Platform",
  description:
    "Connect with authentic citizen voices from underserved African communities",
  generator: "v0.app",
};

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
           <ToastProvider>
          <NavbarWrapper />
            {children}
            </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
