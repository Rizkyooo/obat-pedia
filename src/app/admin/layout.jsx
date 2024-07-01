import SideBarApoteker from "@/components/sideBarApoteker"
import { SidebarItem } from "@/components/sideBarApoteker"
import { LayoutDashboard, NewspaperIcon, Stethoscope, UserCircle } from "lucide-react"
export default function layout({children}) {
  return (
    <>
      <div className="sm:flex min-h-screen ">
        <SideBarApoteker>
          <SidebarItem icon={<LayoutDashboard className="h-6 text-slate-800"/>} link={"/admin"} text="Dashboard" href={"/admin"}/>
          <SidebarItem icon={<NewspaperIcon className="h-6 text-slate-800"/>} link={"/admin/kelola-artikel"} text="Artikel" href={"/admin/kelola-artikel"}/>
          <SidebarItem icon={<UserCircle className="h-6 text-slate-800"/>} text="Pengguna" link={"/admin/kelola-pengguna"} href={"/admin/kelola-pengguna"}/>
          <SidebarItem icon={<Stethoscope className="h-6 text-slate-800"/>} text="Apoteker" link={"/admin/kelola-apoteker"} href={"/admin/kelola-apoteker"}/>
        </SideBarApoteker>
        <div className="w-full">
          {children}
        </div>
      </div>
    </>
  )
}