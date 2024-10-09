import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  // auth().protect()
  return (
      <main className="root">
        {/* sidebar  */}
        <Sidebar></Sidebar>
        {/* mobile nav  */}
        <MobileNav></MobileNav>
        <div className="root-container">
          <div className="wrapper">
            {children}
            </div>
        </div>
      </main>
  );
}

export default layout;
