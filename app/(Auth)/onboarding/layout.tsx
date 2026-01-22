import type { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center sm:px-14 p-4"
      style={{
        backgroundImage: "url('/onboarding-bg.png')",
        backgroundSize: "contain",
      }}
    >
      {children}
    </div>
  );
}
