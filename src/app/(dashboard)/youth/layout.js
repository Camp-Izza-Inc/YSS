"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar, UserButton } from "@/components";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import { ICON_SIZE } from "@/constants";

export default function YouthDashboardLayout({ children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [logoutStatus, setLogoutStatus] = useState("progress");

  const renderLogoutModal = () => {
    return logoutStatus ? (
      <dialog id="logout-message-modal" className="modal">
        <div className="modal-box flex gap-3 justify-center">
          {logoutStatus == "progress" ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : logoutStatus == "success" ? (
            <FaCircleCheck size={ICON_SIZE} />
          ) : (
            <FaCircleExclamation size={ICON_SIZE} />
          )}
          <h3 className="font-bold">
            {logoutStatus == "progress"
              ? "Logging out"
              : logoutStatus == "success"
              ? "Logged out!"
              : "An error occurred!"}
          </h3>
        </div>
      </dialog>
    ) : (
      <>
        <dialog id="logout-message-modal" className="modal">
          <div className="modal-box">
            <h3></h3>
          </div>
        </dialog>
      </>
    );
  };

  return (
    <main>
      <Navbar account_type="youth" toggleNav={setCollapsed} />
      <section
        className={`md:absolute left-0 w-full px-4 pt-2 pb-4 overflow-hidden min-h-full ${
          collapsed
            ? "md:left-[6rem] md:w-[calc(100%-6rem)]"
            : "md:left-[15rem] md:w-[calc(100%-15rem)]"
        }`}
      >
        <header className="flex flex-col">
          <div className="text-base font-medium breadcrumbs select-none">
            <ul>
              <li key="dashboard-title">Youth Dashboard</li>
              {pathname.split("/").map((page, i) => {
                return i > 1 ? (
                  <li className="capitalize" key={page}>
                    {page}
                  </li>
                ) : null;
              })}
            </ul>
          </div>

          <div className="flex justify-end mb-2">
            <UserButton setLogoutStatus={setLogoutStatus} />
          </div>
        </header>
        {children}
      </section>
      {renderLogoutModal()}
    </main>
  );
}
