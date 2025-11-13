import React from "react";
import Logo from "../Common/Logo";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex justify-center mb-8">
        <Logo textSize="text-3xl" height={40} width={40} />
      </div>

      <div
        className="bg-white rounded-2xl p-9"
        style={{ boxShadow: "0px 17px 23px 0px #C3C3C340" }}
      >
        {children}
      </div>
      <div className="text-center mt-6 text-base text-[#39474F] tracking-[-1] underline underline-offset-3 font-semibold">
        Need help?{" "}
        <a
          href="mailto:info@newsbridge.com"
          className="text-[#3754A3] hover:text-[#2148A2] ml-1"
        >
          Contact support
        </a>
      </div>
    </div>
  );
};

export default AuthWrapper;
