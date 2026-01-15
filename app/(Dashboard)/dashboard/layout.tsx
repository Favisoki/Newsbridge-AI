"use client"
import type React from "react"
import { Sidebar } from "@/components/dashboard/components/sidebar"
import { DashboardHeader } from "@/components/dashboard/components/header"
import { DashboardProvider } from "@/context/dashboard-context"
import { useAuth } from "@/context/auth-context"
import ComfirmationModal from "@/components/modal-components/confirmation-modal"
import Modal from "@/components/ui/modal"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLogoutModal, setIsLogoutModal, isLoggingOut, logout } = useAuth()
  return (
    <DashboardProvider>
      <div className="flex h-screen bg-muted tracking-[-1]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto bg-muted">{children}</main>
        </div>
      </div>
      {isLogoutModal && (
        <Modal isOpen={isLogoutModal} onClose={() => setIsLogoutModal(false)}>
          <ComfirmationModal
            header="You are about to log out"
            confirmText={"Don't worry, your stories and settings are safely saved"}
            onClose={() => setIsLogoutModal(false)}
            actionBtnText={isLoggingOut ? "Logging out..." : "Log out"}
            onAction={logout}
          />
        </Modal>
      )}
    </DashboardProvider>
  )
}
