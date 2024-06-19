import SideBarApoteker from "@/components/sideBarApoteker"
import { SidebarItem } from "@/components/sideBarApoteker"
import BottomNavApoteker from "./components/bottomNavApoteker"
import { getUser } from "@/libs/actions"
import { NewspaperIcon, UserGroupIcon, ChatBubbleLeftEllipsisIcon, BeakerIcon } from '@heroicons/react/24/outline'

export default async function Layout({children}) {
  return (
    <>
      <div className="sm:flex min-h-screen">
        <SideBarApoteker>
          <SidebarItem icon={<BeakerIcon className="h-6 text-slate-800"/>} link={"/apoteker/obat-a-z"} text="Obat A-Z" href={"/apoteker/obat-a-z"}/>
          <SidebarItem icon={<NewspaperIcon className="h-6 text-slate-800"/>} link={"/apoteker/buat-artikel"} text="Artikel" href={"/apoteker/buat-artikel"}/>
          <SidebarItem icon={<ChatBubbleLeftEllipsisIcon className="h-6 text-slate-800"/>} link={"/apoteker/chat"} text="Chat" href={"/apoteker/chat"}/>
          <SidebarItem icon={<UserGroupIcon className="h-6 text-slate-800"/>} text="Forum" link={"/apoteker/forum-kesehatan"} href={"/apoteker/forum-kesehatan"}/>
        </SideBarApoteker>
        <div className=" w-full pb-24">
          {children}
        </div>
      </div>
      <BottomNavApoteker/>
    </>
  )
}
