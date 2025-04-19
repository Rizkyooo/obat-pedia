"use client";
import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  UserIcon,
  LogOut,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, createContext, useState, useEffect } from "react";
const SidebarContext = createContext();
import { getUser } from "@/libs/actions";
import { getUserFromDatabase } from "@/services/getUserFromDatabase";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { logOut } from "@/libs/actions";

export default function SideBarApoteker({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const users = await getUser();
      const role = users?.user_metadata?.role;
      const apoteker = await getUserFromDatabase(role);
      setUser(apoteker);
    }
    fetchUser();
  }, []);
  console.log(user);

  async function handleLogout() {
    logOut();
  }
  return (
    <aside className="h-screen hidden sticky top-0 sm:block">
      <nav className="h-full inline-flex flex-col bg-slate-100 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h3
            className={`overflow-hidden transition-all font-bold ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          >
            Medisigna
          </h3>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img src={user?.picture} alt="" className="w-10 h-10 rounded-md" />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user?.nama}</h4>
              <span className="text-xs text-gray-600">{user?.email}</span>
            </div>
            <Dropdown>
              <DropdownTrigger>
                <MoreVertical className="cursor-pointer" size={20} />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  href={user?.role === "admin"? "/admin/profil": "/apoteker/profil"}
                  startContent={<UserIcon size={20} />}
                  key="profil"
                >
                  Lihat Profil
                </DropdownItem>
                <DropdownItem
                  onPress={handleLogout}
                  startContent={<LogOutIcon />}
                  key="logout"
                  className="text-danger"
                                        color="primary"
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, href, alert, link }) {
  const { expanded } = useContext(SidebarContext);
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link
      href={link}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group mb-4 ${
        isActive ? "bg-blue-500 text-white" : "hover:bg-red text-gray-600"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-blue-500 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 z-50 bg-blue-500 text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </Link>
  );
}
