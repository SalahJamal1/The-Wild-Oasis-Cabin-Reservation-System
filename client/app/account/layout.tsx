import React, { ReactNode } from "react";
import SideNavigation from "../_components/SideNavigation";
import ProtectPage from "../_components/ProtectPage";

type Props = {
  children: ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen gap-12">
      <SideNavigation />
      <ProtectPage>
        <div>{children}</div>
      </ProtectPage>
    </div>
  );
}
