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
import Preferences from "@/components/dashboard/settings/preferences";
import { useGetUserPreferences } from "@/app/api/auth/queries";
import { useUpdateUserPreferences } from "@/app/api/auth/mutations";
import useToast from "@/app/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";

export default function SettingsPage() {
  const { user, isLoading, setIsLogoutModal } = useAuth();
  const fullName = user?.first_name + " " + user?.last_name;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const { data: preferencesData, isLoading: isLoadingPreferences } = useGetUserPreferences();
  const { successToastHandler, errorToastHandler } = useToast();
  const queryClient = useQueryClient();

  // Get languages and topics from preferences API (which fetches coverages)
  const languages = preferencesData?.languages || user?.languages || [];
  const topics = preferencesData?.topics || preferencesData?.coverages || user?.coverages || [];

  const { mutate: updatePreferences, isPending: isSavingPreferences } = useUpdateUserPreferences(
    (error) => {
      errorToastHandler(error);
    },
    (message) => {
      successToastHandler(message);
      queryClient.invalidateQueries({ queryKey: ["user-preferences"] });
      queryClient.invalidateQueries({ queryKey: ["preference-reports"] });
    }
  );

  const handleSavePreferences = async (data: { languages: string[]; topics: string[] }) => {
    if (!user?.id) {
      errorToastHandler("User ID not found");
      return;
    }

    // Format the data for the API endpoint
    // The endpoint expects: regions, languages, and coverages
    const updatePayload = {
      languages: data.languages,
      coverages: data.topics,
      regions: user?.regions || [], // Keep existing regions if not modifying
    };

    updatePreferences({
      data: updatePayload,
      id: user.id,
    });
  };

  return (
    <div className="sm:py-8 sm:px-8 px-4 py-4 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
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
        {isLoading ? <UserCardSkeleton /> : <Card className="sm:w-1/2 mb-2 bg-white">
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

        <Preferences 
          initialLanguages={languages.map((lang: any) => typeof lang === 'string' ? lang : lang.name)}
          initialTopics={topics.map((topic: any) => typeof topic === 'string' ? topic : topic.name)}
          onSave={handleSavePreferences}
          isLoading={isLoadingPreferences}
          isSaving={isSavingPreferences}
        />

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
    </div>
  );
}
