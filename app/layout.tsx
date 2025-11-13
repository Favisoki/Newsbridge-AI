import type React from "react";
import type { Metadata } from "next";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import Providers from "./providers/Provider";
import ToastProvider from "./providers/ToastProvider";

export const metadata: Metadata = {
  title: "Newsbridge - African Journalism Platform",
  description:
    "Connect with authentic citizen voices from underserved African communities",
  generator: "v0.app",
};

const inter = Inter({ subsets: ["latin"], display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // optional
  display: "swap",
  variable: "--font-poppins", // gives you a CSS variable
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
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
