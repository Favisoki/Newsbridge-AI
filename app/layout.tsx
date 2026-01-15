import type React from "react"
import type { Metadata } from "next"
import { NavbarWrapper } from "@/components/navbar-wrapper"
import "./globals.css"
import { Inter, Poppins } from "next/font/google"
import Providers from "./providers/Provider"
import ToastProvider from "./providers/ToastProvider"
import { CircleCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Newsbridge - African Journalism Platform",
  description: "Connect with authentic citizen voices from underserved African communities",
  generator: "v0.app",
  metadataBase: new URL("https://cldbknd.newsbridgeai.com"),
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
}

const inter = Inter({ subsets: ["latin"], display: "swap" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // optional
  display: "swap",
  variable: "--font-poppins", // gives you a CSS variable
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className={inter.className}>
        <Providers>
          <ToastProvider>
            <div className="fixed left-0 top-0 w-full z-50 bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 border-b border-blue-800/30">
              <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2">
                <span className="text-xs text-blue-200/80 font-medium tracking-wide">Proudly Supported by</span>
                <span className="text-sm text-white font-semibold tracking-wide">CJID</span>
                <CircleCheck className="fill-blue-300 text-blue-950" />
              </div>
            </div>
            <NavbarWrapper />
            {children}
          </ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
