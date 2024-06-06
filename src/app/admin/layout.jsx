import SideBarApoteker from "@/components/sideBarApoteker"
import { SidebarItem } from "@/components/sideBarApoteker"
import { HomeIcon, LogOutIcon } from "lucide-react"
export default function layout({children}) {
  return (
    < >
    <div className="flex">
      <SideBarApoteker>
        <SidebarItem icon= {<HomeIcon size={20}/>}
            text = "Beranda" active/>
            <SidebarItem icon= {<HomeIcon size={20}/>}
            text = "Beranda" />
            <SidebarItem icon= {<HomeIcon size={20}/>}
            text = "Beranda" />
            
      </SideBarApoteker>
      {children}
    </div>
    </>
  )
}