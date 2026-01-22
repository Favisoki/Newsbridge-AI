import type { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        backgroundImage: "url('/onboarding-bg.png')",
        backgroundSize: "contain",
      }}
    >
      {children}
    </div>
  );
}
