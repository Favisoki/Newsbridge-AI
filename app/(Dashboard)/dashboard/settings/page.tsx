"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { getNameAbbr } from "@/lib/utils";
import UpdateInfo from "@/components/dashboard/components/update-info";
import UpdatePassword from "@/components/dashboard/components/update-password";
import GradientButton from "@/components/ui/gradient-button";
import { Logout } from "@/components/Common/Svgs";
import Modal from "@/components/ui/modal";
import ComfirmationModal from "@/components/modal-components/confirmation-modal";
import { useState } from "react";
import { UserCardSkeleton } from "@/app/loaders/profile-card-loader";

export default function SettingsPage() {
  const { user, logout, isLoggingOut, isLoading } = useAuth();
  const fullName = user?.first_name + " " + user?.last_name;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false)

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-600 mt-1">
            Personalize your NewsBridge workspace
          </p>
        </div>
        <button onClick={() => setIsLogoutModal(true)} className="cursor-pointer flex items-center gap-1.5 hover:scale-105 transition duration-300">
          <Logout />
          <p className="text-[#DC2626] text-base">Log out</p>
        </button>
      </div>

      <div className="space-y-6 max-w-4xl">
        {isLoading ? <UserCardSkeleton /> : <Card className="w-1/2 mb-2 bg-white">
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                {getNameAbbr(fullName)}
              </div>
              <div className="">
                <p className="text-xl font-semibold text-[#27272a]">
                  {fullName}
                </p>
                <p className="mt-2 text-sm text-[#00000099]">{user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>}

        <UpdateInfo />

        <UpdatePassword />

        <Card className="mb-2 bg-[#FFF1F4] border-2 border-[#F93C65]">
          <CardContent className="space-y-2">
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>
              Deleting your account will permanently remove your data from
              NewsBridge
            </CardDescription>
            <GradientButton
              onClick={() => setIsModalOpen(true)}
              borderColor="#A31212"
              variant="destructive"
              btnText={"Delete Account"}
              classes="w-[166px] mt-2"
            />
          </CardContent>
        </Card>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ComfirmationModal
            confirmText={
              "Are you sure you want to permanently delete your account? This action cannot be undone"
            }
            onClose={() => setIsModalOpen(false)}
            actionBtnText={"Yes, Delete Account"}
            onAction={() => {
              console.log("Deleted!!");
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
      {isLogoutModal && (
        <Modal isOpen={isLogoutModal} onClose={() => setIsLogoutModal(false)}>
                  <ComfirmationModal
                      header="You are about to log out"
            confirmText={
              "Don’t worry, your stories and settings are safely saved"
            }
            onClose={() => setIsLogoutModal(false)}
            actionBtnText={isLoggingOut ? "Logging out..." : "Log out"}
            onAction={logout}
          />
        </Modal>
      )}
    </div>
  );
}
