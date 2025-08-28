import type { ReactNode } from "react";
import { Logo } from "../components/atoms/logo";
import { Toaster } from "@/components/atoms/sonner";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster />
      <div className="w-full h-16 flex px-4 justify-between items-center border-b dark:border-neutral-800 border-neutral-200">
        <div className="flex items-center gap-2">
          <div>
            <Logo />
          </div>
          <div className="font-sinhala">
            <div>Workspace</div>
          </div>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
};
