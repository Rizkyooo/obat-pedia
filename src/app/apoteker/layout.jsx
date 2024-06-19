import NavApoteker from "@/components/navApoteker"
import SideBarApoteker from "@/components/sideBarApoteker"
import { SidebarItem } from "@/components/sideBarApoteker"
import { HomeIcon } from "lucide-react"
import BottomNavApoteker from "./components/bottomNavApoteker"
import { getUser } from "@/libs/actions"

export default async function Layout({children}) {
  const user = await getUser();
  return (
    <>
    <div className="hidden sm:flex">
      <SideBarApoteker>
        <SidebarItem icon={<HomeIcon size={20}/>} text="Beranda" active />
        <SidebarItem icon={<HomeIcon size={20}/>} text="Beranda" />
        <SidebarItem icon={<HomeIcon size={20}/>} text="Beranda" />
      </SideBarApoteker>
      <div className="flex-1 flex flex-col">
        <NavApoteker user={user}/>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
        <BottomNavApoteker/>
      </div>
    </div>
    <div className="sm:hidden">
      <NavApoteker user={user}/>
      {children}
      <BottomNavApoteker/>
    </div>
    </>
  )
}
