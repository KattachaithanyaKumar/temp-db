"use client";

import { usePathname } from "next/navigation";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import { LuBell } from "react-icons/lu";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { useAppSelector } from "../hooks/useAppDispatch";
import { FaRegUser } from "react-icons/fa";
import Image from "next/image";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  useCheckAuth("protected");

  const profileImage = useAppSelector((state) => state.auth.user)?.user_metadata
    .avatar_url;

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <div className="py-4 px-10 border-b border-(--dark-gray) shadow-2xl flex justify-between items-center ">
          <h2 className="text-base">
            <span className="text-(--text-light)">Home </span> <span> / </span>
            {pathName.replace("/", "").charAt(0).toUpperCase() +
              pathName.slice(2)}
          </h2>
          <div className="flex items-center gap-4">
            <Button>Upgrade</Button>
            <div className="rounded-full p-3 border border-(--white-10) hover:bg-(--white-10) transition">
              <LuBell size={18} color="var(--white)" />
            </div>
            {profileImage ? (
              <div>
                <Image
                  src={profileImage}
                  alt="avatar"
                  width={44}
                  height={44}
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="rounded-full p-3 border border-(--white-10) hover:bg-(--white-10) transition">
                <FaRegUser size={18} color="var(--white)" />
              </div>
            )}
          </div>
        </div>

        <div className="py-6 px-10">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
