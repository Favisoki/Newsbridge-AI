import type React from "react"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import "./globals.css"
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: "Newsbridge - African Journalism Platform",
  description: "Connect with authentic citizen voices from underserved African communities",
    generator: 'v0.app'
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
