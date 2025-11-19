"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuBraces,
  LuSettings,
  LuLogOut,
  LuLayoutDashboard,
  LuDatabase,
} from "react-icons/lu";

interface OptionProps {
  href?: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Option = ({
  href,
  icon,
  label,
  isActive = false,
  onClick,
}: OptionProps) => {
  const baseClass = `w-full flex items-center gap-3 p-4 rounded-xl cursor-pointer 
    hover:bg-(--blue-2) transition-all border 
    ${isActive ? "bg-(--blue-2) border-(--blue)" : "border-transparent"}`;

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        <div>{icon}</div>
        <span
          className={`${
            isActive ? "text-(--white)" : "text-(--text-light)"
          } font-medium`}
        >
          {label}
        </span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClass}>
      <div>{icon}</div>
      <span className="text-(--text-light) font-medium">{label}</span>
    </button>
  );
};

const Sidebar = () => {
  const pathName = usePathname();
  const supabase = createSupabaseClient();

  return (
    <div className="p-6 bg-(--blue-dark) w-full h-screen max-w-[300px] border-r border-(--white-10) flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2">
          <LuBraces size={24} color="var(--blue)" />
          <h1 className="text-xl text-(--white) font-bold">TempDB</h1>
        </div>
        <div className="mt-10">
          <Option
            href="/dashboard"
            icon={<LuLayoutDashboard size={20} color="(--text-light)" />}
            label="Dashboard"
            isActive={pathName === "/dashboard"}
          />
          <Option
            href="/datasets"
            icon={<LuDatabase size={20} color="(--text-light)" />}
            label="Datasets"
            isActive={pathName === "/datasets"}
          />
        </div>
      </div>

      <div>
        <Option
          href="/settings"
          icon={<LuSettings size={20} color="(--text-light)" />}
          label="Settings"
          isActive={pathName === "/settings"}
        />
        <Option
          icon={<LuLogOut size={20} color="(--text-light)" />}
          label="Log out"
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
